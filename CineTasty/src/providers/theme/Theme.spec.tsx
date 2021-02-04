/* eslint-disable global-require */
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

import CONSTANTS from 'utils/constants';
import { ThemeId } from 'types';

jest.mock('../../utils/async-storage-adapter/AsyncStorageAdapter');

const {
  getItemFromStorage,
  persistItemInStorage,
} = require('../../utils/async-storage-adapter/AsyncStorageAdapter');

import { ThemeContextProvider, useThemeProvider } from './Theme';

describe('Testing <ThemeProvider />', () => {
  const renderThemeProvider = () => {
    const ContextChildren = () => {
      const { onToggleTheme, themeId } = useThemeProvider();

      return (
        <View>
          <Text testID="themeId">{themeId}</Text>
          <TouchableOpacity testID="toggle-button" onPress={onToggleTheme} />
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
    getItemFromStorage.mockImplementationOnce(() => 'DARK');

    const { getByTestId } = render(renderThemeProvider());

    expect(getByTestId('themeId').children[0]).toEqual(undefined);

    act(() => {
      jest.runAllTimers();
    });
  });

  it("should set the dark-theme as default-theme when there's no theme previously set after the initialization", () => {
    getItemFromStorage.mockImplementationOnce(() => undefined);

    const { getByTestId } = render(renderThemeProvider());

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);
  });

  it('should set the dark-theme as default-theme when the theme previously set was the dark-theme', () => {
    getItemFromStorage.mockImplementationOnce(() => 'DARK');

    const { getByTestId } = render(renderThemeProvider());

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);
  });

  it('should set the light-theme as default-theme when the theme previously set was the light-theme', () => {
    getItemFromStorage.mockImplementationOnce(() => 'LIGHT');

    const { getByTestId } = render(renderThemeProvider());

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.LIGHT);
  });

  it('should toggle the theme when the "onToggleTheme" is called (DARK => LIGHT)', () => {
    getItemFromStorage.mockImplementationOnce(() => 'DARK');

    const { getByTestId } = render(renderThemeProvider());

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);

    fireEvent.press(getByTestId('toggle-button'));

    expect(persistItemInStorage).toHaveBeenCalledTimes(2);

    expect(persistItemInStorage).nthCalledWith(1, CONSTANTS.KEYS.APP_THEME, ThemeId.DARK);

    expect(persistItemInStorage).nthCalledWith(
      2,
      CONSTANTS.KEYS.APP_THEME,
      ThemeId.LIGHT,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.LIGHT);
  });

  it('should toggle the theme when the "onToggleTheme" is called (LIGHT => DARK)', () => {
    getItemFromStorage.mockImplementationOnce(() => 'LIGHT');

    const { getByTestId } = render(renderThemeProvider());

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.LIGHT);

    fireEvent.press(getByTestId('toggle-button'));

    expect(persistItemInStorage).toHaveBeenCalledTimes(2);

    expect(persistItemInStorage).nthCalledWith(
      1,
      CONSTANTS.KEYS.APP_THEME,
      ThemeId.LIGHT,
    );

    expect(persistItemInStorage).nthCalledWith(2, CONSTANTS.KEYS.APP_THEME, ThemeId.DARK);

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);
  });
});
