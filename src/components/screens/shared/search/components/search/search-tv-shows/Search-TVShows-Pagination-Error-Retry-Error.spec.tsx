/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import * as SchemaTypes from '@schema-types';
import theme from '@styles/theme';

import { DEFAULT_ANIMATION_DURATION } from '../../../../../../common/popup-advice/PopupAdvice';
import timeTravel, {
  setupTimeTravel,
} from '../../../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../../__mocks__/MockedNavigator';
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
    <ThemeProvider theme={theme}>
      <AutoMockProvider mockResolvers={mockResolvers}>
        <MockedNavigation component={Search} params={params} />
      </AutoMockProvider>
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <Search /> - [TVShows-Pagination-Error-Retry-Error]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should paginate correctly when some error occurs and then the user press the reload-button and the error doesnt exist anymore', () => {
    const { queryByTestId, rerender } = render(
      renderSearchTVShows(getMockResolvers(true)),
    );

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_TV_SHOW_NAME);

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

    rerender(renderSearchTVShows(mockResolversWithError));

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

    rerender(renderSearchTVShows(getMockResolvers(true)));

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
          TV_SHOWS_COUNT * 2,
        );
      }
    });
  });
});
