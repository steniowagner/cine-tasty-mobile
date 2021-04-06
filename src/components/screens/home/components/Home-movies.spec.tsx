import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import { SearchType } from 'types/schema';

import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import { SCREEN_ID } from './media-section-view-all/MediaSectionViewAll';

import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import {
  NOW_PLAYING_VIEW_ALL_TITLE_i18N_REF as MOVIES_NOW_PLAYING_VIEW_ALL_TITLE_i18N_REF,
  NOW_PLAYING_SECTION_TITLE_i18N_REF as MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF,
  TOP_RATED_VIEW_ALL_TITLE_i18N_REF as MOVIES_TOP_RATED_VIEW_ALL_TITLE_i18N_REF,
  UPCOMING_VIEW_ALL_TITLE_i18N_REF as MOVIES_UPCOMING_VIEW_ALL_TITLE_i18N_REF,
  TOP_RATED_SECTION_TITLE_i18N_REF as MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF,
  UPCOMING_SECTION_TITLE_i18N_REF as MOVIES_UPCOMING_SECTION_TITLE_i18N_REF,
  POPULAR_VIEW_ALL_TITLE_i18N_REF as MOVIES_POPULAR_VIEW_ALL_TITLE_i18N_REF,
  POPULAR_SECTION_TITLE_i18N_REF as MOVIES_POPULAR_SECTION_TITLE_i18N_REF,
} from './hooks/trendings/useTrendingMovies';
import { TRENDING_MOVIES_ERROR_REF_I18N } from './hooks/useHome';
import {
  SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF,
  SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF,
  SEARCH_MOVIE_PLACEHOLDER_I18N_REF,
} from './hooks/usePressMapping';
import Home from './Home';

const NUMBER_OF_SECTIONS = 4;

const trendingMoviesItems = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((_, index) => `genre-${index}`),
    posterPath: `/posterPath-${index}`,
    title: `title-${index}`,
    __typename: 'BaseMovie',
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

