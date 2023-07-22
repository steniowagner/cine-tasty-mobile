import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {
  RenderAPI,
  fireEvent,
  render,
  within,
} from '@testing-library/react-native';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';
import * as Types from '@local-types';

import {ThemeSettings} from './ThemeSettings';

const mockOnSetDarkTheme = jest.fn();
const mockOSetLightTheme = jest.fn();
const mockOnSetSystemTheme = jest.fn();
let mockThemeId = '';

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
      Version: '13',
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

describe('<ThemeSettings /> - [Android]', () => {
  const elements = {
    optionButtons: (api: RenderAPI) => api.queryAllByTestId('option-settings'),
    optionTitles: (api: RenderAPI) => api.queryAllByTestId('option-title'),
  };

  it('should show the texts correctly', () => {
    const component = render(renderThemeSettings());
    expect(elements.optionTitles(component)[0].children[0]).toEqual(
      Translations.Tags.SETTINGS_THEME_DARK,
    );
    expect(elements.optionTitles(component)[1].children[0]).toEqual(
      Translations.Tags.SETTINGS_THEME_LIGHT,
    );
    expect(elements.optionTitles(component)[2].children[0]).toEqual(
      Translations.Tags.SETTINGS_THEME_SYSTEM_PREFERENCES,
    );
  });

  describe('Showing the selected-theme indicator', () => {
    it('should only show the "Dark-option" selected when the "themeId" is "dark', () => {
      mockThemeId = Types.ThemeId.DARK;
      const component = render(renderThemeSettings());
      const darkOption = elements.optionButtons(component)[0];
      const lightOption = elements.optionButtons(component)[1];
      const systemPreferencesOption = elements.optionButtons(component)[2];
      expect(
        within(darkOption).queryByTestId('icon-radiobox-marked'),
      ).not.toBeNull();
      expect(
        within(darkOption).queryByTestId('icon-radiobox-blank'),
      ).toBeNull();
      expect(
        within(lightOption).queryByTestId('icon-radiobox-marked'),
      ).toBeNull();
      expect(
        within(lightOption).queryByTestId('icon-radiobox-blank'),
      ).not.toBeNull();
      expect(
        within(systemPreferencesOption).queryByTestId('icon-radiobox-marked'),
      ).toBeNull();
      expect(
        within(systemPreferencesOption).queryByTestId('icon-radiobox-blank'),
      ).not.toBeNull();
    });

    it('should only show the "Light-option" selected when the "themeId" is "dark', () => {
      mockThemeId = Types.ThemeId.LIGHT;
      const component = render(renderThemeSettings());
      const darkOption = elements.optionButtons(component)[0];
      const lightOption = elements.optionButtons(component)[1];
      const systemPreferencesOption = elements.optionButtons(component)[2];
      expect(
        within(darkOption).queryByTestId('icon-radiobox-marked'),
      ).toBeNull();
      expect(
        within(darkOption).queryByTestId('icon-radiobox-blank'),
      ).not.toBeNull();
      expect(
        within(lightOption).queryByTestId('icon-radiobox-marked'),
      ).not.toBeNull();
      expect(
        within(lightOption).queryByTestId('icon-radiobox-blank'),
      ).toBeNull();
      expect(
        within(systemPreferencesOption).queryByTestId('icon-radiobox-marked'),
      ).toBeNull();
      expect(
        within(systemPreferencesOption).queryByTestId('icon-radiobox-blank'),
      ).not.toBeNull();
    });

    it('should only show the "System-preferences-option" selected when the "themeId" is "dark', () => {
      mockThemeId = Types.ThemeId.SYSTEM;
      const component = render(renderThemeSettings());
      const darkOption = elements.optionButtons(component)[0];
      const lightOption = elements.optionButtons(component)[1];
      const systemPreferencesOption = elements.optionButtons(component)[2];
      expect(
        within(darkOption).queryByTestId('icon-radiobox-marked'),
      ).toBeNull();
      expect(
        within(darkOption).queryByTestId('icon-radiobox-blank'),
      ).not.toBeNull();
      expect(
        within(lightOption).queryByTestId('icon-radiobox-marked'),
      ).toBeNull();
      expect(
        within(lightOption).queryByTestId('icon-radiobox-blank'),
      ).not.toBeNull();
      expect(
        within(systemPreferencesOption).queryByTestId('icon-radiobox-marked'),
      ).not.toBeNull();
      expect(
        within(systemPreferencesOption).queryByTestId('icon-radiobox-blank'),
      ).toBeNull();
    });
  });

  describe('Pressing the options', () => {
    describe('When the "theme" selected is the same of the "current-theme"', () => {
      beforeEach(() => {
        mockThemeId = '';
        jest.clearAllMocks();
      });

      it('should call "onSetDarkTheme" when the user presses the "Dark" option', () => {
        const component = render(renderThemeSettings());
        expect(mockOnSetDarkTheme).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[0]);
        expect(mockOnSetDarkTheme).toHaveBeenCalledTimes(1);
      });

      it('should call "onSetLightTheme" when the user presses the "Light" option', () => {
        const component = render(renderThemeSettings());
        expect(mockOSetLightTheme).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[1]);
        expect(mockOSetLightTheme).toHaveBeenCalledTimes(1);
      });

      it('should call "onSetSystemTheme" when the user presses the "System" option', () => {
        const component = render(renderThemeSettings());
        expect(mockOnSetSystemTheme).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[2]);
        expect(mockOnSetSystemTheme).toHaveBeenCalledTimes(1);
      });
    });

    describe('When the "theme" selected is the different of the "current-theme"', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should not call "onSetDarkTheme" when the user presses the "Dark" option and the "curent-option-select" is "Dark"', () => {
        mockThemeId = Types.ThemeId.DARK;
        const component = render(renderThemeSettings());
        expect(mockOnSetDarkTheme).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[0]);
        expect(mockOnSetDarkTheme).toHaveBeenCalledTimes(0);
      });

      it('should not call "onSetLightTheme" when the user presses the "Light" option and the "curent-option-select" is "Light"', () => {
        mockThemeId = Types.ThemeId.LIGHT;
        const component = render(renderThemeSettings());
        expect(mockOSetLightTheme).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[1]);
        expect(mockOSetLightTheme).toHaveBeenCalledTimes(0);
      });

      it('should not call "onSetSystemTheme" when the user presses the "System" option and the "curent-option-select" is "System"', () => {
        mockThemeId = Types.ThemeId.SYSTEM;
        const component = render(renderThemeSettings());
        expect(mockOnSetSystemTheme).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[2]);
        expect(mockOnSetSystemTheme).toHaveBeenCalledTimes(0);
      });
    });
  });
});
