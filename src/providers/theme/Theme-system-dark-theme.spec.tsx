/* eslint-disable global-require */
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';

import { ThemeId } from 'types';

jest.mock('../../utils/async-storage-adapter/AsyncStorageAdapter');

jest.mock('react-native-appearance', () => ({
  useColorScheme: () => 'dark',
}));

const {
  getItemFromStorage,
} = require('../../utils/async-storage-adapter/AsyncStorageAdapter');

import { ThemeContextProvider, useThemeProvider } from './Theme';

describe('Testing <ThemeProvider /> [System Dark Theme]', () => {
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
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should change the theme to dark when the theme selected is system-option and the system-color-scheme is dark', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.SYSTEM);

    const { getByTestId } = render(renderThemeProvider(ThemeId.SYSTEM));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);
  });

  it('should change the theme correctly when the user presses the system-option and the current theme is dark and the system-theme is dark', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.LIGHT);

    const { getByTestId } = render(renderThemeProvider(ThemeId.SYSTEM));

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('toggle-button'));

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);
  });

  it('should change the theme correctly when the user presses the system-option and the current theme is light and the system-theme is light', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.LIGHT);

    const { getByTestId } = render(renderThemeProvider(ThemeId.SYSTEM));

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('toggle-button'));

    expect(getByTestId('themeId').children[0]).toEqual(ThemeId.DARK);
  });
});
