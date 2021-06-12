import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';
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

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING}`),
    ).not.toBeNull();

    // top-rated-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED}`),
    ).not.toBeNull();

    // upcoming-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING}`),
    ).not.toBeNull();

    // popular-section

    expect(getByText(TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR)).not.toBeNull();

    expect(
      getByTestId(`home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR}`),
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
      TRANSLATIONS.HOME_TRENDING_MOVIES_ERROR,
    );

    expect(getByTestId('top-reload-button')).not.toBeNull();

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
      getByTestId(`view-all-button-${TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(Routes.Home.MEDIA_DETAILS_VIEW_ALL);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingMovies.nowPlaying.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING_VIEW_ALL,
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
      getByTestId(`view-all-button-${TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(Routes.Home.MEDIA_DETAILS_VIEW_ALL);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingMovies.popular.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR_VIEW_ALL,
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
      getByTestId(`view-all-button-${TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(Routes.Home.MEDIA_DETAILS_VIEW_ALL);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingMovies.topRated.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED_VIEW_ALL,
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
      getByTestId(`view-all-button-${TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING}`),
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate.mock.calls[0][0]).toEqual(Routes.Home.MEDIA_DETAILS_VIEW_ALL);

    expect(Array.isArray(navigate.mock.calls[0][1].initialDataset)).toEqual(true);

    expect(navigate.mock.calls[0][1].initialDataset).toEqual(
      trendingMovies.upcoming.items,
    );

    expect(navigate.mock.calls[0][1].headerTitle).toEqual(
      TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING_VIEW_ALL,
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

    expect(navigate).toHaveBeenCalledWith(Routes.Search.SEARCH, {
      i18nQueryByPaginationErrorRef: TRANSLATIONS.HOME_SEARCH_MOVIE_PAGINATION_ERROR,
      i18nQueryByTextErrorRef: TRANSLATIONS.HOME_SEARCH_MOVIE_QUERY_BY_TEXT_ERROR,
      i18nSearchBarPlaceholderRef: TRANSLATIONS.HOME_SEARCH_MOVIE_PLACEHOLDER,
      searchType: SchemaTypes.SearchType.MOVIE,
      queryId: 'search_movie',
    });
  });

  it('should navigate to TVShow-detail screen when the user select some section-item', () => {
    const sections = [
      `home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_NOW_PLAYING}`,
      `home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_POPULAR}`,
      `home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_TOP_RATED}`,
      `home-section-${TRANSLATIONS.HOME_TRENDING_MOVIES_UPCOMING}`,
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

    expect(navigate).toHaveBeenCalledWith(Routes.Movie.DETAILS, {
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

    expect(navigate).toHaveBeenCalledWith(Routes.Movie.DETAILS, {
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
