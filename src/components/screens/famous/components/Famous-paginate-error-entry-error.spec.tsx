/* eslint-disable import/first */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { ThemeContextProvider } from '@providers';
import * as TRANSLATIONS from '@i18n/tags';

import { DEFAULT_ANIMATION_DURATION } from '../../../common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import Famous from './Famous';

const FAMOUS_COUNT = 10;

const getMockResolvers = (hasMore: boolean = false) => ({
  PeopleQueryResult: () => ({
    items: () => new MockList(FAMOUS_COUNT),
    hasMore,
  }),
});

const mockResolversWithError = {
  PeopleQueryResult: () => new Error(),
};

const navigation = {
  setOptions: () => ({
    // eslint-disable-next-line react/display-name
    headerRight: () => <TouchableOpacity onPress={jest.fn} />,
  }),
};

const renderFamousScreen = (resolvers?: IMocks) => (
  <TMDBImageQualityProvider>
    <ThemeContextProvider>
      <AutoMockProvider mockResolvers={resolvers}>
        <Famous navigation={navigation} />
      </AutoMockProvider>
    </ThemeContextProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <Famous /> [Pagination-Entry-Error]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should show an error message about pagination-error and a list-footer-error-state when the user tries to paginated and some error occurs', () => {
    const { queryByTestId, queryByText, rerender } = render(
      renderFamousScreen(getMockResolvers(true)),
    );

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });

    expect(queryByTestId('famous-list').props.data.length).toEqual(FAMOUS_COUNT);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    rerender(renderFamousScreen(mockResolversWithError));

    fireEvent(queryByTestId('famous-list'), 'onEndReached');

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

        expect(queryByTestId('pagination-footer-reload-button')).not.toBeNull();

        expect(queryByTestId('loading-footer-wrapper')).toBeNull();

        expect(queryByTestId('popup-advice-wrapper')).not.toBeNull();

        expect(queryByText(TRANSLATIONS.FAMOUS_QUERY_BY_PAGINATION_ERROR)).not.toBeNull();
      }
    });
  });
});
