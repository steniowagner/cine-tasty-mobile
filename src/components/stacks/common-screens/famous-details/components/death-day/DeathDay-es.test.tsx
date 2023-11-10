import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { RenderAPI, render } from '@testing-library/react-native';

import { dark as theme } from '@styles/themes';

import { DeathDay } from './DeathDay';

jest.mock('@hooks', () => ({
  useTranslation: () => ({
    currentLanguage: 'es',
  }),
}));

const renderDeathDay = (day: string) => (
  <ThemeProvider theme={theme}>
    <DeathDay day={day} />
  </ThemeProvider>
);

describe('Common-screens/FamousDetails/DeathDay # es', () => {
  const elements = {
    deathDay: (api: RenderAPI) => api.queryByTestId('death-day-text'),
  };

  describe('When "day" is "valid"', () => {
    it('should render correctly', () => {
      const component = render(renderDeathDay('1994-02-21'));
      expect(elements.deathDay(component)!.children[0]).toEqual('21/02/1994');
    });
  });

  describe('When "day" is "invalid"', () => {
    it('should render correctly', () => {
      const component = render(renderDeathDay('20/21/122'));
      expect(elements.deathDay(component)).toBeNull();
    });
  });
});
