import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import * as TRANSLATIONS from '@i18n/tags';
import CONSTANTS from '@utils/constants';
import theme from '@styles/theme';

jest.mock('utils/async-storage-adapter/AsyncStorageAdapter');

jest.mock('react-native-restart', () => ({
  Restart: () => {},
}));

const {
  persistItemInStorage,
} = require('utils/async-storage-adapter/AsyncStorageAdapter');

import { qualities } from './useImagesQuality';
import ImagesQuality from './ImagesQuality';

const renderImagesQualitySettings = () => (
  <ThemeProvider theme={theme}>
    <ImagesQuality />
  </ThemeProvider>
);

describe('Testing <ImagesQuality />', () => {
  afterEach(cleanup);

  it('should render all items correctly', () => {
    const { getAllByTestId, getByText } = render(renderImagesQualitySettings());

    expect(getAllByTestId('option-settings').length).toEqual(4);

    expect(getByText(`${TRANSLATIONS.IMAGE_QUALITIES}:${qualities[0]}`)).not.toBeNull();

    expect(getByText(`${TRANSLATIONS.IMAGE_QUALITIES}:${qualities[1]}`)).not.toBeNull();

    expect(getByText(`${TRANSLATIONS.IMAGE_QUALITIES}:${qualities[2]}`)).not.toBeNull();

    expect(getByText(`${TRANSLATIONS.IMAGE_QUALITIES}:${qualities[3]}`)).not.toBeNull();
  });

  it('should call "onPress" with the correct params when the user press on the list-item', () => {
    const { getAllByTestId } = render(renderImagesQualitySettings());

    for (let i = 0; i < qualities.length; i++) {
      fireEvent.press(getAllByTestId('option-settings')[i]);

      expect(persistItemInStorage).toHaveBeenCalledWith(
        CONSTANTS.KEYS.IMAGES_QUALITY,
        qualities[i],
      );
    }
  });
});
