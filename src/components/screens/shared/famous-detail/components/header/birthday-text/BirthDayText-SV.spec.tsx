import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import { ThemeContextProvider } from '@providers';

import BirthDayText from './BirthDayText';

const MOCK_T_VALUE = 'Februari';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: () => MOCK_T_VALUE,
    i18n: {
      language: 'sv',
    },
  }),
}));

const renderBirthDayText = (birthDate: string) => (
  <ThemeContextProvider>
    <BirthDayText rawBirthDate={birthDate} />
  </ThemeContextProvider>
);

describe('Testing <BirthDatText /> [SV]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('it should return render correctly with a valid date and the current language is "sv"', () => {
    const { getByText } = render(renderBirthDayText('1994-02-21'));

    expect(getByText(`21 ${MOCK_T_VALUE.toLowerCase()} 1994`)).not.toBeNull();
  });

  it('it should render just an "-" when the date is invalid and the current language is "sv"', () => {
    const { getByText } = render(renderBirthDayText('1994-21-02'));

    expect(getByText('-')).not.toBeNull();
  });

  it('it should render just an "-" when the date is an empty string and the current language is "sv"', () => {
    const { getByText } = render(renderBirthDayText(''));

    expect(getByText('-')).not.toBeNull();
  });
});
