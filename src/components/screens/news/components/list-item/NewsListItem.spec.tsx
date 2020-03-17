import React from 'react';
import { fireEvent, render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { dark } from '../../../../../styles/themes';
import NewsListItem from './NewsListItem';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockOnPressItem = jest.fn();

jest.mock('react-native', () => {
  // eslint-disable-next-line global-require
  const View = require('react-native/Libraries/Components/View/View');

  return {
    Linking: {
      openURL: (url: string) => mockOnPressItem(url),
    },
    Platform: {
      OS: 'ios',
    },
    Dimensions: {
      get: jest.fn().mockReturnValueOnce({ width: 100, height: 100 }),
    },
    PixelRatio: {
      roundToNearestPixel: jest.fn().mockReturnValueOnce(1),
    },
    TouchableOpacity: View,
    Image: View,
    Text: View,
    View,
  };
});

const NEWS_URL = 'http://www.com';

describe('Testing <NewsListItem />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider
        theme={dark}
      >
        <NewsListItem
          source="source"
          image="image"
          text="text"
          date="date"
          url="url"
        />
      </ThemeProvider>,
    );

    expect(getByTestId('news-list-item-wrapper')).not.toBeNull();
  });

  it('should call Linking when pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider
        theme={dark}
      >
        <NewsListItem
          source="source"
          url={NEWS_URL}
          image="image"
          text="text"
          date="date"
        />
      </ThemeProvider>,
    );

    fireEvent.press(getByTestId('news-list-item-wrapper'));

    expect(mockOnPressItem).toHaveBeenCalledTimes(1);

    expect(mockOnPressItem).toHaveBeenCalledWith(NEWS_URL);
  });
});
