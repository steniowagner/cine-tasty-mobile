/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { SearchType } from 'types/schema';
import theme from 'styles/theme';

import { DEFAULT_ANIMATION_DURATION } from '../../../../../../common/popup-advice/PopupAdvice';
import timeTravel, {
  setupTimeTravel,
} from '../../../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../../__mocks__/MockedNavigator';
import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';
import { SEARCH_MOVIES } from '../../../queries';

import Search from '../Search';

const I18N_MOVIE_QUERY_BY_PAGINATION_ERROR_REF = 'i18nMoviesQueryByPaginationErrorRef';
const I18N_MOVIE_QUERY_BY_TEXT_ERROR_REF = 'i18nMoviesQueryByTextErrorRef';
const SOME_MOVIE_NAME = 'SOME_MOVIE_NAME';
const MOVIE_COUNT = 10;

const getMockResolvers = (hasMore: boolean = false) => ({
  SearchQueryResult: () => ({
    items: () => new MockList(MOVIE_COUNT),
    hasMore,
  }),
});

const mockResolversWithError = {
  SearchQueryResult: () => new Error(),
};

const params = {
  i18nQueryByPaginationErrorRef: I18N_MOVIE_QUERY_BY_PAGINATION_ERROR_REF,
  i18nQueryByTextErrorRef: I18N_MOVIE_QUERY_BY_TEXT_ERROR_REF,
  searchType: SearchType.MOVIE,
  query: SEARCH_MOVIES,
};

const renderSearchMovie = (mockResolvers: IMocks = {}) => (
  <ThemeProvider theme={theme}>
    <AutoMockProvider mockResolvers={mockResolvers}>
      <MockedNavigation component={Search} params={params} />
    </AutoMockProvider>
  </ThemeProvider>
);

describe('Testing <Search /> - [Movie-Pagination-Retry-Success]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should paginate correctly when some error occurs and then the user press the reload-button and the error doesnt exist anymore', () => {
    const { queryByTestId, rerender } = render(renderSearchMovie(getMockResolvers(true)));

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

    rerender(renderSearchMovie(mockResolversWithError));

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

    rerender(renderSearchMovie(getMockResolvers(true)));

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
          MOVIE_COUNT * 2,
        );
      }
    });
  });
});
