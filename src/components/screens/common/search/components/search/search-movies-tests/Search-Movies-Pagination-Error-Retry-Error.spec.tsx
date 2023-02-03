/* eslint-disable import/first */
import React from 'react';
import {cleanup, fireEvent, render, act} from '@testing-library/react-native';
import {MockList, IMocks} from 'graphql-tools';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import * as SchemaTypes from '@schema-types';

import {DEFAULT_ANIMATION_DURATION} from '@components/common/popup-advice/PopupAdvice';
import {SEARCH_BY_QUERY_DELAY} from '../use-search/useSearchByQuery';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';

import Search from '../Search';

const I18N_MOVIES_QUERY_BY_PAGINATION_ERROR_REF =
  'i18nMoviesQueryByPaginationErrorRef';
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

describe('Testing <Search /> - [Movies-Pagination-Error-Retry-Error]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should paginate correctly when some error occurs and then the user press the reload-button and the error doesnt exist anymore', () => {
    const {queryByTestId, rerender} = render(
      renderSearchMovies(getMockResolvers(true)),
    );

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_MOVIE_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });

    rerender(renderSearchMovies(mockResolversWithError));

    fireEvent(queryByTestId('search-media-list'), 'onEndReached');

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

        fireEvent.press(queryByTestId('pagination-footer-reload-button'));
      }
    });

    rerender(renderSearchMovies(getMockResolvers(true)));

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

        expect(queryByTestId('loading-footer-wrapper')).toBeNull();

        expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

        expect(queryByTestId('search-media-list').props.data.length).toEqual(
          MOVIES_COUNT * 2,
        );
      }
    });
  });
});
