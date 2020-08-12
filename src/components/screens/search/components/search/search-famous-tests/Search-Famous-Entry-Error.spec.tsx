/* eslint-disable import/first */
import React from 'react';
import {
  cleanup, fireEvent, render, act,
} from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import { IMocks } from 'graphql-tools';

import { SearchType } from 'types/schema';
import { dark } from 'styles/themes';

import { DEFAULT_ANIMATION_DURATION } from '../../../../../common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '../../../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../../__mocks__/MockedNavigator';
import { SEARCH_BY_QUERY_DELAY } from '../use-search/useSearchByQuery';
import { SEARCH_PERSON } from '../../../queries';

import Search from '../Search';

const I18N_FAMOUS_QUERY_BY_PAGINATION_ERROR_REF = 'I18N_FAMOUS_QUERY_BY_PAGINATION_ERROR_REF';
const I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF = 'I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF';
const SOME_FAMOUS_NAME = 'SOME_FAMOUS_NAME';

const mockResolversWithError = {
  SearchQueryResult: () => new Error(),
};

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

describe('Testing <Search /> - [Famous-Entry-Error]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should show an error-message when some error occurs on the first query', () => {
    const { queryByTestId, queryByText } = render(
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

    expect(queryByTestId('search-list').props.data.length).toEqual(0);

    expect(queryByTestId('top-reload-button')).not.toBeNull();

    expect(queryByTestId('popup-advice-wrapper')).not.toBeNull();

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    expect(queryByText(I18N_FAMOUS_QUERY_BY_TEXT_ERROR_REF)).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });
  });
});
