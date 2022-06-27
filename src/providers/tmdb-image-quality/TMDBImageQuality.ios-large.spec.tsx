/* eslint-disable global-require */
import React from 'react';
import {Text} from 'react-native';
import {cleanup, render, act} from '@testing-library/react-native';

import {ThemeContextProvider} from '@providers';

import large from './qualities/large';

jest.mock('../../utils/async-storage-adapter/s');

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');

  return {
    Platform: {
      select: ({ios}) => ios,
    },
    Dimensions: {
      get: jest.fn().mockReturnValue({width: 414, height: 736}),
    },
    PixelRatio: {
      roundToNearestPixel: () => 1,
    },
    Text: View,
  };
});

const storage = require('../../utils/storage');

import {
  TMDBImageQualityProvider,
  useTMDBImageQuality,
} from './TMDBImageQuality';

describe('Testing <TMDBImageQuality /> - [iOS/Large-screen]', () => {
  const renderTMDBImageQualityProvider = () => {
    const ContextChildren = () => {
      const {backdrop, poster, still, profile} = useTMDBImageQuality();

      return (
        <>
          <Text testID="backdrop">{backdrop}</Text>
          <Text testID="poster">{poster}</Text>
          <Text testID="still">{still}</Text>
          <Text testID="profile">{profile}</Text>
        </>
      );
    };

    return (
      <ThemeContextProvider>
        <TMDBImageQualityProvider>
          <ContextChildren />
        </TMDBImageQualityProvider>
      </ThemeContextProvider>
    );
  };

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should return qualitites correctly when the screen-classification is "large" and the quality selected is "low"', () => {
    storage.get.mockImplementationOnce(() => 'low');

    const {getByTestId, rerender} = render(renderTMDBImageQualityProvider());

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
    storage.get.mockImplementationOnce(() => 'medium');

    const {getByTestId, rerender} = render(renderTMDBImageQualityProvider());

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
    storage.get.mockImplementationOnce(() => 'high');

    const {getByTestId, rerender} = render(renderTMDBImageQualityProvider());

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
    storage.get.mockImplementationOnce(() => 'veryHigh');

    const {getByTestId, rerender} = render(renderTMDBImageQualityProvider());

    act(() => {
      jest.runAllTimers();
    });

    rerender(renderTMDBImageQualityProvider());

    expect(getByTestId('backdrop').children[0]).toEqual(
      large.veryHigh.backdrop,
    );
    expect(getByTestId('still').children[0]).toEqual(large.veryHigh.still);
    expect(getByTestId('profile').children[0]).toEqual(large.veryHigh.profile);
    expect(getByTestId('poster').children[0]).toEqual(large.veryHigh.poster);
  });
});
