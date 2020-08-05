/* eslint-disable import/first */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  fireEvent, cleanup, render, act,
} from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { dark } from 'styles/themes';

import { DEFAULT_ANIMATION_DURATION } from '../../../common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import { I18N_QUERY_BY_PAGINATION_ERROR_REF } from './useNews';

import News from './News';

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

describe('Testing <News />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render the loading state correctly when is mounted from the first time', () => {
    const { queryByTestId } = render(renderNews());

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render the items returned from the query correctly', () => {
    const NEWS_COUNT = 10;

    const mockResolvers = {
      Articles: () => ({
        items: () => new MockList(NEWS_COUNT),
      }),
    };

    const { queryByTestId } = render(renderNews(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('loading-content-indicator')).toBeNull();

    expect(queryByTestId('news-list')).not.toBeNull();

    expect(queryByTestId('news-list').props.data.length).toEqual(NEWS_COUNT);
  });

  it('should show the empty-list-state when the query returns an empty array of articles', () => {
    const mockResolvers = {
      Articles: () => ({
        items: () => new MockList(0),
      }),
    };

    const { queryByTestId } = render(renderNews(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('list-empty-component-wrapper')).not.toBeNull();

    expect(queryByTestId('news-list')).toBeNull();
  });

  it('should paginate to the next page when the user reach the bottom of the news-list and the previous query return "hasMore" as "true"', () => {
    const NEWS_COUNT = 10;

    const mockResolvers = {
      Articles: () => ({
        items: () => new MockList(NEWS_COUNT),
        hasMore: true,
      }),
    };

    const { queryByTestId } = render(renderNews(mockResolvers));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });

    expect(queryByTestId('news-list').props.data.length).toEqual(NEWS_COUNT);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    fireEvent(queryByTestId('news-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });

    expect(queryByTestId('news-list').props.data.length).toEqual(NEWS_COUNT * 2);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();
  });

  it('should not paginate to the next page when the user reach the bottom of the news-list and the previous query return "hasMore" as "false"', () => {
    const NEWS_COUNT = 10;

    const mockResolvers = {
      Articles: () => ({
        items: () => new MockList(NEWS_COUNT),
        hasMore: false,
      }),
    };

    const { queryByTestId } = render(renderNews(mockResolvers));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });

    expect(queryByTestId('news-list').props.data.length).toEqual(NEWS_COUNT);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    fireEvent(queryByTestId('news-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('news-list').props.data.length).toEqual(NEWS_COUNT);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();
  });

  it('should show an error message about pagination-error and a list-footer-error-state when the user tries to paginated and some error occurs', () => {
    const NEWS_COUNT = 10;

    const mockResolvers = {
      Articles: () => ({
        items: () => new MockList(NEWS_COUNT),
        hasMore: true,
      }),
    };

    const mockResolversWithError = {
      Articles: () => new Error(),
    };

    const { queryByTestId, queryByText, rerender } = render(renderNews(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('news-list').props.data.length).toEqual(NEWS_COUNT);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    rerender(renderNews(mockResolversWithError));

    fireEvent(queryByTestId('news-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

        expect(queryByTestId('pagination-footer-reload-button')).not.toBeNull();

        expect(queryByTestId('loading-footer-wrapper')).toBeNull();

        expect(queryByTestId('popup-advice-wrapper')).not.toBeNull();

        expect(queryByText(I18N_QUERY_BY_PAGINATION_ERROR_REF)).not.toBeNull();
      }
    });
  });
});
