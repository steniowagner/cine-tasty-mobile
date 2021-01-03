/* eslint-disable global-require */
import React from 'react';
import { Text } from 'react-native';
import { cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import xsmall from './qualities/xsmall';

jest.mock('../../utils/async-storage-adapter/AsyncStorageAdapter');

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');

  return {
    Platform: {
      select: ({ ios }) => ios,
    },
    Dimensions: {
      get: jest.fn().mockReturnValue({ width: 320, height: 480 }),
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

describe('Testing <TMDBImageQuality /> - [iOS/XSmall-screen]', () => {
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

  it('should return qualitites correctly when the screen-classification is "xsmall" and the quality selected is "low"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'low');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(xsmall.low.backdrop);
    expect(getByTestId('still').children[0]).toEqual(xsmall.low.still);
    expect(getByTestId('profile').children[0]).toEqual(xsmall.low.profile);
    expect(getByTestId('poster').children[0]).toEqual(xsmall.low.poster);
  });

  it('should return qualitites correctly when the screen-classification is "xsmall" and the quality selected is "medium"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'medium');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(xsmall.medium.backdrop);
    expect(getByTestId('still').children[0]).toEqual(xsmall.medium.still);
    expect(getByTestId('profile').children[0]).toEqual(xsmall.medium.profile);
    expect(getByTestId('poster').children[0]).toEqual(xsmall.medium.poster);
  });

  it('should return qualitites correctly when the screen-classification is "xsmall" and the quality selected is "high"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'high');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(xsmall.high.backdrop);
    expect(getByTestId('still').children[0]).toEqual(xsmall.high.still);
    expect(getByTestId('profile').children[0]).toEqual(xsmall.high.profile);
    expect(getByTestId('poster').children[0]).toEqual(xsmall.high.poster);
  });

  it('should return qualitites correctly when the screen-classification is "xsmall" and the quality selected is "veryHigh"', () => {
    getItemFromStorage.mockImplementationOnce(() => 'veryHigh');

    const { getByTestId, rerender } = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(xsmall.veryHigh.backdrop);
    expect(getByTestId('still').children[0]).toEqual(xsmall.veryHigh.still);
    expect(getByTestId('profile').children[0]).toEqual(xsmall.veryHigh.profile);
    expect(getByTestId('poster').children[0]).toEqual(xsmall.veryHigh.poster);
  });
});
