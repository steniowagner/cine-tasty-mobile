/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import * as SchemaTypes from '@schema-types';

import { DEFAULT_ANIMATION_DURATION } from '../../../../../../common/popup-advice/PopupAdvice';
import timeTravel, {
  setupTimeTravel,
} from '../../../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../../__mocks__/MockedNavigator';
import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';

import Search from '../Search';

const I18N_MOVIES_QUERY_BY_PAGINATION_ERROR_REF = 'i18nMoviesQueryByPaginationErrorRef';
const I18N_MOVIES_QUERY_BY_TEXT_ERROR_REF = 'i18nMoviesQueryByTextErrorRef';
const SOME_MOVIE_NAME = 'SOME_MOVIE_NAME';
const MOVIES_COUNT = 10;

const getMockResolvers = (hasMore: boolean = false) => ({
  SearchQueryResult: () => ({
    items: () => new MockList(MOVIES_COUNT),
    hasMore,
  }),
});

const mockResolversWithError = {
  SearchQueryResult: () => new Error(),
};

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

describe('Testing <Search /> - [Movies-Pagination-Error]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should show an error-message when the user tries to paginate and some error occurs', () => {
    const { queryByTestId, queryByText, rerender } = render(
      renderSearchMovies(getMockResolvers(true)),
    );

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_MOVIE_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('search-media-list').props.data.length).toEqual(MOVIES_COUNT);

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    rerender(renderSearchMovies(mockResolversWithError));

    fireEvent(queryByTestId('search-media-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    expect(queryByTestId('search-media-list').props.data.length).toEqual(MOVIES_COUNT);

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

        expect(queryByText(I18N_MOVIES_QUERY_BY_PAGINATION_ERROR_REF)).not.toBeNull();
      }
    });
  });
});
