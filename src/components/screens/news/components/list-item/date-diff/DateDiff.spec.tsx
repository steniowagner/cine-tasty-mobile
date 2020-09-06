import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import DateDiff from './DateDiff';

type I18NextProps = {
  value: number;
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, { value }: I18NextProps) => {
      const [, , keySelected] = key.split(':');

      switch (keySelected) {
        case 'year':
          return `${value}yr ago`;

        case 'month':
          return `${value}mth ago`;

        case 'day':
          return `${value}d ago`;

        case 'hour':
          return `${value}h ago`;

        case 'minute':
          return `${value}min ago`;

        case 'second':
          return `${value}s ago`;

        default:
          return '';
      }
    },
  }),
}));

const renderDateDiff = (now: Date, date: string) => (
  <ThemeProvider theme={dark}>
    <DateDiff date={date} now={now} />
  </ThemeProvider>
);

describe('Testing <DateDiff />', () => {
  it('shoud render correctly when the dates diff by years', () => {
    const { getByText } = render(
      renderDateDiff(new Date('2019-04-20T20:33:37Z'), '2017-03-13T19:33:37Z'),
    );

    expect(getByText('2yr ago')).not.toBeNull();
  });

  it('shoud render correctly when the dates diff by months', () => {
    const { getByText } = render(
      renderDateDiff(new Date('2019-04-20T20:33:37Z'), '2019-03-13T19:33:37Z'),
    );

    expect(getByText('1mth ago')).not.toBeNull();
  });

  it('shoud render correctly when the dates diff by days', () => {
    const { getByText } = render(
      renderDateDiff(new Date('2019-03-20T20:33:37Z'), '2019-03-13T19:33:37Z'),
    );

    expect(getByText('7d ago')).not.toBeNull();
  });

  it('shoud render correctly when the dates diff by hours', () => {
    const { getByText } = render(
      renderDateDiff(new Date('2019-03-13T20:33:37Z'), '2019-03-13T19:33:37Z'),
    );

    expect(getByText('1h ago')).not.toBeNull();
  });

  it('shoud render correctly when the dates diff by minutes', () => {
    const { getByText } = render(
      renderDateDiff(new Date('2019-03-13T19:55:00Z'), '2019-03-13T19:33:37Z'),
    );

    expect(getByText('21min ago')).not.toBeNull();
  });

  it('shoud render correctly when the dates diff by seconds', () => {
    const { getByText } = render(
      renderDateDiff(new Date('2019-03-13T19:55:37Z'), '2019-03-13T19:55:30Z'),
    );

    expect(getByText('7s ago')).not.toBeNull();
  });
});
