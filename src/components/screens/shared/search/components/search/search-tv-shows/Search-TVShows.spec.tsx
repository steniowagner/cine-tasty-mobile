/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import { SearchType } from 'types/schema';
import theme from 'styles/theme';

jest.mock('../../../../../../../utils/async-storage-adapter/AsyncStorageAdapter');

import timeTravel, {
  setupTimeTravel,
} from '../../../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../../__mocks__/MockedNavigator';
import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';

const {
  getItemFromStorage,
} = require('../../../../../../../utils/async-storage-adapter/AsyncStorageAdapter');

import Search, {
  ADVISE_EMPTY_LIST_DESCRIPTION_I18N_REF,
  ADVISE_EMPTY_LIST_SUGGESTION_I18N_REF,
  ADVISE_EMPTY_LIST_TITLE_I18N_REF,
} from '../Search';

const I18N_TV_SHOWS_QUERY_BY_PAGINATION_ERROR_REF =
  'i18nTVShowsQueryByPaginationErrorRef';
const I18N_TV_SHOWS_QUERY_BY_TEXT_ERROR_REF = 'i18nTVShowsQueryByTextErrorRef';
const SOME_TV_SHOWS_NAME = 'SOME_TV_SHOWS_NAME';

const defaultItems = Array(10)
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

const getMockResolvers = (hasMore: boolean = false, items: any = defaultItems) => ({
  SearchQueryResult: () => ({
    items: () => items,
    hasMore,
  }),
});

const params = {
  i18nQueryByPaginationErrorRef: I18N_TV_SHOWS_QUERY_BY_PAGINATION_ERROR_REF,
  i18nQueryByTextErrorRef: I18N_TV_SHOWS_QUERY_BY_TEXT_ERROR_REF,
  searchType: SearchType.TV,
  queryId: 'search_tv',
};

const renderSearchTVShows = (mockResolvers: IMocks = {}, navigate = jest.fn()) => {
  const SearchTVShowsScreen = ({ navigation, route }) => (
    <TMDBImageQualityProvider>
      <ThemeProvider theme={theme}>
        <AutoMockProvider mockResolvers={mockResolvers}>
          <Search navigation={{ ...navigation, navigate }} route={route} />
        </AutoMockProvider>
      </ThemeProvider>
    </TMDBImageQualityProvider>
  );

  return <MockedNavigation component={SearchTVShowsScreen} params={params} />;
};

describe('Testing <Search /> - [TVShows]', () => {
  beforeEach(setupTimeTravel);

  afterEach(() => {
    jest.clearAllMocks();

    cleanup();
  });

  it('should render correctly on the first render', () => {
    getItemFromStorage.mockImplementationOnce(() => []);

    const { queryByTestId } = render(renderSearchTVShows(getMockResolvers()));

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
    const { queryByTestId } = render(renderSearchTVShows(getMockResolvers()));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_TV_SHOWS_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    expect(queryByTestId('loading-media-search')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it("should should show an advise when there's no search results", () => {
    const { queryByTestId } = render(
      renderSearchTVShows(getMockResolvers(false, new MockList(0))),
    );

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_TV_SHOWS_NAME);

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
    const { queryByTestId } = render(renderSearchTVShows(getMockResolvers()));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_TV_SHOWS_NAME);

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
    const { queryByTestId, getByText } = render(
      renderSearchTVShows(getMockResolvers(false, [])),
    );

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_TV_SHOWS_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('advise-wrapper')).not.toBeNull();

    expect(queryByTestId('search-media-list').props.data).toEqual([]);

    expect(getByText(ADVISE_EMPTY_LIST_DESCRIPTION_I18N_REF)).not.toBeNull();

    expect(getByText(ADVISE_EMPTY_LIST_SUGGESTION_I18N_REF)).not.toBeNull();

    expect(getByText(ADVISE_EMPTY_LIST_TITLE_I18N_REF)).not.toBeNull();
  });

  it('should navigate to tv-show-detail-screen when the user press a certain tv-show-item', () => {
    const INDEX_ITEM_SELECTED = (Math.random() * (defaultItems.length - 1 - 0 + 1)) << 0;
    const onPress = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderSearchTVShows(getMockResolvers(), onPress),
    );

    fireEvent(getByTestId('search-input'), 'onChangeText', SOME_TV_SHOWS_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('search-media-list').props.data.length).toEqual(
      defaultItems.length,
    );

    fireEvent.press(getAllByTestId('full-media-list-item')[INDEX_ITEM_SELECTED]);

    expect(onPress).toHaveBeenCalledTimes(1);

    expect(onPress).toHaveBeenCalledWith('TV_SHOW_DETAIL', {
      voteAverage: defaultItems[INDEX_ITEM_SELECTED].voteAverage,
      posterPath: defaultItems[INDEX_ITEM_SELECTED].posterPath,
      voteCount: defaultItems[INDEX_ITEM_SELECTED].voteCount,
      genreIds: defaultItems[INDEX_ITEM_SELECTED].genreIds,
      title: defaultItems[INDEX_ITEM_SELECTED].name,
      id: defaultItems[INDEX_ITEM_SELECTED].id,
    });
  });

  it('should navigate to the tv-show-detail-screen when press some item on the RecentSearch', () => {
    const recentTVShowsSearched = Array(5)
      .fill({})
      .map((_, index) => ({
        image: `image-${index}`,
        title: `item-${index}`,
        id: index,
      }));

    getItemFromStorage.mockImplementationOnce(() => recentTVShowsSearched);

    const INDEX_ITEM_SELECTED =
      (Math.random() * (recentTVShowsSearched.length - 1 - 0 + 1)) << 0;

    const onPress = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderSearchTVShows(getMockResolvers(), onPress),
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

    expect(onPress).toHaveBeenCalledWith('TV_SHOW_DETAIL', {
      posterPath: recentTVShowsSearched[INDEX_ITEM_SELECTED].image,
      title: recentTVShowsSearched[INDEX_ITEM_SELECTED].title,
      id: recentTVShowsSearched[INDEX_ITEM_SELECTED].id,
    });
  });
});
