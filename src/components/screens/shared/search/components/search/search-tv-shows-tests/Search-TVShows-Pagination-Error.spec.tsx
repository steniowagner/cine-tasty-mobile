/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { DEFAULT_ANIMATION_DURATION } from '@components/common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '@mocks/timeTravel';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';
import * as SchemaTypes from '@schema-types';

import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';
import Search from '../Search';

const I18N_TV_SHOWS_QUERY_BY_PAGINATION_ERROR_REF =
  'i18nTVShowsQueryByPaginationErrorRef';
const I18N_TV_SHOWS_QUERY_BY_TEXT_ERROR_REF = 'i18nTVShowsQueryByTextErrorRef';
const SOME_TV_SHOW_NAME = 'SOME_TV_SHOW_NAME';
const TV_SHOWS_COUNT = 10;

const getMockResolvers = (hasMore: boolean = false) => ({
  SearchQueryResult: () => ({
    items: () => new MockList(TV_SHOWS_COUNT),
    hasMore,
  }),
});

const mockResolversWithError = {
  SearchQueryResult: () => new Error(),
};

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

describe('Testing <Search /> - [TVShows-Pagination-Error]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should show an error-message when the user tries to paginate and some error occurs', () => {
    const { queryByTestId, queryByText, rerender } = render(
      renderSearchTVShows(getMockResolvers(true)),
    );

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_TV_SHOW_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('search-media-list').props.data.length).toEqual(TV_SHOWS_COUNT);

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    rerender(renderSearchTVShows(mockResolversWithError));

    fireEvent(queryByTestId('search-media-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    expect(queryByTestId('search-media-list').props.data.length).toEqual(TV_SHOWS_COUNT);

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

        expect(queryByTestId('pagination-footer-reload-button')).not.toBeNull();

        expect(queryByTestId('loading-footer-wrapper')).toBeNull();

        expect(queryByTestId('popup-advice-wrapper')).not.toBeNull();

        expect(queryByText(I18N_TV_SHOWS_QUERY_BY_PAGINATION_ERROR_REF)).not.toBeNull();
      }
    });
  });
});
