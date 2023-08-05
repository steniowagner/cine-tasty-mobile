import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {RenderAPI, render} from '@testing-library/react-native';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {ThemeSettings} from './ThemeSettings';

const mockOnSetDarkTheme = jest.fn();
const mockOSetLightTheme = jest.fn();
const mockOnSetSystemTheme = jest.fn();
let mockThemeId = '';

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Platform: {
      OS: 'ios',
      Version: '12',
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

jest.mock('@src/providers/theme/Theme', () => ({
  useThemeProvider: () => ({
    onSetSystemTheme: mockOnSetSystemTheme,
    onSetLightTheme: mockOSetLightTheme,
    onSetDarkTheme: mockOnSetDarkTheme,
    themeId: mockThemeId,
  }),
}));

const renderThemeSettings = () => (
  <ThemeProvider theme={theme}>
    <ThemeSettings />
  </ThemeProvider>
);

describe('<ThemeSettings /> - [Android - No system-theme support]', () => {
  const elements = {
    optionButtons: (api: RenderAPI) => api.queryAllByTestId('option-settings'),
    optionTitles: (api: RenderAPI) => api.queryAllByTestId('option-title'),
  };

  it('should only show the "Dark" and the "Light" options', () => {
    const component = render(renderThemeSettings());
    expect(elements.optionButtons(component).length).toEqual(2);
    expect(elements.optionTitles(component).length).toEqual(2);
    expect(elements.optionTitles(component)[0].children[0]).toEqual(
      Translations.Tags.SETTINGS_THEME_DARK,
    );
    expect(elements.optionTitles(component)[1].children[0]).toEqual(
      Translations.Tags.SETTINGS_THEME_LIGHT,
    );
  });
});
