import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import CONSTANTS from 'utils/constants';
import theme from 'styles/theme';

jest.mock('utils/async-storage-adapter/AsyncStorageAdapter');

const {
  persistItemInStorage,
} = require('utils/async-storage-adapter/AsyncStorageAdapter');

import { LANGUAGES_I18N_REF } from './useLanguages';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      services: {
        resourceStore: {
          data: {
            en: {},
            es: {},
            ptBR: {},
            ptPT: {},
            sv: {},
          },
        },
      },
      language: 'en',
    },
    t: (key: string) => key,
  }),
}));

import Language from './Languages';

const renderLanguageSettings = () => (
  <ThemeProvider theme={theme}>
    <Language />
  </ThemeProvider>
);

describe('Testing <Languages />', () => {
  afterEach(cleanup);

  it('should render all items correctly', () => {
    const { getAllByTestId, getByText } = render(renderLanguageSettings());

    expect(getAllByTestId('option-settings').length).toEqual(5);

    expect(getByText(`${LANGUAGES_I18N_REF}:en`)).not.toBeNull();

    expect(getByText(`${LANGUAGES_I18N_REF}:es`)).not.toBeNull();

    expect(getByText(`${LANGUAGES_I18N_REF}:sv`)).not.toBeNull();

    expect(getByText(`${LANGUAGES_I18N_REF}:ptPT`)).not.toBeNull();

    expect(getByText(`${LANGUAGES_I18N_REF}:ptBR`)).not.toBeNull();
  });

  it('should call "onPress" with the correct params when the user press on the list-item', () => {
    const { getAllByTestId } = render(renderLanguageSettings());
    const languages = ['en', 'es', 'ptBR', 'ptPT', 'sv'];

    for (let i = 0; i < languages.length; i++) {
      fireEvent.press(getAllByTestId('option-settings')[i]);

      expect(persistItemInStorage).toHaveBeenCalledWith(
        CONSTANTS.KEYS.LANGUAGE,
        languages[i],
      );
    }
  });
});
