import React from 'react';
import {cleanup, render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import DeathDay from './DeathDay';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'ptPT',
    },
  }),
}));

const renderBirthDayText = (deathDate: string) => (
  <ThemeProvider theme={theme}>
    <DeathDay deathDate={deathDate} />
  </ThemeProvider>
);

describe('<DeathDay /> - [PTPT]', () => {
  const elements = {
    deathDayWrapper: (api: RenderAPI) => api.queryByTestId('death-day-wrapper'),
    deathDayText: (api: RenderAPI) => api.queryByTestId('death-day-text'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render correctly with a valid date when the current language is "en"', () => {
    const component = render(renderBirthDayText('1994-02-21'));
    expect(elements.deathDayWrapper(component)).not.toBeNull();
    expect(elements.deathDayText(component).children[0]).toEqual('21/02/1994');
  });

  it('should render a "-" when the date is an empty string and the current language is "en"', () => {
    const component = render(renderBirthDayText(''));
    expect(elements.deathDayWrapper(component)).not.toBeNull();
    expect(elements.deathDayText(component).children[0]).toEqual('-');
  });
});
