import React from 'react';

import {Text} from 'react-native';
import {RenderAPI, render, act, cleanup} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import large from './qualities/large';

import {
  TMDBImageQualitiesProvider,
  useTMDBImageQualities,
} from './TMDBImageQualities';

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Platform: {
      select: ({ios}) => ios,
      OS: 'ios',
    },
    Dimensions: {
      get: () => ({width: 414, height: 736}),
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
        <Text testID="backdrop">
          {tmdbImageQuality.mappingImageTypeToImageSize?.backdrop}
        </Text>
        <Text testID="poster">
          {tmdbImageQuality.mappingImageTypeToImageSize?.poster}
        </Text>
        <Text testID="still">
          {tmdbImageQuality.mappingImageTypeToImageSize?.still}
        </Text>
        <Text testID="profile">
          {tmdbImageQuality.mappingImageTypeToImageSize?.profile}
        </Text>
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

  describe('When the "OS" is "Android" and the "screen-classification" is "large"', () => {
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
          large[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          large[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          large[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          large[targetQuality].poster,
        );
      });
    });

    describe('When the quality selected by the user is "large"', () => {
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
          large[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          large[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          large[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          large[targetQuality].poster,
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
          large[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          large[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          large[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          large[targetQuality].poster,
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
          large[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          large[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          large[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          large[targetQuality].poster,
        );
      });
    });
  });
});
