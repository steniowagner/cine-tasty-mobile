import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import { SWITCH_ANIMATION_DURATION_MS } from './media-switcher/useMediaSwitcher';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import { SCREEN_ID } from './media-section-view-all/MediaSectionViewAll';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import { TRANSITIONING_DURATION } from './hooks/useHome';
import Home from './Home';

const NUMBER_OF_SECTIONS = 4;

const trendingTVShowsItems = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((_, index) => `genre-${index}`),
    posterPath: `/posterPath-${index}`,
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
    posterPath: `/posterPath-${index}`,
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

  return (
    <TMDBImageQualityProvider>
      <MockedNavigation component={HomeScreen} />
    </TMDBImageQualityProvider>
  );
};

describe('Testing <Home /> - [TVShows]', () => {
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

    fireEvent.press(getByTestId(`${TRANSLATIONS.HOME_TV_SHOWS}-button`));

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

    // airing-today-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_AIRING_TODAY)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_AIRING_TODAY}`),
    ).not.toBeNull();

    // on-the-air-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_ON_THE_AIR)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_ON_THE_AIR}`),
    ).not.toBeNull();

    // top-rated-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_TOP_RATED)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_TOP_RATED}`),
    ).not.toBeNull();

    // popular-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_POPULAR)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_POPULAR}`),
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

    fireEvent.press(getByTestId(`${TRANSLATIONS.HOME_TV_SHOWS}-button`));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getByTestId(`view-all-button-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_ON_THE_AIR}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingTVShowsWithTitle.onTheAir.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TRANSLATIONS.HOME_TRENDING_TV_SHOWS_ON_THE_AIR_VIEW_ALL,
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

    fireEvent.press(getByTestId(`${TRANSLATIONS.HOME_TV_SHOWS}-button`));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getByTestId(`view-all-button-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_POPULAR}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingTVShowsWithTitle.popular.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TRANSLATIONS.HOME_TRENDING_TV_SHOWS_POPULAR_VIEW_ALL,
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

    fireEvent.press(getByTestId(`${TRANSLATIONS.HOME_TV_SHOWS}-button`));

    act(() => {
      timeTravel(TRANSITIONING_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getByTestId(`view-all-button-${TRANSLATIONS.HOME_TRENDING_TV_SHOWS_TOP_RATED}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingTVShowsWithTitle.topRated.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TRANSLATIONS.HOME_TRENDING_TV_SHOWS_TOP_RATED_VIEW_ALL,
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

    fireEvent.press(getByTestId(`${TRANSLATIONS.HOME_TV_SHOWS}-button`));

    act(() => {
      timeTravel(TRANSITIONING_DURATION + SWITCH_ANIMATION_DURATION_MS);
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
      i18nQueryByPaginationErrorRef: TRANSLATIONS.HOME_TV_SHOWS_PAGINATION_ERROR,
      i18nQueryByTextErrorRef: TRANSLATIONS.HOME_SEARCH_TV_SHOW_QUERY_BY_TEXT_ERROR,
      i18nSearchBarPlaceholderRef: TRANSLATIONS.HOME_SEARCH_TV_SHOW_PLACEHOLDER,
      searchType: SchemaTypes.SearchType.TV,
      queryId: 'search_tv',
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

    fireEvent.press(getByTestId(`${TRANSLATIONS.HOME_TV_SHOWS}-button`));

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
      TRANSLATIONS.HOME_TRENDING_TV_SHOWS_ERROR,
    );

    expect(queryByTestId('loading-home')).toBeNull();

    expect(queryByTestId('top3-list')).toBeNull();

    expect(queryAllByTestId('scrollview-content')).toEqual([]);

    expect(queryAllByTestId('section-wrapper')).toEqual([]);
  });
});
