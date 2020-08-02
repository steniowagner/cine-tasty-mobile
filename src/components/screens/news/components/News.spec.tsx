/* eslint-disable import/first */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { cleanup, render, act } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { dark } from 'styles/themes';

import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import News from './News';

const navigation = {
  setOptions: () => ({
    // eslint-disable-next-line react/display-name
    headerRight: () => <TouchableOpacity onPress={jest.fn} />,
  }),
};

const renderNews = (mockResolvers?: IMocks) => (
  <ThemeProvider theme={dark}>
    <AutoMockProvider mockResolvers={mockResolvers}>
      <News navigation={navigation} />
    </AutoMockProvider>
  </ThemeProvider>
);

describe('Testing <News />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render the loading state correctly when is mounted from the first time', () => {
    const { queryByTestId } = render(renderNews());

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });
});
