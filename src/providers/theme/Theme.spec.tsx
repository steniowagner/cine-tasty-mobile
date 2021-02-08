/* eslint-disable global-require */
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

import CONSTANTS from 'utils/constants';
import { ThemeId } from 'types';

jest.mock('../../utils/async-storage-adapter/AsyncStorageAdapter');

jest.mock('react-native-appearance', () => ({
  useColorScheme: () => 'light',
}));

const {
  getItemFromStorage,
  persistItemInStorage,
} = require('../../utils/async-storage-adapter/AsyncStorageAdapter');

import { ThemeContextProvider, useThemeProvider } from './Theme';

describe('Testing <ThemeProvider />', () => {
  const renderThemeProvider = (theme?: ThemeId) => {
    const ContextChildren = () => {
      const {
        onSetSystemTheme,
        onSetLightTheme,
        onSetDarkTheme,
        themeId,
      } = useThemeProvider();

      const pressMapping = {
        [ThemeId.SYSTEM]: onSetSystemTheme,
        [ThemeId.LIGHT]: onSetLightTheme,
        [ThemeId.DARK]: onSetDarkTheme,
      };

      return (
        <View>
          <Text testID="themeId">{themeId}</Text>
          <TouchableOpacity testID="toggle-button" onPress={pressMapping[theme]} />
        </View>
      );
    };

    return (
      <ThemeContextProvider>
        <ContextChildren />
      </ThemeContextProvider>
    );
  };

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should return an undefined theme initially when the app has no theme previously set', () => {
    getItemFromStorage.mockImplementationOnce(() => undefined);

    const { getByTestId } = render(renderThemeProvider());

    expect(getByTestId('themeId').children[0]).toEqual(undefined);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should return an undefined theme initially when the app has some theme previously set', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.DARK);

    const { getByTestId } = render(renderThemeProvider());

    expect(getByTestId('themeId').children[0]).toEqual(undefined);

    act(() => {
      jest.runAllTimers();
    });
  });

  it("should set the dark-theme as default-theme when there's no theme previously set after the initialization", () => {
    getItemFromStorage.mockImplementationOnce(() => undefined);

    const { getByTestId } = render(renderThemeProvider(ThemeId.DARK));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);
  });

  it('should set the dark-theme as default-theme when the theme previously set was the dark-theme', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.DARK);

    const { getByTestId } = render(renderThemeProvider(ThemeId.DARK));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);
  });

  it('should set the light-theme as default-theme when the theme previously set was the light-theme', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.LIGHT);

    const { getByTestId } = render(renderThemeProvider(ThemeId.LIGHT));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.LIGHT);
  });

  it('should change the theme from Dark to Light correctly', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.DARK);

    const { getByTestId } = render(renderThemeProvider(ThemeId.LIGHT));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);

    fireEvent.press(getByTestId('toggle-button'));

    expect(persistItemInStorage).toHaveBeenCalledTimes(1);

    expect(persistItemInStorage).nthCalledWith(
      1,
      CONSTANTS.KEYS.APP_THEME,
      ThemeId.LIGHT,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.LIGHT);
  });

  it('should change the theme from Light to Dark correctly', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.LIGHT);

    const { getByTestId } = render(renderThemeProvider(ThemeId.DARK));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.LIGHT);

    fireEvent.press(getByTestId('toggle-button'));

    expect(persistItemInStorage).toHaveBeenCalledTimes(1);

    expect(persistItemInStorage).nthCalledWith(1, CONSTANTS.KEYS.APP_THEME, ThemeId.DARK);

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);
  });
});
