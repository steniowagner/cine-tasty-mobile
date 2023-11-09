import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';
import { Translations } from '@/i18n/tags';

import { BirthDayText } from './BirthDayText';

jest.mock('@hooks', () => ({
  useTranslation: () => ({
    translate: (key: string) => key,
    currentLanguage: 'pt',
  }),
}));

const renderBirthDayText = (birthDate?: string) => (
  <ThemeProvider theme={theme}>
    <BirthDayText rawBirthDate={birthDate} />
  </ThemeProvider>
);

describe('Common-screens/FamousDetails/BirthDatText # pt', () => {
  const elements = {
    deathDayText: (api: RenderAPI) => api.queryByTestId('birthday-text'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When the date is valid', () => {
    it('should render correctly with a valid date', () => {
      const component = render(renderBirthDayText('1994-02-21'));
      expect(elements.deathDayText(component)!.children[0]).toEqual(
        `21 de ${Translations.Miscellaneous.MONTHS}.1 de 1994`,
      );
    });
  });

  describe('When the date is invalid', () => {
    it('should render just an "-"', () => {
      const component = render(renderBirthDayText('1994-21-02'));
      expect(elements.deathDayText(component)!.children[0]).toEqual('-');
    });

    it('should return null when the date is an empty string', () => {
      const component = render(renderBirthDayText(''));
      expect(elements.deathDayText(component)).toBeNull();
    });

    it('should return null when the date is undefined', () => {
      const component = render(renderBirthDayText());
      expect(elements.deathDayText(component)).toBeNull();
    });
  });
});
