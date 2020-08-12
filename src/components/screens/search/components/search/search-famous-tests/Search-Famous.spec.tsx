/* eslint-disable import/first */
import React from 'react';
import {
  cleanup, fireEvent, render, act,
} from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { SearchType } from 'types/schema';
import { dark } from 'styles/themes';

import timeTravel, { setupTimeTravel } from '../../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../__mocks__/MockedNavigator';
import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';
import { SEARCH_PERSON } from '../../../queries';

import Search from '../Search';

const I18N_FAMOUS_QUERY_BY_PAGINATION_ERROR_REF = 'i18nFamousQueryByPaginationErrorRef';
const I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF = 'i18nFamousQueryByTextErrorRef';
const SOME_FAMOUS_NAME = 'SOME_FAMOUS_NAME';
const FAMOUS_COUNT = 10;

const getMockResolvers = (hasMore: boolean = false) => ({
  SearchQueryResult: () => ({
    items: () => new MockList(FAMOUS_COUNT),
    hasMore,
  }),
});

const params = {
  i18nQueryByPaginationErrorRef: I18N_FAMOUS_QUERY_BY_PAGINATION_ERROR_REF,
  i18nQueryByTextErrorRef: I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF,
  searchType: SearchType.PERSON,
  query: SEARCH_PERSON,
};

const renderSearchFamous = (mockResolvers: IMocks = {}) => (
  <ThemeProvider
    theme={dark}
  >
    <AutoMockProvider
      mockResolvers={mockResolvers}
    >
      <MockedNavigation
        component={Search}
        params={params}
      />
    </AutoMockProvider>
  </ThemeProvider>
);

describe('Testing <Search /> - [Famous]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly on the first render', () => {
    const { queryByTestId } = render(renderSearchFamous(getMockResolvers()));

    expect(queryByTestId('loading-content-indicator')).toBeNull();

    expect(queryByTestId('top-reload-button')).toBeNull();

    expect(queryByTestId('searchbar-wrapper')).not.toBeNull();

    expect(queryByTestId('search-list')).not.toBeNull();

    expect(queryByTestId('search-list').props.data.length).toEqual(0);
  });

  it('should show the loading-state after user type some text on the search-bar', () => {
    const { queryByTestId } = render(renderSearchFamous(getMockResolvers()));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_FAMOUS_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should show the list with the items returned by the query', () => {
    const { queryByTestId } = render(renderSearchFamous(getMockResolvers()));

    fireEvent(queryByTestId('search-input'), 'onChangeText', SOME_FAMOUS_NAME);

    act(() => {
      timeTravel(SEARCH_BY_QUERY_DELAY);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('search-list').props.data.length).toEqual(FAMOUS_COUNT);
  });
});
