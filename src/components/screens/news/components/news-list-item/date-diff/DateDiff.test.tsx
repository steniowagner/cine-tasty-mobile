import React from 'react';
import { RenderAPI, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';

import { DateDiff } from './DateDiff';

type Options = {
  value: number;
};

jest.mock('@hooks', () => ({
  useTranslation: () => ({
    translate: (key: string, { value }: Options) => {
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
  <ThemeProvider theme={theme}>
    <DateDiff date={date} now={now} />
  </ThemeProvider>
);

describe('Testing <DateDiff />', () => {
  const elements = {
    dateDiffText: (api: RenderAPI) => api.getByTestId('date-diff-text'),
  };

  describe('render correctly when the dates differs by years', () => {
    it('1 year', () => {
      const component = render(
        renderDateDiff(
          new Date('2020-03-14T19:55:37Z'),
          '2019-03-14T19:55:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('1yr ago');
    });

    it('1 year+', () => {
      const component = render(
        renderDateDiff(
          new Date('2020-04-14T19:55:37Z'),
          '2019-03-13T19:55:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('1yr ago');
    });

    it('2 years', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:55:37Z'),
          '2017-03-13T19:55:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('2yr ago');
    });

    it('2 years+', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-04-20T19:55:37Z'),
          '2017-03-13T19:55:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('2yr ago');
    });

    it('3 years', () => {
      const component = render(
        renderDateDiff(
          new Date('2020-03-23T22:55:37Z'),
          '2017-03-13T19:55:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('3yr ago');
    });

    it('3 years+', () => {
      const component = render(
        renderDateDiff(
          new Date('2020-04-20T19:55:37Z'),
          '2017-03-13T19:55:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('3yr ago');
    });
  });

  describe('render correctly when the dates differs by months', () => {
    it('1 month', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-04-20T20:33:37Z'),
          '2019-03-20T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('1mth ago');
    });

    it('1 month+', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-04-20T20:33:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('1mth ago');
    });

    it('3 months', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-06-20T21:33:37Z'),
          '2019-03-20T20:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('3mth ago');
    });

    it('3 months+', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-06-20T20:33:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('3mth ago');
    });

    it('7 months', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-10-20T21:33:37Z'),
          '2019-03-20T20:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('7mth ago');
    });

    it('7 months+', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-10-20T20:33:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('7mth ago');
    });

    it('11 months', () => {
      const component = render(
        renderDateDiff(
          new Date('2020-02-20T21:33:37Z'),
          '2019-03-20T20:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('11mth ago');
    });

    it('11 months+', () => {
      const component = render(
        renderDateDiff(
          new Date('2020-02-20T20:33:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('11mth ago');
    });
  });

  describe('render correctly when the dates differs by days', () => {
    it('1 day', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-20T20:33:37Z'),
          '2019-03-19T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('1d ago');
    });

    it('1 days', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-20T20:33:37Z'),
          '2019-03-17T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('3d ago');
    });

    it('7 days', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-20T20:33:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('7d ago');
    });

    it('15 days', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-20T20:33:37Z'),
          '2019-03-05T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('15d ago');
    });

    it('22 days', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-04-11T20:33:37Z'),
          '2019-03-20T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('22d ago');
    });

    it('25 days', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-04-14T20:33:37Z'),
          '2019-03-20T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('25d ago');
    });
  });

  describe('render correctly when the dates differs by hours', () => {
    it('shoud render correctly when the dates diff by 1 hour', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T20:33:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('1h ago');
    });

    it('shoud render correctly when the dates diff by 3 hours', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T22:33:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('3h ago');
    });

    it('shoud render correctly when the dates diff by 7 hours', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T09:33:37Z'),
          '2019-03-13T02:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('7h ago');
    });

    it('shoud render correctly when the dates diff by 10 hours', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-04-14T05:33:37Z'),
          '2019-04-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('10h ago');
    });

    it('shoud render correctly when the dates diff by 12 hours', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T07:33:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('12h ago');
    });

    it('shoud render correctly when the dates diff by 15 hours', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-14T10:33:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('15h ago');
    });

    it('shoud render correctly when the dates diff by 23 hours', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-14T18:33:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('23h ago');
    });
  });

  describe('render correctly when the dates differs by minutes', () => {
    it('1 minute', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:34:37Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('1min ago');
    });

    it('5 minutes', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:38:41Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('5min ago');
    });

    it('21 minutes', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:55:00Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('21min ago');
    });

    it('37 minutes', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T20:10:51Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('37min ago');
    });

    it('40 minutes', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T20:13:51Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('40min ago');
    });

    it('47 minutes', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T20:20:55Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('47min ago');
    });

    it('52 minutes', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T20:25:45Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('52min ago');
    });

    it('59 minutes', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T20:32:40Z'),
          '2019-03-13T19:33:37Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('59min ago');
    });
  });

  describe('render correctly when the dates differs by seconds', () => {
    it('1 second1', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:55:31Z'),
          '2019-03-13T19:55:30Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('1s ago');
    });

    it('7 seconds', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:55:37Z'),
          '2019-03-13T19:55:30Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('7s ago');
    });

    it('23 seconds', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:55:53Z'),
          '2019-03-13T19:55:30Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('23s ago');
    });

    it('30 seconds', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:56:00Z'),
          '2019-03-13T19:55:30Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('30s ago');
    });

    it('37 seconds', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:56:07Z'),
          '2019-03-13T19:55:30Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('37s ago');
    });

    it('45 seconds', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:56:15Z'),
          '2019-03-13T19:55:30Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('45s ago');
    });

    it('55 seconds', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:56:25Z'),
          '2019-03-13T19:55:30Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('55s ago');
    });

    it('59 seconds', () => {
      const component = render(
        renderDateDiff(
          new Date('2019-03-13T19:56:29Z'),
          '2019-03-13T19:55:30Z',
        ),
      );
      expect(elements.dateDiffText(component).children[0]).toEqual('59s ago');
    });
  });
});