const trendingMovies = {
  nowPlaying: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  upcoming: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  __typename: 'TrendingMovies',
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

describe('Testing <Home /> - [Movies]', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

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

  it("should render the content properly when the query-result isnt' null", () => {
    const mockResolvers = {
      TrendingMovies: () => trendingMovies,
    };

    const { queryByTestId, getByTestId, getByText, getAllByTestId } = render(
      renderHome({ mockResolvers }),
    );

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(queryByTestId('loading-home')).toBeNull();

    expect(getByTestId('top3-list')).not.toBeNull();

    expect(getAllByTestId('section-wrapper').length).toEqual(NUMBER_OF_SECTIONS);

    // now-playing-section

    expect(getByText(MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // top-rated-section

    expect(getByText(MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // upcoming-section

    expect(getByText(MOVIES_UPCOMING_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_UPCOMING_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    // popular-section

    expect(getByText(MOVIES_UPCOMING_SECTION_TITLE_i18N_REF)).not.toBeNull();

    expect(
      getByTestId(`home-section-${MOVIES_UPCOMING_SECTION_TITLE_i18N_REF}`),
    ).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });
  });

  it('should render popup-message with an error when the query-result has some error', () => {
    const mockResolvers = {
      TrendingMovies: () => new Error(),
    };

    const { getByTestId, queryByTestId, queryAllByTestId } = render(
      renderHome({ mockResolvers }),
    );

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    expect(getByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(getByTestId('popup-advice-message').children[0]).toEqual(
      TRENDING_MOVIES_ERROR_REF_I18N,
    );

    expect(queryByTestId('loading-home')).toBeNull();

    expect(queryByTestId('top3-list')).toBeNull();

    expect(queryAllByTestId('scrollview-content')).toEqual([]);

    expect(queryAllByTestId('section-wrapper')).toEqual([]);
  });

  it('should call correct params when press "View All" button on the "Now Playing section" and the "Movies" is selected', () => {
    const mockResolvers = {
      TrendingMovies: () => trendingMovies,
    };

    const navigate = jest.fn();

    const { getByTestId } = render(renderHome({ mockResolvers, navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getByTestId(`view-all-button-${MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingMovies.nowPlaying.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      MOVIES_NOW_PLAYING_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('nowPlaying');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(true);
  });

  it('should call correct params when press "View All" button on the "Popular section" and the "Movies" is selected', () => {
    const mockResolvers = {
      TrendingMovies: () => trendingMovies,
    };

    const navigate = jest.fn();

    const { getByTestId } = render(renderHome({ mockResolvers, navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getByTestId(`view-all-button-${MOVIES_POPULAR_SECTION_TITLE_i18N_REF}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingMovies.popular.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      MOVIES_POPULAR_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('popular');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(true);
  });

  it('should call correct params when press "View All" button on the "Top Rated section" and the "Movies" is selected', () => {
    const mockResolvers = {
      TrendingMovies: () => trendingMovies,
    };

    const navigate = jest.fn();

    const { getByTestId } = render(renderHome({ mockResolvers, navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getByTestId(`view-all-button-${MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingMovies.topRated.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      MOVIES_TOP_RATED_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('topRated');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(true);
  });

  it('should call correct params when press "View All" button on the "Upcoming section" and the "Movies" is selected', () => {
    const mockResolvers = {
      TrendingMovies: () => trendingMovies,
    };

    const navigate = jest.fn();

    const { getByTestId } = render(renderHome({ mockResolvers, navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(
      getByTestId(`view-all-button-${MOVIES_UPCOMING_SECTION_TITLE_i18N_REF}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(SCREEN_ID);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingMovies.upcoming.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      MOVIES_UPCOMING_VIEW_ALL_TITLE_i18N_REF,
    );

    expect(navigate.mock.calls[0][1].sectionKey).toEqual('upcoming');

    expect(navigate.mock.calls[0][1].isMovie).toEqual(true);
  });

  it('should navigate to "Search" screen passing the params correctly', () => {
    const mockResolvers = {
      TrendingMovies: () => trendingMovies,
    };

    const navigate = jest.fn();

    const { getByTestId } = render(renderHome({ mockResolvers, navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getByTestId('header-icon-button-wrapper-magnify'));

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('SEARCH', {
      i18nQueryByPaginationErrorRef: SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF,
      i18nQueryByTextErrorRef: SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF,
      i18nSearchBarPlaceholderRef: SEARCH_MOVIE_PLACEHOLDER_I18N_REF,
      searchType: SearchType.MOVIE,
      queryId: 'search_movie',
    });
  });

  it('should navigate to TVShow-detail screen when the user select some section-item', () => {
    const sections = [
      `home-section-${MOVIES_NOW_PLAYING_SECTION_TITLE_i18N_REF}`,
      `home-section-${MOVIES_POPULAR_SECTION_TITLE_i18N_REF}`,
      `home-section-${MOVIES_TOP_RATED_SECTION_TITLE_i18N_REF}`,
      `home-section-${MOVIES_UPCOMING_SECTION_TITLE_i18N_REF}`,
    ];

    const SECTION_ITEM_INDEX_SELECTED =
      (Math.random() * (trendingMoviesItems.length - 1 - 0 + 1)) << 0;
    const SECTION_SELECTED_INDEX = (Math.random() * (sections.length - 1 - 0 + 1)) << 0;

    const mockResolvers = {
      TrendingMovies: () => trendingMovies,
    };

    const navigate = jest.fn();

    const { getAllByTestId } = render(renderHome({ mockResolvers, navigate }));

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

    expect(navigate).toHaveBeenCalledWith('MOVIE_DETAIL', {
      voteAverage: trendingMoviesItems[SECTION_ITEM_INDEX_SELECTED].voteAverage,
      posterPath: trendingMoviesItems[SECTION_ITEM_INDEX_SELECTED].posterPath,
      voteCount: trendingMoviesItems[SECTION_ITEM_INDEX_SELECTED].voteCount,
      genreIds: trendingMoviesItems[SECTION_ITEM_INDEX_SELECTED].genreIds,
      title: trendingMoviesItems[SECTION_ITEM_INDEX_SELECTED].title,
      id: trendingMoviesItems[SECTION_ITEM_INDEX_SELECTED].id,
    });
  });

  it('should navigate to Movie-detail screen when the user select some top3-item', () => {
    const TOP3_ITEM_SELECTED_INDEX = 0;

    const mockResolvers = {
      TrendingMovies: () => trendingMovies,
    };

    const navigate = jest.fn();

    const { getAllByTestId } = render(renderHome({ mockResolvers, navigate }));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {}
    });

    fireEvent.press(getAllByTestId('rounded-button')[TOP3_ITEM_SELECTED_INDEX]);

    expect(navigate).toHaveBeenCalledTimes(1);

    const { id } = navigate.mock.calls[0][1];

    expect(navigate).toHaveBeenCalledWith('MOVIE_DETAIL', {
      voteAverage: trendingMovies.nowPlaying.items[id].voteAverage,
      posterPath: trendingMovies.nowPlaying.items[id].posterPath,
      voteCount: trendingMovies.nowPlaying.items[id].voteCount,
      genreIds: trendingMovies.nowPlaying.items[id].genreIds,
      title: trendingMovies.nowPlaying.items[id].title,
      id: trendingMovies.nowPlaying.items[id].id,
    });
  });

  it('should show the movies-content after press the "Movies" when the "TVShows" is selected', () => {});
});
