import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import {dark, light} from '@styles/themes';
import * as Types from '@local-types';

import {ThemeContextProvider, useThemeProvider} from './Theme';

jest.mock('@utils', () => jest.requireActual('@utils'));

const utils = require('@utils');

const systemTheme = {...dark, id: Types.ThemeId.SYSTEM};

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Platform: {
      OS: 'android',
      Version: 28,
    },
    Dimensions: {
      get: () => ({width: 100, height: 100}),
    },
    useColorScheme: () => 'dark',
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

const renderThemeProvider = () => {
  const ChildrenComponent = () => {
    const themeProvider = useThemeProvider();
    return (
      <>
        <Text testID="theme-id-text">{themeProvider.themeId}</Text>
        <Text testID="theme-text">{JSON.stringify(themeProvider.theme)}</Text>
        <TouchableOpacity
          testID="set-light-theme-button"
          onPress={themeProvider.onSetLightTheme}
        />
        <TouchableOpacity
          testID="set-dark-theme-button"
          onPress={themeProvider.onSetDarkTheme}
        />
        <TouchableOpacity
          testID="set-system-theme-button"
          onPress={themeProvider.onSetSystemTheme}
        />
      </>
    );
  };
  return (
    <ThemeContextProvider>
      <ChildrenComponent />
    </ThemeContextProvider>
  );
};

describe('<ThemeProvider />', () => {
  const elements = {
    themeId: (api: RenderAPI) => api.queryByTestId('theme-id-text'),
    theme: (api: RenderAPI) => api.queryByTestId('theme-text'),
    setLightThemeButton: (api: RenderAPI) =>
      api.queryByTestId('set-light-theme-button'),
    setDarkThemeButton: (api: RenderAPI) =>
      api.queryByTestId('set-dark-theme-button'),
    setSystemThemeButton: (api: RenderAPI) =>
      api.queryByTestId('set-system-theme-button'),
  };

  describe('When there is some previous prefrence', () => {
    describe('When the past prefernce was "System"', () => {
      it('should select the "dark-theme" + "system-theme" ', async () => {
        utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.SYSTEM);
        const component = render(renderThemeProvider());
        await waitFor(() => {});
        expect(elements.themeId(component).children[0]).toEqual(
          Types.ThemeId.SYSTEM,
        );
        expect(elements.theme(component).children[0]).toEqual(
          JSON.stringify(systemTheme),
        );
      });
    });
  });

  describe('Selecting the themes', () => {
    describe('Selecting the "System" theme', () => {
      describe('Changing from  "System" to "System"', () => {
        it('should not change the theme if the current theme is "System" and the user changes to the "System"', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.SYSTEM);
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.SYSTEM,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(systemTheme),
          );
          fireEvent.press(elements.setSystemThemeButton(component));
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.SYSTEM,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(systemTheme),
          );
        });

        it('should not call "storage.set"', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.SYSTEM);
          utils.storage.set = jest.fn();
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.setSystemThemeButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
        });
      });

      describe('Changing from "Light" to "System"', () => {
        it('should show the theme correctly', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.LIGHT);
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.LIGHT,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(light),
          );
          fireEvent.press(elements.setSystemThemeButton(component));
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.SYSTEM,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(systemTheme),
          );
        });

        it('should call "storage.set" correctly', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.LIGHT);
          utils.storage.set = jest.fn();
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.setSystemThemeButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(1);
          expect(utils.storage.set).toBeCalledWith(
            utils.CONSTANTS.KEYS.APP_THEME,
            Types.ThemeId.SYSTEM,
          );
        });
      });

      describe('Changing from "Dark" to "System"', () => {
        it('should show the theme correctly', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.DARK);
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.DARK,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(dark),
          );
          fireEvent.press(elements.setSystemThemeButton(component));
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.SYSTEM,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(systemTheme),
          );
        });

        it('should call "storage.set" correctly', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.LIGHT);
          utils.storage.set = jest.fn();
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.setSystemThemeButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(1);
          expect(utils.storage.set).toBeCalledWith(
            utils.CONSTANTS.KEYS.APP_THEME,
            Types.ThemeId.SYSTEM,
          );
        });
      });
    });

    describe('Selecting the other themes from "System"', () => {
      describe('Changing from "System" to "Light"', () => {
        it('should show the theme correctly', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.SYSTEM);
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.SYSTEM,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(systemTheme),
          );
          fireEvent.press(elements.setLightThemeButton(component));
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.LIGHT,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(light),
          );
        });

        it('should call "storage.set" correctly', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.SYSTEM);
          utils.storage.set = jest.fn();
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.setLightThemeButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(1);
          expect(utils.storage.set).toBeCalledWith(
            utils.CONSTANTS.KEYS.APP_THEME,
            Types.ThemeId.LIGHT,
          );
        });
      });

      describe('Changing from "System" to "Dark"', () => {
        it('should show the theme correctly', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.SYSTEM);
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.SYSTEM,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(systemTheme),
          );
          fireEvent.press(elements.setDarkThemeButton(component));
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.DARK,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(dark),
          );
        });

        it('should call "storage.set" correctly', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.SYSTEM);
          utils.storage.set = jest.fn();
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.setDarkThemeButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(1);
          expect(utils.storage.set).toBeCalledWith(
            utils.CONSTANTS.KEYS.APP_THEME,
            Types.ThemeId.DARK,
          );
        });
      });
    });
  });
});
