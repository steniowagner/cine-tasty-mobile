import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import MockedNavigation from '../../../../../../__mocks__/MockedNavigator';
import {
  IMAGES_QUALITY_SECTION_TITLE_I18N_REF,
  IMAGES_QUALITY_SECTION_DESCRIPTION_I18N_REF,
  LANGUAGE_SECTION_TITLE_I18N_REF,
  LANGUAGE_SECTION_DESCRIPTION_I18N_REF,
  ABOUT_SECTION_TITLE_I18N_REF,
  ABOUT_SECTION_DESCRIPTION_I18N_REF,
  OPEN_SOURCE_SECTION_TITLE_I18N_REF,
  OPEN_SOURCE_SECTION_DESCRIPTION_I18N_REF,
} from './useSettings';
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

    expect(getByText(IMAGES_QUALITY_SECTION_TITLE_I18N_REF)).not.toBeNull();

    expect(getByText(IMAGES_QUALITY_SECTION_DESCRIPTION_I18N_REF)).not.toBeNull();

    expect(getByText(LANGUAGE_SECTION_TITLE_I18N_REF)).not.toBeNull();

    expect(getByText(LANGUAGE_SECTION_DESCRIPTION_I18N_REF)).not.toBeNull();

    expect(getByText(LANGUAGE_SECTION_DESCRIPTION_I18N_REF)).not.toBeNull();

    expect(getByText(ABOUT_SECTION_TITLE_I18N_REF)).not.toBeNull();

    expect(getByText(ABOUT_SECTION_DESCRIPTION_I18N_REF)).not.toBeNull();

    expect(getByText(OPEN_SOURCE_SECTION_TITLE_I18N_REF)).not.toBeNull();

    expect(getByText(OPEN_SOURCE_SECTION_DESCRIPTION_I18N_REF)).not.toBeNull();
  });

  it('should call "navigate" correctly when press the section', () => {
    const navigate = jest.fn();

    const { getAllByTestId } = render(renderSettings(navigate));

    fireEvent.press(getAllByTestId('settings-section-button')[0]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('IMAGES_QUALITY');

    jest.clearAllMocks();

    fireEvent.press(getAllByTestId('settings-section-button')[1]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('LANGUAGE');

    jest.clearAllMocks();

    fireEvent.press(getAllByTestId('settings-section-button')[2]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('THEME');

    jest.clearAllMocks();

    fireEvent.press(getAllByTestId('settings-section-button')[3]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('ABOUT');

    jest.clearAllMocks();

    fireEvent.press(getAllByTestId('settings-section-button')[4]);

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith('OPEN_SOURCE');
  });
});
