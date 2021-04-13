/* eslint-disable global-require */
import React from 'react';
import { Text } from 'react-native';
import { cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from '@styles/theme';

import large from './qualities/large';

jest.mock('../../utils/async-storage-adapter/AsyncStorageAdapter');

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');

  return {
    Platform: {
      select: ({ android }) => android,
    },
    Dimensions: {
      get: jest.fn().mockReturnValue({ width: 480, height: 640 }),
    },
    PixelRatio: {
      roundToNearestPixel: () => 1,
    },
    Text: View,
  };
});

const {
  getItemFromStorage,
} = require('../../utils/async-storage-adapter/AsyncStorageAdapter');

import { TMDBImageQualityProvider, useTMDBImageQuality } from './TMDBImageQuality';

describe('Testing <TMDBImageQuality /> - [Android/Large-screen]', () => {
  const renderTMDBImageQualityProvider = () => {
    const ContextChildren = () => {
      const { backdrop, poster, still, profile } = useTMDBImageQuality();

      return (
        <ThemeProvider theme={theme}>
          <Text testID="backdrop">{backdrop}</Text>
          <Text testID="poster">{poster}</Text>
          <Text testID="still">{still}</Text>
          <Text testID="profile">{profile}</Text>
        </ThemeProvider>
      );
    };

    return (
      <TMDBImageQualityProvider>
        <ContextChildren />
      </TMDBImageQualityProvider>
    );
  };

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should return qualitites correctly when the screen-classification is "large" and the quality selected is "low"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'low');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(large.low.backdrop);
    expect(getByTestId('still').children[0]).toEqual(large.low.still);
    expect(getByTestId('profile').children[0]).toEqual(large.low.profile);
    expect(getByTestId('poster').children[0]).toEqual(large.low.poster);
  });

  it('should return qualitites correctly when the screen-classification is "large" and the quality selected is "large"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'medium');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(large.medium.backdrop);
    expect(getByTestId('still').children[0]).toEqual(large.medium.still);
    expect(getByTestId('profile').children[0]).toEqual(large.medium.profile);
    expect(getByTestId('poster').children[0]).toEqual(large.medium.poster);
  });

  it('should return qualitites correctly when the screen-classification is "large" and the quality selected is "high"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'high');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(large.high.backdrop);
    expect(getByTestId('still').children[0]).toEqual(large.high.still);
    expect(getByTestId('profile').children[0]).toEqual(large.high.profile);
    expect(getByTestId('poster').children[0]).toEqual(large.high.poster);
  });

  it('should return qualitites correctly when the screen-classification is "large" and the quality selected is "veryHigh"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'veryHigh');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(large.veryHigh.backdrop);
    expect(getByTestId('still').children[0]).toEqual(large.veryHigh.still);
    expect(getByTestId('profile').children[0]).toEqual(large.veryHigh.profile);
    expect(getByTestId('poster').children[0]).toEqual(large.veryHigh.poster);
  });
});
