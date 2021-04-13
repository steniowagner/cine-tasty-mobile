import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from '@styles/theme';

import DeathDay from './DeathDay';

jest.mock('react-i18next', () => ({
  getI18n: () => ({ language: 'sv' }),
}));

const renderBirthDayText = (deathDate: string) => (
  <ThemeProvider theme={theme}>
    <DeathDay deathDate={deathDate} />
  </ThemeProvider>
);

describe('Testing <DeathDay /> [SV]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('it should render correctly with a valid date and the current language is "sv"', () => {
    const { getByText } = render(renderBirthDayText('1994-02-21'));

    expect(getByText('1994-02-21')).not.toBeNull();
  });

  it('it should render just an "-" when the date is an empty string and the current language is "sv"', () => {
    const { getByText } = render(renderBirthDayText(''));

    expect(getByText('-')).not.toBeNull();
  });
});
