import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { MockList, IMocks } from 'graphql-tools';

import { SEARCH_TV_SHOWS } from 'components/screens/shared/search/queries';
import { SearchType } from 'types/schema';

import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import { SCREEN_ID } from './media-section-view-all/MediaSectionViewAll';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import { TRANSITIONING_DURATION } from './hooks/useHome';
import {
  ON_THE_AIR_VIEW_ALL_TITLE_i18N_REF as TV_SHOWS_ON_THE_AIR_VIEW_ALL_TITLE_i18N_REF,
  TOP_RATED_VIEW_ALL_TITLE_i18N_REF as TV_SHOWS_TOP_RATED_VIEW_ALL_TITLE_i18N_REF,
  ON_THE_AIR_SECTION_TITLE_i18N_REF as TV_SHOWS_ON_THE_AIR_SECTION_TITLE_i18N_REF,
  TOP_RATED_SECTION_TITLE_i18N_REF as TV_SHOWS_TOP_RATED_SECTION_TITLE_i18N_REF,
  POPULAR_VIEW_ALL_TITLE_i18N_REF as TV_SHOWS_POPULAR_VIEW_ALL_TITLE_i18N_REF,
  POPULAR_SECTION_TITLE_i18N_REF as TV_SHOWS_POPULAR_SECTION_TITLE_i18N_REF,
} from './hooks/trendings/useTrendingTVShows';
import { TRENDING_TV_SHOWS_ERROR_REF_I18N } from './hooks/useHome';
import {
  SEARCH_TV_SHOWS_QUERY_BY_TEXT_ERROR_I18N_REF,
  SEARCH_TV_SHOWS_PAGINATION_ERROR_I18N_REF,
  SEARCH_TV_SHOWS_PLACEHOLDER_I18N_REF,
} from './hooks/usePressMapping';
import Home from './Home';

const NUMBER_OF_SECTIONS = 3;

const trendingTVShowsItems = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((_, index) => `genre-${index}`),
    posterPath: `posterPath-${index}`,
    __typename: 'BaseTVShow',
    name: `name-${index}`,
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

const trendingTVShowsItemsWithTitle = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((_, index) => `genre-${index}`),
    posterPath: `posterPath-${index}`,
    __typename: 'BaseTVShow',
    title: `name-${index}`,
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

const trendingTVShowsWithTitle = {
  onTheAir: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  __typename: 'TrendingTVShows',
};

const trendingTVShows = {
  onTheAir: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  __typename: 'TrendingTVShows',
};

type RenderHomeProps = {
  navigate?: jest.FunctionLike;
  mockResolvers?: IMocks;
};

const renderHome = ({ navigate = jest.fn, mockResolvers }: RenderHomeProps) => {
  const HomeScreen = ({ navigation }) => {
    return (
      <AutoMockProvider mockResolvers={mockResolvers}>
        <Home navigation={{ ...navigation, navigate }} />
      </AutoMockProvider>
    );
  };

  return <MockedNavigation component={HomeScreen} />;
};

