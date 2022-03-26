/* eslint-disable import/first */
import React from 'react';
import {cleanup, fireEvent, render, act} from '@testing-library/react-native';
import {MockList, IMocks} from 'graphql-tools';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';
import {ThemeContextProvider} from '@providers';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import {Routes} from '@routes/routes';
import {light} from '@styles/themes';

jest.mock('../../../../../../../utils/storage');

import {SEARCH_BY_QUERY_DELAY} from '../use-search/useSearchByQuery';
import Search from '../Search';

const storage = require('../../../../../../../utils/storage');

const I18N_MOVIES_QUERY_BY_PAGINATION_ERROR_REF =
  'i18nMoviesQueryByPaginationErrorRef';
const I18N_MOVIES_QUERY_BY_TEXT_ERROR_REF = 'i18nMoviesQueryByTextErrorRef';
const SOME_MOVIE_NAME = 'SOME_MOVIE_NAME';

const defaultItems = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((_, index) => `genre-${index}`),
    posterPath: `/posterPath-${index}`,
    __typename: 'BaseMovie',
    title: `title-${index}`,
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

const getMockResolvers = (
  hasMore: boolean = false,
  items: any = defaultItems,
) => ({
  SearchQueryResult: () => ({
    items: () => items,
    hasMore,
  }),
});

const params = {
  i18nQueryByPaginationErrorRef: I18N_MOVIES_QUERY_BY_PAGINATION_ERROR_REF,
  i18nQueryByTextErrorRef: I18N_MOVIES_QUERY_BY_TEXT_ERROR_REF,
  searchType: SchemaTypes.SearchType.MOVIE,
  queryId: 'search_movie',
};

const renderSearchMovies = (
  mockResolvers: IMocks = {},
  navigate = jest.fn(),
) => {
  const SearchMovieScreen = ({navigation, route}) => (
    <TMDBImageQualityProvider>
      <ThemeContextProvider>
        <AutoMockProvider mockResolvers={mockResolvers}>
          <Search
            navigation={{...navigation, navigate}}
            route={route}
            theme={light}
          />
        </AutoMockProvider>
      </ThemeContextProvider>
    </TMDBImageQualityProvider>
  );

  return <MockedNavigation component={SearchMovieScreen} params={params} />;
};

describe('Testing <Search /> - [Movies]', () => {
  beforeEach(() => {
    setupTimeTravel();
  });

  afterEach(() => {
    jest.clearAllMocks();

    cleanup();
  });

  it('should render correctly on the first render', () => {
    storage.get.mockImplementationOnce(() => []);

    const {queryByTestId} = render(renderSearchMovies(getMockResolvers()));

    expect(queryByTestId('loading-media-search')).toBeNull();

    expect(queryByTestId('top-reload-button')).toBeNull();

    expect(queryByTestId('searchbar-wrapper')).not.toBeNull();

    expect(queryByTestId('search-media-list')).not.toBeNull();

    expect(queryByTestId('search-media-list').props.data.length).toEqual(0);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should show the loading-state after user type some text on the search-bar', () => {
    const {queryByTestId} = render(renderSearchMovies(getMockResolvers()));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_MOVIE_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    expect(queryByTestId('loading-media-search')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it("should should show an advise when there's no search results", () => {
    const {queryByTestId} = render(
      renderSearchMovies(getMockResolvers(false, new MockList(0))),
    );

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_MOVIE_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('advise-wrapper')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should show the list with the items returned by the query', () => {
    const {queryByTestId} = render(renderSearchMovies(getMockResolvers()));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_MOVIE_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('search-media-list').props.data.length).toEqual(
      defaultItems.length,
    );
  });

  it('should show an advise when the search returns an empty array', () => {
    const {queryByTestId, getByText} = render(
      renderSearchMovies(getMockResolvers(false, [])),
    );

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_MOVIE_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('advise-wrapper')).not.toBeNull();

    expect(queryByTestId('search-media-list').props.data).toEqual([]);

    expect(
      getByText(TRANSLATIONS.SEARCH_EMPTY_LIST_DESCRIPTION),
    ).not.toBeNull();

    expect(getByText(TRANSLATIONS.SEARCH_EMPTY_LIST_SUGGESTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.SEARCH_EMPTY_LIST_TITLE)).not.toBeNull();
  });

  it('should navigate to tv-show-detail-screen when the user press a certain tv-show-item', () => {
    const INDEX_ITEM_SELECTED =
      (Math.random() * (defaultItems.length - 1 - 0 + 1)) << 0;

    const onPress = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      renderSearchMovies(getMockResolvers(), onPress),
    );

    fireEvent(getByTestId('search-input'), 'onChangeText', SOME_MOVIE_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('search-media-list').props.data.length).toEqual(
      defaultItems.length,
    );

    fireEvent.press(
      getAllByTestId('full-media-list-item')[INDEX_ITEM_SELECTED],
    );

    expect(onPress).toHaveBeenCalledTimes(1);

    expect(onPress).toHaveBeenCalledWith(Routes.Movie.DETAILS, {
      voteAverage: defaultItems[INDEX_ITEM_SELECTED].voteAverage,
      posterPath: defaultItems[INDEX_ITEM_SELECTED].posterPath,
      voteCount: defaultItems[INDEX_ITEM_SELECTED].voteCount,
      genreIds: defaultItems[INDEX_ITEM_SELECTED].genreIds,
      title: defaultItems[INDEX_ITEM_SELECTED].title,
      id: defaultItems[INDEX_ITEM_SELECTED].id,
    });
  });

  it('should navigate to the movie-detail-screen when press some item on the RecentSearch', () => {
    const recentMoviesSearched = Array(5)
      .fill({})
      .map((_, index) => ({
        image: `image-${index}`,
        title: `item-${index}`,
        id: index,
      }));

    storage.get.mockImplementationOnce(() => recentMoviesSearched);

    const INDEX_ITEM_SELECTED =
      (Math.random() * (recentMoviesSearched.length - 1 - 0 + 1)) << 0;

    const onPress = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      renderSearchMovies(getMockResolvers(), onPress),
    );

    fireEvent(getByTestId('search-input'), 'onChangeText', '');

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('recent-searches-list')).not.toBeNull();

    fireEvent.press(
      getAllByTestId('recent-searches-list-item-button')[INDEX_ITEM_SELECTED],
    );

    expect(onPress).toHaveBeenCalledTimes(1);

    expect(onPress).toHaveBeenCalledWith(Routes.Movie.DETAILS, {
      posterPath: recentMoviesSearched[INDEX_ITEM_SELECTED].image,
      title: recentMoviesSearched[INDEX_ITEM_SELECTED].title,
      id: recentMoviesSearched[INDEX_ITEM_SELECTED].id,
    });
  });
});
