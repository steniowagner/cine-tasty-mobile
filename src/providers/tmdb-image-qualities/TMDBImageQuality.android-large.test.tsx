import React from 'react';
import {Text} from 'react-native';
import {RenderAPI, render, act, cleanup} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import large from './qualities/large';

jest.mock('@utils');

jest.mock('react-native', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Platform: {
      select: ({android}) => android,
    },
    Dimensions: {
      get: jest.fn().mockReturnValue({width: 480, height: 640}),
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

const utils = require('@utils');

import {
  TMDBImageQualitiesProvider,
  useTMDBImageQualities,
} from './TMDBImageQualities';

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

    describe('When the quality selected by the user is "medium"', () => {
      const targetQuality = 'medium';

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
