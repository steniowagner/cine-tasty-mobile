/* eslint-disable import/first */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  fireEvent, cleanup, render, act,
} from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { dark } from 'styles/themes';

import { DEFAULT_ANIMATION_DURATION } from '../../../common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import { I18N_ENTRY_QUERY_ERROR_REF } from './useFamous';

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
    headerRight: () => (
      <TouchableOpacity
        onPress={jest.fn}
      />
    ),
  }),
};

const renderFamousScreen = (resolvers?: IMocks) => (
  <ThemeProvider
    theme={dark}
  >
    <AutoMockProvider
      mockResolvers={resolvers}
    >
      <Famous
        navigation={navigation}
      />
    </AutoMockProvider>
  </ThemeProvider>
);

describe('Testing <News /> [Pull-to-Refresh]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should show the refreshing-state when the user pull the list to refresh data', () => {
    const { queryByTestId } = render(renderFamousScreen(getMockResolvers()));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('famous-list')).not.toBeNull();

    expect(queryByTestId('famous-list').props.data.length).toEqual(FAMOUS_COUNT);

    expect(queryByTestId('loading-content-indicator')).toBeNull();

    fireEvent(queryByTestId('famous-list').props.refreshControl, 'refresh');

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    expect(queryByTestId('famous-list')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('famous-list')).not.toBeNull();

    expect(queryByTestId('famous-list').props.data.length).toEqual(FAMOUS_COUNT);
  });

  it('should show a error-message and a reload-button on the top of the screen when the user try to pull-to-refresh and some error occur', () => {
    const { queryByTestId, queryByText, rerender } = render(
      renderFamousScreen(getMockResolvers()),
    );

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderFamousScreen(mockResolversWithError));

    fireEvent(queryByTestId('famous-list').props.refreshControl, 'refresh');

    expect(queryByTestId('top-reload-button')).toBeNull();

    expect(queryByText(I18N_ENTRY_QUERY_ERROR_REF)).toBeNull();

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('top-reload-button')).not.toBeNull();

        expect(queryByText(I18N_ENTRY_QUERY_ERROR_REF)).not.toBeNull();
      }
    });
  });

  it("should refresh the list when some error occur during the first render and the user press the reload button and erro doesn't happen anymore", () => {
    const { queryByTestId, rerender } = render(
      renderFamousScreen(mockResolversWithError),
    );

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('famous-list').props.data.length).toEqual(0);

        expect(queryByTestId('top-reload-button')).not.toBeNull();
      }
    });

    rerender(renderFamousScreen(getMockResolvers()));

    fireEvent.press(queryByTestId('top-reload-button'));

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('famous-list').props.data.length).toEqual(FAMOUS_COUNT);

        expect(queryByTestId('top-reload-button')).toBeNull();
      }
    });
  });

  it('should persist the entry-error-state when the user try to press the reload-button and the error still hapenning', () => {
    const { queryByTestId } = render(renderFamousScreen(mockResolversWithError));

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('famous-list').props.data.length).toEqual(0);

        expect(queryByTestId('top-reload-button')).not.toBeNull();
      }
    });

    fireEvent.press(queryByTestId('top-reload-button'));

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('famous-list').props.data.length).toEqual(0);

        expect(queryByTestId('top-reload-button')).not.toBeNull();
      }
    });
  });
});
