import React from 'react';
import { fireEvent, render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import NewsListItem, { Props } from './NewsListItem';
import { dark } from '../../../../../styles/themes';

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
