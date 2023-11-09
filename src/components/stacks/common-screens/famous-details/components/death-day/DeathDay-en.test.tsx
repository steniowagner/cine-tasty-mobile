import React from 'react';

import { dark as theme } from '@styles/themes';

import { DeathDay } from './DeathDay';
import { ThemeProvider } from 'styled-components/native';
import { RenderAPI, render } from '@testing-library/react-native';

jest.mock('@hooks', () => ({
  useTranslation: () => ({
    currentLanguage: 'en',
  }),
}));

const renderDeathDay = (day?: string) => (
  <ThemeProvider theme={theme}>
    <DeathDay day={day} />
  </ThemeProvider>
);

describe('Common-screens/FamousDetails/DeathDay # en', () => {
  const elements = {
    deathDay: (api: RenderAPI) => api.queryByTestId('death-day-text'),
  };

  describe('When "day" is "defined"', () => {
    it('should render correctly', () => {
      const component = render(renderDeathDay('1994-02-21'));
      expect(elements.deathDay(component)!.children[0]).toEqual('1994-02-21');
    });
  });

  describe('When "day" is "undefined"', () => {
    it('should render correctly', () => {
      const component = render(renderDeathDay());
      expect(elements.deathDay(component)).toBeNull();
    });
  });
});
