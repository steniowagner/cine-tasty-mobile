/* eslint-disable import/first */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { cleanup, render, act } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import CONSTANTS from 'utils/constants';
import { dark } from 'styles/themes';

import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import News, { INITIAL_ITEMS_TO_RENDER } from './News';

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
      INITIAL_ITEMS_TO_RENDER,
    );
  });

  it('should render the items returned from the query correctly', () => {
    const NEWS_COUNT = 10;

    const mockResolvers = {
      Articles: () => ({
        items: () => new MockList(NEWS_COUNT),
        hasMore: false,
      }),
    };

    const { getAllByTestId, queryByTestId } = render(renderNews(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('news-loading-wrapper')).toBeNull();

    expect(queryByTestId('news-list')).not.toBeNull();

    expect(getAllByTestId('news-list-item-wrapper').length).toBe(
      queryByTestId('news-list').props.initialNumToRender,
    );
  });

  it('should show empty-list state when the query returns an empty array of articles', () => {
    const mockResolvers = {
      Articles: () => ({
        items: () => new MockList(0),
        hasMore: false,
      }),
    };

    const { queryByTestId } = render(renderNews(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('list-empty-component-wrapper')).not.toBeNull();
  });

  it('should render the advise screen when has a network error', async () => {
    const mockResolvers = {
      Query: () => ({
        articles: () => new Error(CONSTANTS.ERROR_MESSAGES.NETWORK_FAILED_CONNECTION),
      }),
    };

    const { queryByTestId } = render(renderNews(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('news-loading-wrapper')).toBeNull();

    expect(queryByTestId('news-list')).toBeNull();

    expect(queryByTestId('advise-wrapper')).not.toBeNull();
  });
});
