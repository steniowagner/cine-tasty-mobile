/* eslint-disable global-require */
import React from 'react';
import { fireEvent, render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import NewsListItem, { Props } from './NewsListItem';

jest.useFakeTimers();

const mockOnPressItem = jest.fn();

jest.mock('react-native', () => {
  const Animated = require('react-native/Libraries/Animated/src/Animated.js');
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
    Animated,
    View,
  };
});

const NEWS_URL = 'http://www.com';

type OptionalProps = {
  [K in keyof Omit<Props, 'withRTL'>]?: string;
};

type ExtraOptionalProps = {
  withRTL?: boolean;
};

const renderNewsListItem = (optionalProps: OptionalProps & ExtraOptionalProps = {}) => (
  <ThemeProvider
    theme={dark}
  >
    <NewsListItem
      withRTL={optionalProps.withRTL || false}
      source={optionalProps.source || 'source'}
      image={optionalProps.image || 'image'}
      text={optionalProps.text || 'text'}
      date={optionalProps.date || 'date'}
      url={optionalProps.url || 'url'}
    />
  </ThemeProvider>
);

jest.useFakeTimers();

describe('Testing <NewsListItem />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the correctly', () => {
    const { getByTestId } = render(renderNewsListItem());

    expect(getByTestId('news-list-item-wrapper')).not.toBeNull();
  });

  it('should call Linking when pressed', () => {
    const { getByTestId } = render(renderNewsListItem({ url: NEWS_URL }));

    fireEvent.press(getByTestId('news-list-item-wrapper'));

    expect(mockOnPressItem).toHaveBeenCalledTimes(1);

    expect(mockOnPressItem).toHaveBeenCalledWith(NEWS_URL);
  });
});
