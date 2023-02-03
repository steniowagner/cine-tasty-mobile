/* eslint-disable import/first */
import React from 'react';
import {cleanup, fireEvent, render, act} from '@testing-library/react-native';
import {MockList, IMocks} from 'graphql-tools';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';
import * as SchemaTypes from '@schema-types';

import {SEARCH_BY_QUERY_DELAY} from '../use-search/useSearchByQuery';
import Search from '../Search';

const I18N_TV_SHOWS_QUERY_BY_PAGINATION_ERROR_REF =
  'i18nTVShowsQueryByPaginationErrorRef';
const I18N_TV_SHOWS_QUERY_BY_TEXT_ERROR_REF = 'i18nTVShowsQueryByTextErrorRef';
const SOME_TV_SHOWS_NAME = 'SOME_TV_SHOWS_NAME';
const TV_SHOWS_COUNT = 10;

const getMockResolvers = (hasMore: boolean = false) => ({
  SearchQueryResult: () => ({
    items: () => new MockList(TV_SHOWS_COUNT),
    hasMore,
  }),
});

const params = {
  i18nQueryByPaginationErrorRef: I18N_TV_SHOWS_QUERY_BY_PAGINATION_ERROR_REF,
  i18nQueryByTextErrorRef: I18N_TV_SHOWS_QUERY_BY_TEXT_ERROR_REF,
  searchType: SchemaTypes.SearchType.TV,
  queryId: 'search_tv',
};

const renderSearchTVShows = (mockResolvers: IMocks = {}) => (
  <TMDBImageQualityProvider>
    <AutoMockProvider mockResolvers={mockResolvers}>
      <MockedNavigation component={Search} params={params} />
    </AutoMockProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <Search /> - [TVShows-Pagination]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should paginate to the next page when the previous query returned "hasMore" as "true"', () => {
    const {queryByTestId} = render(renderSearchTVShows(getMockResolvers(true)));

    fireEvent(
      queryByTestId('search-input'),
      'onChangeText',
      SOME_TV_SHOWS_NAME,
    );

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
      TV_SHOWS_COUNT * 2,
    );

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should not paginate to the next page when the previous query returned "hasMore" as "false"', () => {
    const {queryByTestId} = render(renderSearchTVShows(getMockResolvers()));

    fireEvent(
      queryByTestId('search-input'),
      'onChangeText',
      SOME_TV_SHOWS_NAME,
    );

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

    expect(queryByTestId('search-media-list').props.data.length).toEqual(
      TV_SHOWS_COUNT,
    );

    act(() => {
      jest.runAllTimers();
    });
  });
});
