import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import DeathDay from './DeathDay';

jest.mock('react-i18next', () => ({
  getI18n: () => ({ language: 'ptPT' }),
}));

const renderBirthDayText = (deathDate: string) => (
  <ThemeProvider theme={dark}>
    <DeathDay deathDate={deathDate} />
  </ThemeProvider>
);

describe('Testing <DeathDay /> [PT-PT]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('it should render correctly with a valid date and the current language is "ptPT"', () => {
    const { getByText } = render(renderBirthDayText('1994-02-21'));

    expect(getByText('21/02/1994')).not.toBeNull();
  });

  it('it should render just an "-" when the date is an empty string and the current language is "ptPT"', () => {
    const { getByText } = render(renderBirthDayText(''));

    expect(getByText('-')).not.toBeNull();
  });
});