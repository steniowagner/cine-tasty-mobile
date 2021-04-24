/* eslint-disable import/first */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { MockList, IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { ThemeContextProvider } from '@providers';

import { setupTimeTravel } from '../../../../../__mocks__/timeTravel';
import AutoMockProvider from '../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../__mocks__/MockedNavigator';
import Famous from './Famous';

const FAMOUS_COUNT = 10;

const getMockResolvers = (hasMore: boolean = false) => ({
  PeopleQueryResult: () => ({
    items: () => new MockList(FAMOUS_COUNT),
    hasMore,
  }),
});

const navigation = {
  setOptions: () => ({
    // eslint-disable-next-line react/display-name
    headerRight: () => <TouchableOpacity onPress={jest.fn} />,
  }),
};

const renderFamousScreen = (resolvers?: IMocks) => {
  const FamousScreen = () => (
    <TMDBImageQualityProvider>
      <ThemeContextProvider>
        <AutoMockProvider mockResolvers={resolvers}>
          <Famous navigation={navigation} />
        </AutoMockProvider>
      </ThemeContextProvider>
    </TMDBImageQualityProvider>
  );

  return <MockedNavigation component={FamousScreen} />;
};

describe('Testing <Famous />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should paginate to the next page when the user reach the bottom of the famous-list and the previous query return "hasMore" as "true"', () => {
    const { queryByTestId } = render(renderFamousScreen(getMockResolvers(true)));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('famous-list').props.data.length).toEqual(FAMOUS_COUNT);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    fireEvent(queryByTestId('famous-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('famous-list').props.data.length).toEqual(FAMOUS_COUNT * 2);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should not paginate to the next page when the user reach the bottom of the famous-list and the previous query returned "hasMore" as "false"', () => {
    const { queryByTestId } = render(renderFamousScreen(getMockResolvers()));

    act(() => {
      try {
        jest.runAllTimers();
      } catch (err) {
        console.log(err.message);
      }
    });

    expect(queryByTestId('famous-list').props.data.length).toEqual(FAMOUS_COUNT);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    fireEvent(queryByTestId('famous-list'), 'onEndReached');

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('famous-list').props.data.length).toEqual(FAMOUS_COUNT);

    expect(queryByTestId('pagination-footer-wrapper')).toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();
  });
});
