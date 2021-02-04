/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import { SearchType } from 'types/schema';
import theme from 'styles/theme';

import timeTravel, {
  setupTimeTravel,
} from '../../../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../../__mocks__/MockedNavigator';
import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';
import { SEARCH_TV_SHOWS } from '../../../queries';

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
  searchType: SearchType.TV,
  query: SEARCH_TV_SHOWS,
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

describe('Testing <Search /> - [TVShows-Pagination]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should paginate to the next page when the previous query returned "hasMore" as "true"', () => {
    const { queryByTestId } = render(renderSearchTVShows(getMockResolvers(true)));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_TV_SHOWS_NAME);

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
    const { queryByTestId } = render(renderSearchTVShows(getMockResolvers()));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_TV_SHOWS_NAME);

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

    expect(queryByTestId('search-media-list').props.data.length).toEqual(TV_SHOWS_COUNT);

    act(() => {
      jest.runAllTimers();
    });
  });
});
