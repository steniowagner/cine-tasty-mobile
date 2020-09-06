import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import BirthDayText from './BirthDayText';

const MOCK_T_VALUE = 'Febrero';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: () => MOCK_T_VALUE,
    i18n: {
      language: 'es',
    },
  }),
}));

const renderBirthDayText = (birthDate: string) => (
  <ThemeProvider theme={dark}>
    <BirthDayText rawBirthDate={birthDate} />
  </ThemeProvider>
);

describe('Testing <BirthDatText /> [ES]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('it should return render correctly with a valid date and the current language is "es"', () => {
    const { getByText } = render(renderBirthDayText('1994-02-21'));

    expect(getByText(`21 de ${MOCK_T_VALUE.toLowerCase()} de 1994`)).not.toBeNull();
  });

  it('it should render just an "-" when the date is invalid and the current language is "es"', () => {
    const { getByText } = render(renderBirthDayText('1994-21-02'));

    expect(getByText('-')).not.toBeNull();
  });

  it('it should render just an "-" when the date is an empty string and the current language is "es"', () => {
    const { getByText } = render(renderBirthDayText(''));

    expect(getByText('-')).not.toBeNull();
  });
});
