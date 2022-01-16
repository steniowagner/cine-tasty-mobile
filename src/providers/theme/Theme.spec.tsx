/* eslint-disable global-require */
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {cleanup, fireEvent, render, act} from '@testing-library/react-native';

import CONSTANTS from '@utils/constants';
import * as Types from '@local-types';

jest.mock('../../utils/async-storage-adapter/storage');

jest.mock('react-native-appearance', () => ({
  useColorScheme: () => 'light',
}));

const storage = require('../../utils/async-storage-adapter/storage');

import {ThemeContextProvider, useThemeProvider} from './Theme';

describe('Testing <ThemeProvider />', () => {
  const renderThemeProvider = (theme?: Types.ThemeId) => {
    const ContextChildren = () => {
      const {onSetSystemTheme, onSetLightTheme, onSetDarkTheme, themeId} =
        useThemeProvider();

      const pressMapping = {
        [Types.ThemeId.SYSTEM]: onSetSystemTheme,
        [Types.ThemeId.LIGHT]: onSetLightTheme,
        [Types.ThemeId.DARK]: onSetDarkTheme,
      };

      return (
        <View>
          <Text testID="themeId">{themeId}</Text>
          <TouchableOpacity
            testID="toggle-button"
            onPress={pressMapping[theme]}
          />
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
    storage.get.mockImplementationOnce(() => undefined);

    const {getByTestId} = render(renderThemeProvider());

    expect(getByTestId('themeId').children[0]).toEqual(undefined);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should return an undefined theme initially when the app has some theme previously set', () => {
    storage.get.mockImplementationOnce(() => Types.ThemeId.DARK);

    const {getByTestId} = render(renderThemeProvider());

    expect(getByTestId('themeId').children[0]).toEqual(undefined);

    act(() => {
      jest.runAllTimers();
    });
  });

  it("should set the dark-theme as default-theme when there's no theme previously set after the initialization", () => {
    storage.get.mockImplementationOnce(() => undefined);

    const {getByTestId} = render(renderThemeProvider(Types.ThemeId.DARK));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(Types.ThemeId.DARK);
  });

  it('should set the dark-theme as default-theme when the theme previously set was the dark-theme', () => {
    storage.get.mockImplementationOnce(() => Types.ThemeId.DARK);

    const {getByTestId} = render(renderThemeProvider(Types.ThemeId.DARK));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(Types.ThemeId.DARK);
  });

  it('should set the light-theme as default-theme when the theme previously set was the light-theme', () => {
    storage.get.mockImplementationOnce(() => Types.ThemeId.LIGHT);

    const {getByTestId} = render(renderThemeProvider(Types.ThemeId.LIGHT));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(Types.ThemeId.LIGHT);
  });

  it('should change the theme from Dark to Light correctly', () => {
    storage.get.mockImplementationOnce(() => Types.ThemeId.DARK);

    const {getByTestId} = render(renderThemeProvider(Types.ThemeId.LIGHT));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(Types.ThemeId.DARK);

    fireEvent.press(getByTestId('toggle-button'));

    expect(storage.set).toHaveBeenCalledTimes(1);

    expect(storage.set).nthCalledWith(
      1,
      CONSTANTS.KEYS.APP_THEME,
      Types.ThemeId.LIGHT,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(Types.ThemeId.LIGHT);
  });

  it('should change the theme from Light to Dark correctly', () => {
    storage.get.mockImplementationOnce(() => Types.ThemeId.LIGHT);

    const {getByTestId} = render(renderThemeProvider(Types.ThemeId.DARK));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(Types.ThemeId.LIGHT);

    fireEvent.press(getByTestId('toggle-button'));

    expect(storage.set).toHaveBeenCalledTimes(1);

    expect(storage.set).nthCalledWith(
      1,
      CONSTANTS.KEYS.APP_THEME,
      Types.ThemeId.DARK,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(Types.ThemeId.DARK);
  });
});
