import React from 'react';
import { cleanup, render, act } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
    },
  }),
}));

// eslint-disable-next-line import/first
import BirthDayText from './BirthDayText';

const renderBirthDayText = (birthDate: string) => (
  <ThemeProvider
    theme={dark}
  >
    <BirthDayText
      rawBirthDate={birthDate}
    />
  </ThemeProvider>
);

describe('Testing <BirthDatText />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('it should return render correctly with a valid date', () => {
    const { getByText } = render(renderBirthDayText('1994-02-21'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByText('February 21, 1994')).not.toBeNull();
  });

  it('it should return render correctly with a valid date', () => {
    const { getByText } = render(renderBirthDayText('1994-02-28'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByText('February 28, 1994')).not.toBeNull();
  });

  it('it should return render correctly with a valid date', () => {
    const { getByText } = render(renderBirthDayText('2020-08-29'));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByText('August 29, 2020')).not.toBeNull();
  });

  it('it should render just an "-" when the date is invalid', () => {
    const { getByText } = render(renderBirthDayText('1994-21-02'));

    expect(getByText('-')).not.toBeNull();
  });

  it('it should render just an "-" when the date is an empty string', () => {
    const { getByText } = render(renderBirthDayText(''));

    expect(getByText('-')).not.toBeNull();
  });
});
