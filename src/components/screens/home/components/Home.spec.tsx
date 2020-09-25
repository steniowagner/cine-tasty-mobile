/* eslint-disable import/first */
import React from 'react';
import { View } from 'react-native';
import { cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { dark } from 'styles/themes';

import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import { TRENDING_MOVIES_ERROR_REF_I18N } from './use-home/useHome';
import Home from './Home';

const navigation = {
  setOptions: () => ({
    // eslint-disable-next-line react/display-name
    header: () => <View />,
  }),
};

const renderHome = (mockResolvers?: IMocks) => {
  const HomeScreen = () => (
    <ThemeProvider theme={dark}>
      <AutoMockProvider mockResolvers={mockResolvers}>
        <Home navigation={navigation} />
      </AutoMockProvider>
    </ThemeProvider>
  );

  return <MockedNavigation component={HomeScreen} />;
};

describe('Testing <Famous />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render the loading state when the screen is mounted', () => {
    const { queryByTestId } = render(renderHome());

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it("should render the content properly when the query-result isnt' null", () => {
    const mockResolvers = {
      TrendingMoviesQueryResult: () => ({
        items: () => new MockList(1),
      }),
    };

    const { queryByTestId, queryAllByTestId } = render(renderHome(mockResolvers));

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('loading-home')).toBeNull();

    expect(queryByTestId('top3-list')).not.toBeNull();

    expect(queryAllByTestId('section-wrapper').length).toEqual(4);

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should render popup-message with an error when the query-result has an error', () => {
    const mockResolvers = {
      TrendingMovies: () => new Error(),
    };

    const { queryByTestId, queryAllByTestId } = render(renderHome(mockResolvers));

    expect(queryByTestId('loading-home')).not.toBeNull();

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });

    expect(queryByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-home')).toBeNull();

    expect(queryByTestId('top3-list')).toBeNull();

    expect(queryAllByTestId('scrollview-content')).toEqual([]);
  });
});
