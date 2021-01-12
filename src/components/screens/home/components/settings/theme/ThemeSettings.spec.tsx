import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';

import CONSTANTS from 'utils/constants';
import { ThemeId } from 'types';

jest.mock('utils/async-storage-adapter/AsyncStorageAdapter');

const {
  persistItemInStorage,
  getItemFromStorage,
} = require('utils/async-storage-adapter/AsyncStorageAdapter');

import { ThemeContextProvider } from 'providers';

import { UNMARKED_OPTION_ICON, MARKED_OPTION_ICON } from '../OptionSetting';
import { DARK_I18N_REF, LIGHT_I18N_REF } from './useThemeSettings';
import ThemeSettings from './ThemeSettings';

const renderThemeSettings = () => (
  <ThemeContextProvider>
    <ThemeSettings />
  </ThemeContextProvider>
);

describe('Testing <ThemeSettings />', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render all items correctly', () => {
    const { getAllByTestId } = render(renderThemeSettings());

    expect(getAllByTestId('option-settings').length).toEqual(2);

    expect(getAllByTestId('option-title')[0].children[0]).toEqual(DARK_I18N_REF);

    expect(getAllByTestId('option-title')[1].children[0]).toEqual(LIGHT_I18N_REF);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render them dark-theme marked when the theme previsouly selected was the dark-theme', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.DARK);

    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId('icon')[0].props.name).toEqual(MARKED_OPTION_ICON);

    expect(getAllByTestId('icon')[1].props.name).toEqual(UNMARKED_OPTION_ICON);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render them light-theme marked when the theme previsouly selected was the light-theme', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.LIGHT);

    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId('icon')[0].props.name).toEqual(UNMARKED_OPTION_ICON);

    expect(getAllByTestId('icon')[1].props.name).toEqual(MARKED_OPTION_ICON);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should change theme to dark when the user select the dark-theme-option and the light-theme is currently selected', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.LIGHT);

    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId('icon')[0].props.name).toEqual(UNMARKED_OPTION_ICON);

    expect(getAllByTestId('icon')[1].props.name).toEqual(MARKED_OPTION_ICON);

    fireEvent.press(getAllByTestId('option-settings')[0]);

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId('icon')[0].props.name).toEqual(MARKED_OPTION_ICON);

    expect(getAllByTestId('icon')[1].props.name).toEqual(UNMARKED_OPTION_ICON);

    expect(persistItemInStorage).toHaveBeenCalledTimes(2);

    expect(persistItemInStorage).nthCalledWith(2, CONSTANTS.KEYS.APP_THEME, ThemeId.DARK);
  });

  it('should change theme to light when the user select the dark-theme-option and the dark-theme is currently selected', () => {
    getItemFromStorage.mockImplementationOnce(() => ThemeId.DARK);

    const { getAllByTestId } = render(renderThemeSettings());

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId('icon')[0].props.name).toEqual(MARKED_OPTION_ICON);

    expect(getAllByTestId('icon')[1].props.name).toEqual(UNMARKED_OPTION_ICON);

    fireEvent.press(getAllByTestId('option-settings')[1]);

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId('icon')[0].props.name).toEqual(UNMARKED_OPTION_ICON);

    expect(getAllByTestId('icon')[1].props.name).toEqual(MARKED_OPTION_ICON);

    expect(persistItemInStorage).toHaveBeenCalledTimes(2);

    expect(persistItemInStorage).nthCalledWith(
      2,
      CONSTANTS.KEYS.APP_THEME,
      ThemeId.LIGHT,
    );
  });
});
