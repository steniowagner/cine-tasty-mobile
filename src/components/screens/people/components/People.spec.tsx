/* eslint-disable import/first */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { cleanup, render, act } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { dark } from 'styles/themes';

import { setupTimeTravel } from '../../../../../__mocks__/timeTravel';

import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import People from './People';

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

const renderPeopleScreen = (mockResolvers?: IMocks) => {
  const PeopleScreen = () => (
    <ThemeProvider
      theme={dark}
    >
      <AutoMockProvider
        mockResolvers={mockResolvers}
      >
        <People
          navigation={navigation}
        />
      </AutoMockProvider>
    </ThemeProvider>
  );

  return (
    <MockedNavigation
      component={PeopleScreen}
    />
  );
};

describe('Testing <People />', () => {
  afterEach(cleanup);

  beforeEach(setupTimeTravel);

  it('should render the loading state when the screen is mounted', () => {
    const { queryByTestId } = render(renderPeopleScreen());

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render the list of people when the loading is over', () => {
    const ITEMS_COUNT = 10;

    const mockResolvers = {
      PeopleQueryResult: () => ({
        items: () => new MockList(ITEMS_COUNT),
      }),
    };

    const { queryByTestId } = render(renderPeopleScreen(mockResolvers));

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('loading-content-indicator')).toBeNull();

    expect(queryByTestId('people-list')).not.toBeNull();

    expect(queryByTestId('people-list').props.data.length).toEqual(ITEMS_COUNT);
  });
});
