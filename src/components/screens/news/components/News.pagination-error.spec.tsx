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

describe('Testing <News /> [pagination]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should run the pagination correctly after an error that just happened on the first pagination', () => {
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

    const { queryByTestId, rerender } = render(renderNews(mockResolvers));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });

    rerender(renderNews(mockResolversWithError));

    fireEvent(queryByTestId('news-list'), 'onEndReached');

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('pagination-footer-reload-button')).not.toBeNull();

        fireEvent.press(queryByTestId('pagination-footer-reload-button'));
      }
    });

    rerender(renderNews(mockResolvers));

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
        expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

        expect(queryByTestId('loading-footer-wrapper')).toBeNull();

        expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

        expect(queryByTestId('news-list').props.data.length).toEqual(NEWS_COUNT * 2);
      }
    });
  });
});
