import React from 'react';
import { FlatList } from 'react-native';
import { cleanup, render, act } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockList } from 'graphql-tools';

import AutoMockProvider from '../../../../utils/AutoMockedProvider';
import News, { LOADING_ITEMS_COUNT } from './News';
import NewsListItem from './list-item/NewsListItem';
import { dark } from '../../../../styles/themes';

jest.useFakeTimers();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Testing <News />', () => {
  afterEach(cleanup);

  it('should render the loading state correctly', () => {
    const { queryByTestId } = render(
      <ThemeProvider
        theme={dark}
      >
        <AutoMockProvider>
          <News />
        </AutoMockProvider>
      </ThemeProvider>,
    );

    expect(queryByTestId('news-loading-wrapper')).not.toBeNull();

    expect(queryByTestId('news-loading-wrapper').props.children.length).toEqual(
      LOADING_ITEMS_COUNT,
    );
  });

  it('should render the items returned from the query correctly', () => {
    const NEWS_COUNT = 10;

    const mockResolvers = {
      ArticleQueryResult: () => ({
        items: () => new MockList(NEWS_COUNT),
        hasMore: false,
      }),
    };

    const { getAllByType, queryByTestId } = render(
      <ThemeProvider
        theme={dark}
      >
        <AutoMockProvider
          mockResolvers={mockResolvers}
        >
          <News />
        </AutoMockProvider>
      </ThemeProvider>,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('news-loading-wrapper')).toBeNull();

    expect(queryByTestId('news-content-wrapper')).not.toBeNull();

    expect(Array.isArray(queryByTestId('news-content-wrapper').props.children)).toBe(
      false,
    );

    expect(getAllByType(FlatList).length).toBe(1);

    expect(getAllByType(NewsListItem).length).toBe(NEWS_COUNT);
  });
});
