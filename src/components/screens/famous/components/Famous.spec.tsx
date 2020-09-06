/* eslint-disable import/first */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { dark } from 'styles/themes';

import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import Famous from './Famous';

const navigation = {
  setOptions: () => ({
    // eslint-disable-next-line react/display-name
    headerRight: () => <TouchableOpacity onPress={jest.fn} />,
  }),
};

const renderFamousScreen = (mockResolvers?: IMocks) => {
  const FamousScreen = () => (
    <ThemeProvider theme={dark}>
      <AutoMockProvider mockResolvers={mockResolvers}>
        <Famous navigation={navigation} />
      </AutoMockProvider>
    </ThemeProvider>
  );

  return <MockedNavigation component={FamousScreen} />;
};

describe('Testing <Famous />', () => {
  afterEach(cleanup);

  beforeEach(setupTimeTravel);

  it('should render the loading state when the screen is mounted', () => {
    const { queryByTestId } = render(renderFamousScreen());

    expect(queryByTestId('famous-loading-list')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render the list of famous when the loading is over', () => {
    const ITEMS_COUNT = 10;

    const mockResolvers = {
      PeopleQueryResult: () => ({
        items: () => new MockList(ITEMS_COUNT),
      }),
    };

    const { queryByTestId } = render(renderFamousScreen(mockResolvers));

    expect(queryByTestId('famous-loading-list')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('famous-loading-list')).toBeNull();

    expect(queryByTestId('famous-list')).not.toBeNull();

    expect(queryByTestId('famous-list').props.data.length).toEqual(ITEMS_COUNT);
  });
});
