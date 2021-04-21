import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';
import theme from '@styles/theme';

import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import Settings from './Settings';

const NUMBER_SECTIONS = 5;

const renderSettings = (navigate = jest.fn()) => {
  const SettingsScreen = ({ navigation }) => {
    return (
      <ThemeProvider theme={theme}>
        <Settings navigation={{ ...navigation, navigate }} />
      </ThemeProvider>
    );
  };

  return <MockedNavigation component={SettingsScreen} />;
};

describe('Testing <Settings />', () => {
  afterEach(cleanup);

  it('should show all the sections correctly', () => {
    const { getByTestId, getByText } = render(renderSettings());

    expect(getByTestId('settings-wrapper')).not.toBeNull();

    expect(getByTestId('settings-wrapper').children.length).toEqual(NUMBER_SECTIONS);

    expect(getByText(TRANSLATIONS.SETTINGS_IMAGES_QUALITY_SECTION_TITLE)).not.toBeNull();

    expect(getByText(TRANSLATIONS.SETTINGS_IMAGES_QUALITY_DESCRIPTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.SETTINGS_LANGUAGE_SECTION_TITLE)).not.toBeNull();

    expect(getByText(TRANSLATIONS.SETTINGS_LANGUAGE_DESCRIPTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.SETTINGS_LANGUAGE_DESCRIPTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.SETTINGS_ABOUT_SECTION_TITLE)).not.toBeNull();

    expect(getByText(TRANSLATIONS.SETTINGS_ABOUT_DESCRIPTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.SETTINGS_OPEN_SOURCE_SECTION_TITLE)).not.toBeNull();

    expect(getByText(TRANSLATIONS.SETTINGS_OPEN_SOURCE_DESCRIPTION)).not.toBeNull();
  });

  it('should call "navigate" correctly when press the section', () => {
    const navigate = jest.fn();

    const { getAllByTestId } = render(renderSettings(navigate));

    fireEvent.press(getAllByTestId('settings-section-button')[0]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(Routes.Settings.IMAGES_QUALITY);

    jest.clearAllMocks();

    fireEvent.press(getAllByTestId('settings-section-button')[1]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(Routes.Settings.LANGUAGE);

    jest.clearAllMocks();

    fireEvent.press(getAllByTestId('settings-section-button')[2]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(Routes.Settings.THEME);

    jest.clearAllMocks();

    fireEvent.press(getAllByTestId('settings-section-button')[3]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(Routes.Settings.ABOUT);

    jest.clearAllMocks();

    fireEvent.press(getAllByTestId('settings-section-button')[4]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(Routes.Settings.OPEN_SOURCE);
  });
});
