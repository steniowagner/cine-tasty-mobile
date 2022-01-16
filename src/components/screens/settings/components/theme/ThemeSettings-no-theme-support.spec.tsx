import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';

import { ThemeContextProvider } from '@providers';
import * as TRANSLATIONS from '@i18n/tags';
import CONSTANTS from '@utils/constants';
import * as Types from '@local-types';

import ThemeSettings from './ThemeSettings';

jest.mock('utils/async-storage-adapter/AsyncStorageAdapter');

const {
  persistItemInStorage,
  getItemFromStorage,
} = require('utils/async-storage-adapter/AsyncStorageAdapter');

jest.mock('utils/async-storage-adapter/AsyncStorageAdapter');

const renderThemeSettings = () => (
  <ThemeContextProvider>
    <ThemeSettings />
  </ThemeContextProvider>
);

describe('Testing <ThemeSettings /> - [No theme support]', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render all items correctly', () => {
    const { getAllByTestId } = render(renderThemeSettings());

    expect(getAllByTestId('option-settings').length).toEqual(2);

    expect(getAllByTestId('option-title')[0].children[0]).toEqual(
      TRANSLATIONS.THEME_DARK,
    );

    expect(getAllByTestId('option-title')[1].children[0]).toEqual(
      TRANSLATIONS.THEME_LIGHT,
    );

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render them dark-theme marked when the theme previsouly selected was the dark-theme', () => {
    getItemFromStorage.mockImplementationOnce(() => Types.ThemeId.DARK);

    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId(/icon/)[0].props.testID).toEqual('icon-radiobox-marked');

    expect(getAllByTestId(/icon/)[1].props.testID).toEqual('icon-radiobox-blank');

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render them light-theme marked when the theme previsouly selected was the light-theme', () => {
    getItemFromStorage.mockImplementationOnce(() => Types.ThemeId.LIGHT);

    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId(/icon/)[0].props.testID).toEqual('icon-radiobox-blank');

    expect(getAllByTestId(/icon/)[1].props.testID).toEqual('icon-radiobox-marked');

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should change theme to dark when the user select the dark-theme-option and the light-theme is currently selected', () => {
    getItemFromStorage.mockImplementationOnce(() => Types.ThemeId.LIGHT);

    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId(/icon/)[0].props.testID).toEqual('icon-radiobox-blank');

    expect(getAllByTestId(/icon/)[1].props.testID).toEqual('icon-radiobox-marked');

    fireEvent.press(getAllByTestId('option-settings')[0]);

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId(/icon/)[0].props.testID).toEqual('icon-radiobox-marked');

    expect(getAllByTestId(/icon/)[1].props.testID).toEqual('icon-radiobox-blank');

    expect(persistItemInStorage).toHaveBeenCalledTimes(1);

    expect(persistItemInStorage).nthCalledWith(
      1,
      CONSTANTS.KEYS.APP_THEME,
      Types.ThemeId.DARK,
    );
  });

  it('should change theme to light when the user select the dark-theme-option and the dark-theme is currently selected', () => {
    getItemFromStorage.mockImplementationOnce(() => Types.ThemeId.DARK);

    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId(/icon/)[0].props.testID).toEqual('icon-radiobox-marked');

    expect(getAllByTestId(/icon/)[1].props.testID).toEqual('icon-radiobox-blank');

    fireEvent.press(getAllByTestId('option-settings')[1]);

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId(/icon/)[0].props.testID).toEqual('icon-radiobox-blank');

    expect(getAllByTestId(/icon/)[1].props.testID).toEqual('icon-radiobox-marked');

    expect(persistItemInStorage).toHaveBeenCalledTimes(1);

    expect(persistItemInStorage).nthCalledWith(
      1,
      CONSTANTS.KEYS.APP_THEME,
      Types.ThemeId.LIGHT,
    );
  });

  it('should not change the theme when the current theme is dark and the user press on the dark-option', () => {
    getItemFromStorage.mockImplementationOnce(() => Types.ThemeId.DARK);

    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getAllByTestId('option-settings')[0]);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should not change the theme when the current theme is light and the user press on the light-option', () => {
    getItemFromStorage.mockImplementationOnce(() => Types.ThemeId.LIGHT);

    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getAllByTestId('option-settings')[1]);

    act(() => {
      jest.runAllTimers();
    });
  });
});
