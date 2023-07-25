import React from 'react';
import {RenderAPI, render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes';

import {HeaderBackButton} from './HeaderBackButton';
import * as Styles from './HeaderBackButton.styles';

jest.mock('react-native-svg', () => {
  const SvgXml = require('react-native/Libraries/Components/View/View');
  return {
    SvgXml,
  };
});

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Platform: {
      OS: 'ios',
      select: ({ios}) => ios,
    },
    Dimensions: {
      get: () => ({width: 100, height: 100}),
    },
    View,
    Text: View,
    TouchableOpacity: View,
    ActivityIndicator: View,
    ScrollView: View,
    FlatList: View,
    StatusBar: View,
    Animated: {
      View,
    },
    StyleSheet: {
      create: () => 1,
    },
    PixelRatio: {
      roundToNearestPixel: () => 1,
      Text: View,
      View,
    },
  };
});

const renderHeaderBackButton = (onPress = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <HeaderBackButton onPress={onPress} color="background" />
  </ThemeProvider>
);

describe('<HeaderBackButton /> - [iOS]', () => {
  const elements = {
    buttonWrapper: (api: RenderAPI) => api.queryByTestId('header-back-button'),
    arrowBackIcon: (api: RenderAPI) =>
      api.queryByTestId(`icon-${Styles.IOS_ICON_ID}`),
  };

  it('should render the correct Icon', () => {
    const component = render(renderHeaderBackButton());
    expect(elements.arrowBackIcon(component)).not.toBeNull();
  });

  it('should set the correct size for the Icon', () => {
    const component = render(renderHeaderBackButton());
    expect(elements.arrowBackIcon(component).props.width).toEqual(
      Styles.IOS_ICON_SIZE,
    );
    expect(elements.arrowBackIcon(component).props.height).toEqual(
      Styles.IOS_ICON_SIZE,
    );
  });

  describe('Press', () => {
    it('should call "onPress" when the user press', () => {
      const onPress = jest.fn();
      const component = render(renderHeaderBackButton(onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.buttonWrapper(component));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
