/* eslint-disable import/first */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

jest.mock('./hooks/useNews', () => () => ({
  error: new Error('Network error: Network request failed'),
  t: (value: string): string => value,
}));

import AutoMockProvider from '../../../../utils/mock-providers/AutoMockedProvider';
import { dark } from '../../../../styles/themes';
import News from './News';

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

const renderNews = () => (
  <ThemeProvider
    theme={dark}
  >
    <AutoMockProvider>
      <News
        navigation={navigation}
      />
    </AutoMockProvider>
  </ThemeProvider>
);

describe('Testing the Error state of <News />', () => {
  it('should render the advise screen when has a network error', async () => {
    const { queryByTestId } = render(renderNews());

    expect(queryByTestId('news-loading-wrapper')).toBeNull();

    expect(queryByTestId('news-content-wrapper')).toBeNull();

    expect(queryByTestId('news-list')).toBeNull();

    expect(queryByTestId('advise-wrapper')).not.toBeNull();
  });
});
