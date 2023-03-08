import React from 'react';
import {cleanup, render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import {BirthDayText} from './BirthDayText';

const MOCK_T_VALUE = 'Fevereiro';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: () => MOCK_T_VALUE,
    i18n: {
      language: 'ptBR',
    },
  }),
}));

const renderBirthDayText = (birthDate: string) => (
  <ThemeProvider theme={theme}>
    <BirthDayText rawBirthDate={birthDate} />
  </ThemeProvider>
);

describe('<BirthDatText /> - [PTBR]', () => {
  const elements = {
    deathDayText: (api: RenderAPI) => api.queryByTestId('birthday-text'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render correctly with a valid date', () => {
    const component = render(renderBirthDayText('1994-02-21'));
    expect(elements.deathDayText(component).children[0]).toEqual(
      `21 de ${MOCK_T_VALUE.toLowerCase()} de 1994`,
    );
  });

  it('should render just an "-" when the date is invalid', () => {
    const component = render(renderBirthDayText('1994-21-02'));
    expect(elements.deathDayText(component).children[0]).toEqual('-');
  });

  it('should render just an "-" when the date is an empty string', () => {
    const component = render(renderBirthDayText(''));
    expect(elements.deathDayText(component).children[0]).toEqual('-');
  });

  it('should render just an "-" when the date is undefined', () => {
    // @ts-ignore
    const component = render(renderBirthDayText());
    expect(elements.deathDayText(component).children[0]).toEqual('-');
  });
});
