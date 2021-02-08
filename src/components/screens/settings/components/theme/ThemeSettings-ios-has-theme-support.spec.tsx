import React from 'react';
import { cleanup, render, act } from '@testing-library/react-native';

jest.mock('utils/async-storage-adapter/AsyncStorageAdapter');

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');

  return {
    Platform: {
      OS: 'ios',
      Version: '13',
    },
    Dimensions: {
      get: () => ({ width: 100, height: 100 }),
    },
    PixelRatio: {
      roundToNearestPixel: () => 1,
    },
    TouchableOpacity: View,
    Text: View,
    View,
  };
});

import { ThemeContextProvider } from 'providers';

import { DARK_I18N_REF, LIGHT_I18N_REF, SYSTEM_I18N_REF } from './useGetThemeOptions';
import ThemeSettings from './ThemeSettings';

const renderThemeSettings = () => (
  <ThemeContextProvider>
    <ThemeSettings />
  </ThemeContextProvider>
);

describe('Testing <ThemeSettings /> [iOS - With theme-support]', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render all items correctly when the device has support for system-theme', () => {
    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId('option-settings').length).toEqual(3);

    expect(getAllByTestId('option-title')[0].children[0]).toEqual(DARK_I18N_REF);

    expect(getAllByTestId('option-title')[1].children[0]).toEqual(LIGHT_I18N_REF);

    expect(getAllByTestId('option-title')[2].children[0]).toEqual(SYSTEM_I18N_REF);

    act(() => {
      jest.runAllTimers();
    });
  });
});
