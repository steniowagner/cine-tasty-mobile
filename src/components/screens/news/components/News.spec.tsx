import React from 'react';
import { TouchableOpacity } from 'react-native';
import { cleanup, render, act } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';
import { GraphQLError } from 'graphql';

import AuthoMockedErrorProvider from '../../../../utils/mock-providers/AuthoMockedErrorProvider';
import AutoMockProvider from '../../../../utils/mock-providers/AutoMockedProvider';
import CONSTANTS from '../../../../utils/constants';
import News, { LOADING_ITEMS_COUNT } from './News';
import { dark } from '../../../../styles/themes';

const navigation = {
  setOptions: () => ({
    // eslint-disable-next-line react/display-name
    headerRight: () => (
      <TouchableOpacity
        onPress={jest.fn}
      />
    ),
  }),
};

const renderNews = (mockResolvers?: IMocks) => (
  <ThemeProvider
    theme={dark}
  >
    <AutoMockProvider
      mockResolvers={mockResolvers}
    >
      <News
        navigation={navigation}
      />
    </AutoMockProvider>
  </ThemeProvider>
);

jest.useFakeTimers();

describe('Testing <News />', () => {
  afterEach(cleanup);

  it('should render the loading state correctly', () => {
    const { queryByTestId } = render(renderNews());

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

    const { getAllByTestId, queryByTestId } = render(renderNews(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('news-loading-wrapper')).toBeNull();

    expect(queryByTestId('news-content-wrapper')).not.toBeNull();

    expect(queryByTestId('news-list')).not.toBeNull();

    expect(getAllByTestId('news-list-item-wrapper').length).toBe(NEWS_COUNT);
  });

  it('should render the advise screen when has a network error', () => {
    const { queryByTestId } = render(
      <AuthoMockedErrorProvider
        errors={[new GraphQLError(CONSTANTS.ERROR_MESSAGES.NETWORK_FAILED_CONNECTION)]}
      >
        <ThemeProvider
          theme={dark}
        >
          <News
            navigation={navigation}
          />
        </ThemeProvider>
      </AuthoMockedErrorProvider>,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('news-loading-wrapper')).toBeNull();

    expect(queryByTestId('news-content-wrapper')).toBeNull();

    expect(queryByTestId('news-list')).toBeNull();

    expect(queryByTestId('advise-wrapper')).not.toBeNull();
  });
});
