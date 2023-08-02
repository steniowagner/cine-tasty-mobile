import React from 'react';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';
import RNRestart from 'react-native-restart';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';
import {storage, CONSTANTS} from '@utils';

import {Languages} from './Languages';

const mockLanguages = ['en', 'pt', 'es'];
let mockLanguage = '';

const mockRestart = jest.fn().mockImplementation();
jest.mock('react-native-restart');

// @ts-ignore
RNRestart.Restart = mockRestart;

jest.mock('@hooks', () => ({
  useTranslations: () => ({
    translate: (key: string) => key,
    languages: mockLanguages,
    language: mockLanguage,
  }),
}));

jest.mock('@utils', () => {
  const utilsModule = jest.requireActual('@utils');
  return {
    ...utilsModule,
    storage: {
      set: jest.fn().mockResolvedValue(''),
    },
  };
});

const renderLanguageSettings = () => (
  <ThemeProvider theme={theme}>
    <Languages />
  </ThemeProvider>
);

describe('<Languages />', () => {
  const elements = {
    optionButtons: (api: RenderAPI) => api.queryAllByTestId('option-settings'),
    optionTitles: (api: RenderAPI) => api.queryAllByTestId('option-title'),
  };

  describe('Rendering the options', () => {
    it('should render the labels correctly', () => {
      const component = render(renderLanguageSettings());
      expect(elements.optionTitles(component)[0].children[0]).toEqual(
        `${Translations.Tags.SETTINGS_LANGUAGES}:${mockLanguages[0]}`,
      );
      expect(elements.optionTitles(component)[1].children[0]).toEqual(
        `${Translations.Tags.SETTINGS_LANGUAGES}:${mockLanguages[1]}`,
      );
      expect(elements.optionTitles(component)[2].children[0]).toEqual(
        `${Translations.Tags.SETTINGS_LANGUAGES}:${mockLanguages[2]}`,
      );
    });

    describe('should render the selected language correctly', () => {
      describe(`When "${mockLanguages[0]}" is the language selected`, () => {
        it('should render correctly', () => {
          mockLanguage = mockLanguages[0];
          const component = render(renderLanguageSettings());
          const englishOption = elements.optionButtons(component)[0];
          const portugueseOption = elements.optionButtons(component)[1];
          const spanishOption = elements.optionButtons(component)[2];
          expect(
            within(englishOption).queryByTestId('icon-radiobox-marked'),
          ).not.toBeNull();
          expect(
            within(englishOption).queryByTestId('icon-radiobox-blank'),
          ).toBeNull();
          expect(
            within(portugueseOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(portugueseOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(spanishOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(spanishOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
        });
      });

      describe(`When "${mockLanguages[1]}" is the language selected`, () => {
        it('should render correctly', () => {
          mockLanguage = mockLanguages[1];
          const component = render(renderLanguageSettings());
          const englishOption = elements.optionButtons(component)[0];
          const portugueseOption = elements.optionButtons(component)[1];
          const spanishOption = elements.optionButtons(component)[2];
          expect(
            within(englishOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(englishOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(portugueseOption).queryByTestId('icon-radiobox-marked'),
          ).not.toBeNull();
          expect(
            within(portugueseOption).queryByTestId('icon-radiobox-blank'),
          ).toBeNull();
          expect(
            within(spanishOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(spanishOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
        });
      });

      describe(`When "${mockLanguages[2]}" is the language selected`, () => {
        it('should render correctly', () => {
          mockLanguage = mockLanguages[2];
          const component = render(renderLanguageSettings());
          const englishOption = elements.optionButtons(component)[0];
          const portugueseOption = elements.optionButtons(component)[1];
          const spanishOption = elements.optionButtons(component)[2];
          expect(
            within(englishOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(englishOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(portugueseOption).queryByTestId('icon-radiobox-marked'),
          ).toBeNull();
          expect(
            within(portugueseOption).queryByTestId('icon-radiobox-blank'),
          ).not.toBeNull();
          expect(
            within(spanishOption).queryByTestId('icon-radiobox-marked'),
          ).not.toBeNull();
          expect(
            within(spanishOption).queryByTestId('icon-radiobox-blank'),
          ).toBeNull();
        });
      });
    });
  });

  describe('Pressing the options', () => {
    describe('When pressing "English"', () => {
      const indexOptionSelected = 0;

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "storage.set" correctly', () => {
        const component = render(renderLanguageSettings());
        expect(storage.set).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(storage.set).toHaveBeenCalledTimes(1);
        expect(storage.set).toHaveBeenCalledWith(
          CONSTANTS.KEYS.LANGUAGE,
          mockLanguages[indexOptionSelected],
        );
      });

      it('should call "RNRestart.Restart" correctly', async () => {
        const component = render(renderLanguageSettings());
        expect(mockRestart).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        await waitFor(() => {
          expect(mockRestart).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('When pressing "Portuguese"', () => {
      const indexOptionSelected = 1;

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "storage.set" correctly', () => {
        const component = render(renderLanguageSettings());
        expect(storage.set).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(storage.set).toHaveBeenCalledTimes(1);
        expect(storage.set).toHaveBeenCalledWith(
          CONSTANTS.KEYS.LANGUAGE,
          mockLanguages[indexOptionSelected],
        );
      });

      it('should call "RNRestart.Restart" correctly', async () => {
        const component = render(renderLanguageSettings());
        expect(mockRestart).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        await waitFor(() => {
          expect(mockRestart).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('When pressing "Spanish"', () => {
      const indexOptionSelected = 2;

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "storage.set" correctly', () => {
        const component = render(renderLanguageSettings());
        expect(storage.set).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        expect(storage.set).toHaveBeenCalledTimes(1);
        expect(storage.set).toHaveBeenCalledWith(
          CONSTANTS.KEYS.LANGUAGE,
          mockLanguages[indexOptionSelected],
        );
      });

      it('should call "RNRestart.Restart" correctly', async () => {
        const component = render(renderLanguageSettings());
        expect(mockRestart).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.optionButtons(component)[indexOptionSelected]);
        await waitFor(() => {
          expect(mockRestart).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
