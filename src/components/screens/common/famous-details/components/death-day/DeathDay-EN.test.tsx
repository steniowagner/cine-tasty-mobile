import React from 'react';
import {cleanup, render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import {DeathDay} from './DeathDay';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
    },
  }),
}));

const renderDeathDay = (deathDate: string) => (
  <ThemeProvider theme={theme}>
    <DeathDay day={deathDate} />
  </ThemeProvider>
);

describe('<DeathDay />', () => {
  const elements = {
    deathDayWrapper: (api: RenderAPI) => api.queryByTestId('death-day-wrapper'),
    deathDayText: (api: RenderAPI) => api.queryByTestId('death-day-text'),
  };

  describe('When the "language" selected is "English"', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(cleanup);

    it('should render correctly when the date is valid', () => {
      const component = render(renderDeathDay('1994-02-21'));
      expect(elements.deathDayWrapper(component)).not.toBeNull();
      expect(elements.deathDayText(component).children[0]).toEqual(
        '1994-02-21',
      );
    });

    it('should render a "-" when the date is an empty string', () => {
      const component = render(renderDeathDay(''));
      expect(elements.deathDayWrapper(component)).not.toBeNull();
      expect(elements.deathDayText(component).children[0]).toEqual('-');
    });
  });
});
