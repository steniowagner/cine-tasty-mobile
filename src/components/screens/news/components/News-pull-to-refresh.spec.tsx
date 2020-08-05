/* eslint-disable import/first */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { fireEvent, cleanup, render, act } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { dark } from 'styles/themes';

import { DEFAULT_ANIMATION_DURATION } from '../../../common/popup-advice/PopupAdvice';
import timeTravel, { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import { I18N_ENTRY_QUERY_ERROR_REF } from './useNews';

import News from './News';

const navigation = {
  setOptions: () => ({
    // eslint-disable-next-line react/display-name
    headerRight: () => <TouchableOpacity onPress={jest.fn} />,
  }),
};

const renderNews = (mockResolvers?: IMocks) => (
  <ThemeProvider theme={dark}>
    <AutoMockProvider mockResolvers={mockResolvers}>
      <News navigation={navigation} />
    </AutoMockProvider>
  </ThemeProvider>
);

describe('Testing <News /> [pull-to-refresh]', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should show the refreshing-state when the user pull the list to refresh data', () => {
    const NEWS_COUNT = 10;

    const mockResolvers = {
      Articles: () => ({
        items: () => new MockList(NEWS_COUNT),
        hasMore: false,
      }),
    };

    const { queryByTestId } = render(renderNews(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('news-list')).not.toBeNull();

    expect(queryByTestId('news-list').props.data.length).toEqual(NEWS_COUNT);

    expect(queryByTestId('loading-content-indicator')).toBeNull();

    fireEvent(queryByTestId('news-list').props.refreshControl, 'refresh');

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    expect(queryByTestId('news-list')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('news-list')).not.toBeNull();

    expect(queryByTestId('news-list').props.data.length).toEqual(NEWS_COUNT);
  });

  it('should show a error-message and a reload-button on the top of the screen when the user try to pull-to-refresh and some error occur', () => {
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

    rerender(renderNews(mockResolversWithError));

    fireEvent(queryByTestId('news-list').props.refreshControl, 'refresh');

    expect(queryByTestId('top-reload-button')).toBeNull();

    expect(queryByText(I18N_ENTRY_QUERY_ERROR_REF)).toBeNull();

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('top-reload-button')).not.toBeNull();

        expect(queryByText(I18N_ENTRY_QUERY_ERROR_REF)).not.toBeNull();
      }
    });
  });

  it("should refresh the list when some error occur during the first render and the user press the reload button and erro doesn't happen anymore", () => {
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

    const { queryByTestId, rerender } = render(renderNews(mockResolversWithError));

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('news-list').props.data.length).toEqual(0);

        expect(queryByTestId('top-reload-button')).not.toBeNull();
      }
    });

    rerender(renderNews(mockResolvers));

    fireEvent.press(queryByTestId('top-reload-button'));

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('news-list').props.data.length).toEqual(NEWS_COUNT);

        expect(queryByTestId('top-reload-button')).toBeNull();
      }
    });
  });

  it('should persist the entry-error-state when the user try to press the reload-button and the error still hapenning', () => {
    const mockResolversWithError = {
      Articles: () => new Error(),
    };

    const { queryByTestId } = render(renderNews(mockResolversWithError));

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('news-list').props.data.length).toEqual(0);

        expect(queryByTestId('top-reload-button')).not.toBeNull();
      }
    });

    fireEvent.press(queryByTestId('top-reload-button'));

    expect(queryByTestId('loading-content-indicator')).not.toBeNull();

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        expect(queryByTestId('news-list').props.data.length).toEqual(0);

        expect(queryByTestId('top-reload-button')).not.toBeNull();
      }
    });
  });
});
