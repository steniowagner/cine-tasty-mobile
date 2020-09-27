/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { SearchType } from 'types/schema';
import { dark } from 'styles/themes';

import timeTravel, {
  setupTimeTravel,
} from '../../../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../../__mocks__/MockedNavigator';
import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';
import { SEARCH_MOVIES } from '../../../queries';

import Search from '../Search';

const I18N_MOVIES_QUERY_BY_PAGINATION_ERROR_REF = 'i18nMoviesQueryByPaginationErrorRef';
const I18N_MOVIES_QUERY_BY_TEXT_ERROR_REF = 'i18nMoviesQueryByTextErrorRef';
const SOME_MOVIE_NAME = 'SOME_MOVIE_NAME';

const defaultItems = [
  {
    voteAverage: 72.32837797280146,
    posterPath: 'Hello World',
    genreIds: ['Hello World', 'Hello World'],
    title: 'Hello World',
    id: 78,
    __typename: 'BaseMovie',
  },
  {
    voteAverage: 31.0653079308008,
    posterPath: 'Hello World',
    genreIds: ['Hello World', 'Hello World'],
    title: 'Hello World',
    id: -6,
    __typename: 'BaseMovie',
  },
];

const getMockResolvers = (hasMore: boolean = false, items: any = defaultItems) => ({
  SearchQueryResult: () => ({
    items: () => items,
    hasMore,
  }),
});

const params = {
  i18nQueryByPaginationErrorRef: I18N_MOVIES_QUERY_BY_PAGINATION_ERROR_REF,
  i18nQueryByTextErrorRef: I18N_MOVIES_QUERY_BY_TEXT_ERROR_REF,
  searchType: SearchType.MOVIE,
  query: SEARCH_MOVIES,
};

const renderSearchMovies = (mockResolvers: IMocks = {}) => (
  <ThemeProvider theme={dark}>
    <AutoMockProvider mockResolvers={mockResolvers}>
      <MockedNavigation component={Search} params={params} />
    </AutoMockProvider>
  </ThemeProvider>
);

describe('Testing <Search /> - [Movies]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly on the first render', () => {
    const { queryByTestId } = render(renderSearchMovies(getMockResolvers()));

    expect(queryByTestId('loading-media-search')).toBeNull();

    expect(queryByTestId('top-reload-button')).toBeNull();

    expect(queryByTestId('searchbar-wrapper')).not.toBeNull();

    expect(queryByTestId('search-movies-list')).not.toBeNull();

    expect(queryByTestId('search-movies-list').props.data.length).toEqual(0);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should show the loading-state after user type some text on the search-bar', () => {
    const { queryByTestId } = render(renderSearchMovies(getMockResolvers()));

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
    const { queryByTestId } = render(
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
    const { queryByTestId } = render(renderSearchMovies(getMockResolvers()));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_MOVIE_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('search-movies-list').props.data.length).toEqual(
      defaultItems.length,
    );
  });
});
