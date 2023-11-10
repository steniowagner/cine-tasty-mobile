import React from 'react';

import { dark as theme } from '@styles/themes';

import { DeathDay } from './DeathDay';
import { ThemeProvider } from 'styled-components/native';
import { RenderAPI, render } from '@testing-library/react-native';

jest.mock('@hooks', () => ({
  useTranslation: () => ({
    currentLanguage: 'pt',
  }),
}));

const renderDeathDay = (day: string) => (
  <ThemeProvider theme={theme}>
    <DeathDay day={day} />
  </ThemeProvider>
);

describe('Common-screens/FamousDetails/DeathDay # pt', () => {
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
      const component = render(renderDeathDay('20,21,22'));
      expect(elements.deathDay(component)).toBeNull();
    });
  });
});
