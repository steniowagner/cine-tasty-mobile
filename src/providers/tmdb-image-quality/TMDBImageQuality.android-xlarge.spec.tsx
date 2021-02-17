/* eslint-disable global-require */
import React from 'react';
import { Text } from 'react-native';
import { cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import xlarge from './qualities/xlarge';

jest.mock('../../utils/async-storage-adapter/AsyncStorageAdapter');

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');

  return {
    Platform: {
      select: ({ android }) => android,
    },
    Dimensions: {
      get: jest.fn().mockReturnValue({ width: 720, height: 960 }),
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

describe('Testing <TMDBImageQuality /> - [Android/XLarge-screen]', () => {
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

  it('should return qualitites correctly when the screen-classification is "xlarge" and the quality selected is "low"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'low');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(xlarge.low.backdrop);
    expect(getByTestId('still').children[0]).toEqual(xlarge.low.still);
    expect(getByTestId('profile').children[0]).toEqual(xlarge.low.profile);
    expect(getByTestId('poster').children[0]).toEqual(xlarge.low.poster);
  });

  it('should return qualitites correctly when the screen-classification is "xlarge" and the quality selected is "medium"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'medium');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(xlarge.medium.backdrop);
    expect(getByTestId('still').children[0]).toEqual(xlarge.medium.still);
    expect(getByTestId('profile').children[0]).toEqual(xlarge.medium.profile);
    expect(getByTestId('poster').children[0]).toEqual(xlarge.medium.poster);
  });

  it('should return qualitites correctly when the screen-classification is "xlarge" and the quality selected is "high"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'high');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(xlarge.high.backdrop);
    expect(getByTestId('still').children[0]).toEqual(xlarge.high.still);
    expect(getByTestId('profile').children[0]).toEqual(xlarge.high.profile);
    expect(getByTestId('poster').children[0]).toEqual(xlarge.high.poster);
  });

  it('should return qualitites correctly when the screen-classification is "xlarge" and the quality selected is "veryHigh"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'veryHigh');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(xlarge.veryHigh.backdrop);
    expect(getByTestId('still').children[0]).toEqual(xlarge.veryHigh.still);
    expect(getByTestId('profile').children[0]).toEqual(xlarge.veryHigh.profile);
    expect(getByTestId('poster').children[0]).toEqual(xlarge.veryHigh.poster);
  });
});
