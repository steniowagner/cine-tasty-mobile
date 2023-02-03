import React from 'react';

import {Text} from 'react-native';
import {RenderAPI, render, act, cleanup} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import xlarge from './qualities/xlarge';

import {
  TMDBImageQualitiesProvider,
  useTMDBImageQualities,
} from './TMDBImageQualities';

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Platform: {
      select: ({android}) => android,
      OS: 'android',
    },
    Dimensions: {
      get: () => ({width: 720, height: 960}),
    },
    PixelRatio: {
      roundToNearestPixel: () => 1,
    },
    Animated: {
      View,
    },
    Text: View,
  };
});

jest.mock('@utils');

const utils = require('@utils');

const renderTMDBImageQuality = () => {
  const ContextChildren = () => {
    const tmdbImageQuality = useTMDBImageQualities();

    return (
      <>
        <Text testID="backdrop">{tmdbImageQuality.backdrop}</Text>
        <Text testID="poster">{tmdbImageQuality.poster}</Text>
        <Text testID="still">{tmdbImageQuality.still}</Text>
        <Text testID="profile">{tmdbImageQuality.profile}</Text>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <TMDBImageQualitiesProvider>
        <ContextChildren />
      </TMDBImageQualitiesProvider>
    </ThemeProvider>
  );
};

describe('<TMDBImageQualities />', () => {
  const elements = {
    backdrop: (api: RenderAPI) => api.getByTestId('backdrop'),
    poster: (api: RenderAPI) => api.getByTestId('poster'),
    still: (api: RenderAPI) => api.getByTestId('still'),
    profile: (api: RenderAPI) => api.getByTestId('profile'),
  };

  describe('When the "OS" is "Android" and the "screen-classification" is "xlarge"', () => {
    describe('When the quality selected by the user is "low"', () => {
      const targetQuality = 'low';

      beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should return the qualitites correctly', async () => {
        utils.storage.get.mockImplementationOnce(() => targetQuality);
        const component = render(renderTMDBImageQuality());
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.backdrop(component).children[0]).toEqual(
          xlarge[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          xlarge[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          xlarge[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          xlarge[targetQuality].poster,
        );
      });
    });

    describe('When the quality selected by the user is "xlarge"', () => {
      const targetQuality = 'low';

      beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should return the qualitites correctly', async () => {
        utils.storage.get.mockImplementationOnce(() => targetQuality);
        const component = render(renderTMDBImageQuality());
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.backdrop(component).children[0]).toEqual(
          xlarge[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          xlarge[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          xlarge[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          xlarge[targetQuality].poster,
        );
      });
    });

    describe('When the quality selected by the user is "high"', () => {
      const targetQuality = 'high';

      beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should return the qualitites correctly', async () => {
        utils.storage.get.mockImplementationOnce(() => targetQuality);
        const component = render(renderTMDBImageQuality());
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.backdrop(component).children[0]).toEqual(
          xlarge[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          xlarge[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          xlarge[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          xlarge[targetQuality].poster,
        );
      });
    });

    describe('When the quality selected by the user is "veryHigh"', () => {
      const targetQuality = 'veryHigh';

      beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should return the qualitites correctly', async () => {
        utils.storage.get.mockImplementationOnce(() => targetQuality);
        const component = render(renderTMDBImageQuality());
        act(() => {
          jest.runAllTimers();
        });
        expect(elements.backdrop(component).children[0]).toEqual(
          xlarge[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          xlarge[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          xlarge[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          xlarge[targetQuality].poster,
        );
      });
    });
  });
});