describe('Testing <Home /> - [Movies]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render the loading state when the screen is first mounted', () => {
    const { queryByTestId } = render(renderHome({}));

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });
  });

  it('should render the section-title correctly when the user select the "TV Shows" section', () => {
    const mockResolvers = {
      TrendingTVShows: () => trendingTVShows,
    };

    const navigate = jest.fn();

    const { getAllByTestId, getByText, queryByTestId, getByTestId } = render(
      renderHome({ mockResolvers, navigate }),
    );

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('loading-home')).toBeNull();

    expect(getByTestId('top3-list')).not.toBeNull();

    expect(getAllByTestId('section-wrapper').length).toEqual(NUMBER_OF_SECTIONS);

    // on-the-air-section

    expect(getByText(TV_SHOWS_ON_THE_AIR_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TV_SHOWS_ON_THE_AIR_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // top-rated-section

    expect(getByText(TV_SHOWS_TOP_RATED_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TV_SHOWS_TOP_RATED_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // popular-section

    expect(getByText(TV_SHOWS_POPULAR_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TV_SHOWS_POPULAR_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();
  });

  it('should call correct params when press "View All" button on the "On the Air section" and the "TV-Shows" is selected', () => {
    const mockResolvers = {
      TrendingTVShows: () => trendingTVShows,
    };

    const navigate = jest.fn();

    const { getByTestId } = render(renderHome({ mockResolvers, navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getByTestId(`view-all-button-${TV_SHOWS_ON_THE_AIR_SECTION_TITLE_i18N_REF}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(typeof navigate.mock.calls[0][1].onPressItem).toEqual('function');

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingTVShowsWithTitle.onTheAir.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TV_SHOWS_ON_THE_AIR_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('onTheAir');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(false);
  });

  it('should call correct params when press "View All" button on the "Popular section" and the "TV-Shows" is selected', () => {
    const mockResolvers = {
      TrendingTVShows: () => trendingTVShows,
    };

    const navigate = jest.fn();

    const { getByTestId } = render(renderHome({ mockResolvers, navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getByTestId(`view-all-button-${TV_SHOWS_POPULAR_SECTION_TITLE_i18N_REF}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(typeof navigate.mock.calls[0][1].onPressItem).toEqual('function');

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingTVShowsWithTitle.popular.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TV_SHOWS_POPULAR_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('popular');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(false);
  });

  it('should call correct params when press "View All" button on the "Top Rated section" and the "TV-Shows" is selected', () => {
    const mockResolvers = {
      TrendingTVShows: () => trendingTVShows,
    };

    const navigate = jest.fn();

    const { getByTestId } = render(renderHome({ mockResolvers, navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getByTestId(`view-all-button-${TV_SHOWS_TOP_RATED_SECTION_TITLE_i18N_REF}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(typeof navigate.mock.calls[0][1].onPressItem).toEqual('function');

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingTVShowsWithTitle.topRated.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TV_SHOWS_TOP_RATED_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('topRated');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(false);
  });

  it('should navigate to "Search" screen passing the params correctly', () => {
    const mockResolvers = {
      TrendingTVShows: () => trendingTVShows,
    };

    const navigate = jest.fn();

    const { getByTestId } = render(renderHome({ mockResolvers, navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('header-icon-button-wrapper-magnify'));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('SEARCH', {
      i18nQueryByPaginationErrorRef: SEARCH_TV_SHOWS_PAGINATION_ERROR_I18N_REF,
      i18nQueryByTextErrorRef: SEARCH_TV_SHOWS_QUERY_BY_TEXT_ERROR_I18N_REF,
      i18nSearchBarPlaceholderRef: SEARCH_TV_SHOWS_PLACEHOLDER_I18N_REF,
      searchType: SearchType.TV,
      query: SEARCH_TV_SHOWS,
    });
  });

  it('should render popup-message with an error when the query-result has some error', () => {
    const mockResolvers = {
      TrendingTVShows: () => new Error(),
    };

    const navigate = jest.fn();

    const { queryAllByTestId, queryByTestId, getByTestId } = render(
      renderHome({ mockResolvers, navigate }),
    );

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(getByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(getByTestId('popup-advice-message').children[0]).toEqual(
      TRENDING_TV_SHOWS_ERROR_REF_I18N,
    );

    expect(queryByTestId('loading-home')).toBeNull();

    expect(queryByTestId('top3-list')).toBeNull();

    expect(queryAllByTestId('scrollview-content')).toEqual([]);

    expect(queryAllByTestId('section-wrapper')).toEqual([]);
  });

  it('should navigate to TVShow-detail screen when the user select some section-item', () => {
    const sections = [
      `home-section-${TV_SHOWS_ON_THE_AIR_SECTION_TITLE_i18N_REF}`,
      `home-section-${TV_SHOWS_POPULAR_SECTION_TITLE_i18N_REF}`,
      `home-section-${TV_SHOWS_TOP_RATED_SECTION_TITLE_i18N_REF}`,
    ];

    const SECTION_ITEM_INDEX_SELECTED =
      (Math.random() * (trendingTVShowsItemsWithTitle.length - 1 - 0 + 1)) << 0;
    const SECTION_SELECTED_INDEX = (Math.random() * (sections.length - 1 - 0 + 1)) << 0;

    const mockResolvers = {
      TrendingTVShows: () => trendingTVShows,
    };

    const navigate = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderHome({ mockResolvers, navigate }),
    );

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('media-switcher-tv-shows-button'));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getAllByTestId('simplified-media-list-button')[
        SECTION_SELECTED_INDEX * 10 + SECTION_ITEM_INDEX_SELECTED
      ],
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('TV_SHOW_DETAIL', {
      voteAverage: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].voteAverage,
      posterPath: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].posterPath,
      voteCount: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].voteCount,
      genreIds: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].genreIds,
      title: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].title,
      id: trendingTVShowsItemsWithTitle[SECTION_ITEM_INDEX_SELECTED].id,
    });
  });
});
