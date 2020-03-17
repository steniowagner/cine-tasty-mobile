import React from 'react';
import { render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { dark } from '../../../../../../styles/themes';
import DateDiff from './DateDiff';

type I18NextProps = {
  value: number;
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, { value }: I18NextProps) => {
      // eslint-disable-next-line no-unused-vars
      const [_, __, keySelected] = key.split(':');

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

describe('Testing <DateDiff />', () => {
  it('shoud render correctly when the dates diff by years', () => {
    const { getByText } = render(
      <ThemeProvider
        theme={dark}
      >
        <DateDiff
          now={new Date('2019-04-20T20:33:37Z')}
          date="2017-03-13T19:33:37Z"
        />
      </ThemeProvider>,
    );

    expect(getByText('2yr ago')).not.toBeNull();
  });

  it('shoud render correctly when the dates diff by months', () => {
    const { getByText } = render(
      <ThemeProvider
        theme={dark}
      >
        <DateDiff
          now={new Date('2019-04-20T20:33:37Z')}
          date="2019-03-13T19:33:37Z"
        />
      </ThemeProvider>,
    );

    expect(getByText('1mth ago')).not.toBeNull();
  });

  it('shoud render correctly when the dates diff by days', () => {
    const { getByText } = render(
      <ThemeProvider
        theme={dark}
      >
        <DateDiff
          now={new Date('2019-03-20T20:33:37Z')}
          date="2019-03-13T19:33:37Z"
        />
      </ThemeProvider>,
    );

    expect(getByText('7d ago')).not.toBeNull();
  });

  it('shoud render correctly when the dates diff by hours', () => {
    const { getByText } = render(
      <ThemeProvider
        theme={dark}
      >
        <DateDiff
          now={new Date('2019-03-13T20:33:37Z')}
          date="2019-03-13T19:33:37Z"
        />
      </ThemeProvider>,
    );

    expect(getByText('1h ago')).not.toBeNull();
  });

  it('shoud render correctly when the dates diff by minutes', () => {
    const { getByText } = render(
      <ThemeProvider
        theme={dark}
      >
        <DateDiff
          now={new Date('2019-03-13T19:55:00Z')}
          date="2019-03-13T19:33:37Z"
        />
      </ThemeProvider>,
    );

    expect(getByText('21min ago')).not.toBeNull();
  });

  it('shoud render correctly when the dates diff by seconds', () => {
    const { getByText } = render(
      <ThemeProvider
        theme={dark}
      >
        <DateDiff
          now={new Date('2019-03-13T19:55:37Z')}
          date="2019-03-13T19:55:30Z"
        />
      </ThemeProvider>,
    );

    expect(getByText('7s ago')).not.toBeNull();
  });
});
