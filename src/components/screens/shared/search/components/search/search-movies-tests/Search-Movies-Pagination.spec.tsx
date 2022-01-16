/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import timeTravel, { setupTimeTravel } from '@mocks/timeTravel';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';
import * as SchemaTypes from '@schema-types';

import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';
import Search from '../Search';

const I18N_MOVIES_QUERY_BY_PAGINATION_ERROR_REF = 'i18nMoviesQueryByPaginationErrorRef';
const I18N_MOVIES_QUERY_BY_TEXT_ERROR_REF = 'i18nMoviesQueryByTextErrorRef';
const SOME_MOVIES_NAME = 'SOME_MOVIES_NAME';
const MOVIES_COUNT = 10;

const getMockResolvers = (hasMore: boolean = false) => ({
  SearchQueryResult: () => ({
    items: () => new MockList(MOVIES_COUNT),
    hasMore,
  }),
});

const params = {
  i18nQueryByPaginationErrorRef: I18N_MOVIES_QUERY_BY_PAGINATION_ERROR_REF,
  i18nQueryByTextErrorRef: I18N_MOVIES_QUERY_BY_TEXT_ERROR_REF,
  searchType: SchemaTypes.SearchType.MOVIE,
  queryId: 'search_movie',
};

const renderSearchMovies = (mockResolvers: IMocks = {}) => (
  <TMDBImageQualityProvider>
    <AutoMockProvider mockResolvers={mockResolvers}>
      <MockedNavigation component={Search} params={params} />
    </AutoMockProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <Search /> - [Movies-Pagination]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should paginate to the next page when the previous query returned "hasMore" as "true"', () => {
    const { queryByTestId } = render(renderSearchMovies(getMockResolvers(true)));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_MOVIES_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('search-media-list')).not.toBeNull();

    fireEvent(queryByTestId('search-media-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('search-media-list').props.data.length).toEqual(
      MOVIES_COUNT * 2,
    );

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should not paginate to the next page when the previous query returned "hasMore" as "false"', () => {
    const { queryByTestId } = render(renderSearchMovies(getMockResolvers()));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_MOVIES_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('search-media-list')).not.toBeNull();

    fireEvent(queryByTestId('search-media-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    expect(queryByTestId('search-media-list').props.data.length).toEqual(MOVIES_COUNT);

    act(() => {
      jest.runAllTimers();
    });
  });
});
