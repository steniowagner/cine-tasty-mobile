import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import {dark, light} from '@styles/themes';
import * as Types from '@local-types';

import {ThemeContextProvider, useThemeProvider} from './Theme';

jest.mock('@utils', () => jest.requireActual('@utils'));

const utils = require('@utils');

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
  };

  describe('In the first run', () => {
    it('should select the "undefined-theme" before to read the theme from storage', async () => {
      const component = render(renderThemeProvider());
      expect(elements.themeId(component).children[0]).toBeUndefined();
      expect(elements.theme(component).children[0]).toEqual(
        JSON.stringify({...dark, id: undefined}),
      );
      await waitFor(() => {});
    });
  });

  describe('When there is no previous preferences', () => {
    it('should select the "dark-theme" ', async () => {
      utils.storage.get = jest.fn().mockResolvedValue(undefined);
      const component = render(renderThemeProvider());
      await waitFor(() => {});
      expect(elements.themeId(component).children[0]).toEqual(
        Types.ThemeId.DARK,
      );
      expect(elements.theme(component).children[0]).toEqual(
        JSON.stringify(dark),
      );
    });
  });

  describe('When there is some previous prefrence', () => {
    describe('When the past prefernce was "Dark"', () => {
      it('should select the "dark-theme" ', async () => {
        utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.DARK);
        const component = render(renderThemeProvider());
        await waitFor(() => {});
        expect(elements.themeId(component).children[0]).toEqual(
          Types.ThemeId.DARK,
        );
        expect(elements.theme(component).children[0]).toEqual(
          JSON.stringify(dark),
        );
      });
    });

    describe('When the past prefernce was "Light"', () => {
      it('should select the "dark-theme" ', async () => {
        utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.LIGHT);
        const component = render(renderThemeProvider());
        await waitFor(() => {});
        expect(elements.themeId(component).children[0]).toEqual(
          Types.ThemeId.LIGHT,
        );
        expect(elements.theme(component).children[0]).toEqual(
          JSON.stringify(light),
        );
      });
    });
  });

  describe('Selecting the themes', () => {
    describe('Selecting the "Dark" theme', () => {
      describe('Changing from  "Dark" to "Dark"', () => {
        it('should not change the theme if the current theme is "Dark" and the user changes to the "Dark"', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.DARK);
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.DARK,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(dark),
          );
          fireEvent.press(elements.setDarkThemeButton(component));
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.DARK,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(dark),
          );
        });

        it('should not call "storage.set"', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.DARK);
          utils.storage.set = jest.fn();
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.setDarkThemeButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
        });
      });

      describe('Changing from "Light" to "Dark"', () => {
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
          fireEvent.press(elements.setDarkThemeButton(component));
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.DARK,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(dark),
          );
        });

        it('should call "storage.set" correctly', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.LIGHT);
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

    describe('Selecting the "Light" theme', () => {
      describe('Changing from  "Light" to "Light"', () => {
        it('should not change the theme if the current theme is "Light" and the user changes to the "Light"', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.LIGHT);
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.LIGHT,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(light),
          );
          fireEvent.press(elements.setLightThemeButton(component));
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.LIGHT,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(light),
          );
        });

        it('should not call "storage.set"', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.LIGHT);
          utils.storage.set = jest.fn();
          const component = render(renderThemeProvider());
          await waitFor(() => {});
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.setLightThemeButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
        });
      });

      describe('Changing from "Dark" to "Light"', () => {
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
          fireEvent.press(elements.setLightThemeButton(component));
          expect(elements.themeId(component).children[0]).toEqual(
            Types.ThemeId.LIGHT,
          );
          expect(elements.theme(component).children[0]).toEqual(
            JSON.stringify(light),
          );
        });

        it('should call "storage.set" correctly', async () => {
          utils.storage.get = jest.fn().mockResolvedValue(Types.ThemeId.DARK);
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
    });
  });
});
