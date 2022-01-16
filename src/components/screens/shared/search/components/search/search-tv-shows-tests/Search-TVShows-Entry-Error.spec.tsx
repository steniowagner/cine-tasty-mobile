/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { DEFAULT_ANIMATION_DURATION } from '@components/common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '@mocks/timeTravel';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';
import * as SchemaTypes from '@schema-types';

import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';
import Search from '../Search';

const I18N_TV_SHOWS_QUERY_BY_TEXT_ERROR_REF = 'I18N_TV_SHOWS_QUERY_BY_TEXT_ERROR_REF';
const I18N_TV_SHOWS_QUERY_BY_PAGINATION_ERROR_REF =
  'I18N_TV_SHOWS_QUERY_BY_PAGINATION_ERROR_REF';
const SOME_TV_SHOW_NAME = 'SOME_TV_SHOW_NAME';

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

describe('Testing <Search /> - [TVShows-Entry-Error]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should show an error-message when some error occurs on the first query', () => {
    const { queryByTestId, queryByText } = render(
      renderSearchTVShows(mockResolversWithError),
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

    expect(queryByTestId('search-media-list').props.data.length).toEqual(0);

    expect(queryByTestId('top-reload-button')).not.toBeNull();

    expect(queryByTestId('popup-advice-wrapper')).not.toBeNull();

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    expect(queryByText(I18N_TV_SHOWS_QUERY_BY_TEXT_ERROR_REF)).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });
  });
});
