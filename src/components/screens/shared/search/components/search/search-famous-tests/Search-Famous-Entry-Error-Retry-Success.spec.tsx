/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import { SearchType } from 'types/schema';
import theme from 'styles/theme';

import { DEFAULT_ANIMATION_DURATION } from '../../../../../../common/popup-advice/PopupAdvice';
import timeTravel, {
  setupTimeTravel,
} from '../../../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../../__mocks__/MockedNavigator';
import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';

import Search from '../Search';

const I18N_FAMOUS_QUERY_BY_PAGINATION_ERROR_REF =
  'I18N_FAMOUS_QUERY_BY_PAGINATION_ERROR_REF';
const I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF = 'I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF';
const SOME_FAMOUS_NAME = 'SOME_FAMOUS_NAME';

const FAMOUS_COUNT = 10;

const getMockResolvers = (hasMore: boolean = false) => ({
  SearchQueryResult: () => ({
    items: () => new MockList(FAMOUS_COUNT),
    hasMore,
  }),
});

const mockResolversWithError = {
  SearchQueryResult: () => new Error(),
};

const params = {
  i18nQueryByPaginationErrorRef: I18N_FAMOUS_QUERY_BY_PAGINATION_ERROR_REF,
  i18nQueryByTextErrorRef: I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF,
  searchType: SearchType.PERSON,
  queryId: 'search_famous',
};

const renderSearchFamous = (mockResolvers: IMocks = {}) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <AutoMockProvider mockResolvers={mockResolvers}>
        <MockedNavigation component={Search} params={params} />
      </AutoMockProvider>
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <Search /> - [Famous # Entry-Error-Retry-Success]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should query again correctly when some error occurs and then the user press the reload-button on the top for the second time and the error doesnt exist anymore', () => {
    const { queryByTestId, queryByText, rerender } = render(
      renderSearchFamous(mockResolversWithError),
    );

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_FAMOUS_NAME);

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

    expect(queryByTestId('search-famous-list').props.data.length).toEqual(0);

    expect(queryByTestId('top-reload-button')).not.toBeNull();

    expect(queryByTestId('popup-advice-wrapper')).not.toBeNull();

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    expect(queryByText(I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF)).not.toBeNull();

    rerender(renderSearchFamous(getMockResolvers()));

    fireEvent.press(queryByTestId('top-reload-button'));

    expect(queryByTestId('famous-loading-list')).not.toBeNull();

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

    expect(queryByTestId('search-famous-list').props.data.length).toEqual(FAMOUS_COUNT);

    expect(queryByTestId('top-reload-button')).toBeNull();
  });
});
