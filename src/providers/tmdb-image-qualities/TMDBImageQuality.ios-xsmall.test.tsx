import React from 'react';

import {TouchableOpacity, Text} from 'react-native';
import {
  RenderAPI,
  render,
  act,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';
import RNRestart from 'react-native-restart';

import {dark as theme} from '@styles/themes/dark';
import * as Types from '@local-types';
import {CONSTANTS} from '@utils';

import xsmall from './qualities/xsmall';

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
      get: () => ({width: 320, height: 480}),
    },
    PixelRatio: {
      roundToNearestPixel: () => 1,
    },
    Animated: {
      View,
    },
    TouchableOpacity: View,
    Text: View,
  };
});

const mockRestart = jest.fn().mockImplementation();
jest.mock('react-native-restart');
// @ts-ignore
RNRestart.Restart = mockRestart;

jest.mock('@utils');

const utils = require('@utils');

const renderTMDBImageQuality = (
  newQuality: Types.ImageQualities = 'medium',
) => {
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
        <TouchableOpacity
          onPress={() => tmdbImageQuality.changeQuality(newQuality)}
          testID="change-quality"
        />
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
    changeQualityButton: (api: RenderAPI) => api.getByTestId('change-quality'),
  };

  describe('When the "OS" is "Android" and the "screen-classification" is "xsmall"', () => {
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
          xsmall[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          xsmall[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          xsmall[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          xsmall[targetQuality].poster,
        );
      });
    });

    describe('When the quality selected by the user is "xsmall"', () => {
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
          xsmall[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          xsmall[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          xsmall[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          xsmall[targetQuality].poster,
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
          xsmall[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          xsmall[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          xsmall[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          xsmall[targetQuality].poster,
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
          xsmall[targetQuality].backdrop,
        );
        expect(elements.still(component).children[0]).toEqual(
          xsmall[targetQuality].still,
        );
        expect(elements.profile(component).children[0]).toEqual(
          xsmall[targetQuality].profile,
        );
        expect(elements.poster(component).children[0]).toEqual(
          xsmall[targetQuality].poster,
        );
      });
    });

    describe('Changing the image-quality', () => {
      describe('When prerssing "Low" option', () => {
        const qualitySelected = 'low';

        beforeEach(() => {
          jest.clearAllMocks();
          jest.useFakeTimers();
        });

        it('should call "storage.set" correctly', () => {
          const component = render(renderTMDBImageQuality(qualitySelected));
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.changeQualityButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(1);
          expect(utils.storage.set).toHaveBeenCalledWith(
            CONSTANTS.KEYS.IMAGES_QUALITY,
            qualitySelected,
          );
          act(() => {
            jest.runAllTimers();
          });
        });

        it('should call "RNRestart.Restart" correctly', async () => {
          const component = render(renderTMDBImageQuality(qualitySelected));
          expect(mockRestart).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.changeQualityButton(component));
          await waitFor(() => {
            expect(mockRestart).toHaveBeenCalledTimes(1);
          });
          act(() => {
            jest.runAllTimers();
          });
        });
      });

      describe('When prerssing "Medium" option', () => {
        const qualitySelected = 'medium';

        beforeEach(() => {
          jest.clearAllMocks();
          jest.useFakeTimers();
        });

        it('should call "storage.set" correctly', () => {
          const component = render(renderTMDBImageQuality(qualitySelected));
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.changeQualityButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(1);
          expect(utils.storage.set).toHaveBeenCalledWith(
            CONSTANTS.KEYS.IMAGES_QUALITY,
            qualitySelected,
          );
          act(() => {
            jest.runAllTimers();
          });
        });

        it('should call "RNRestart.Restart" correctly', async () => {
          const component = render(renderTMDBImageQuality(qualitySelected));
          expect(mockRestart).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.changeQualityButton(component));
          await waitFor(() => {
            expect(mockRestart).toHaveBeenCalledTimes(1);
          });
          act(() => {
            jest.runAllTimers();
          });
        });
      });

      describe('When prerssing "High" option', () => {
        const qualitySelected = 'high';

        beforeEach(() => {
          jest.clearAllMocks();
          jest.useFakeTimers();
        });

        it('should call "storage.set" correctly', () => {
          const component = render(renderTMDBImageQuality(qualitySelected));
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.changeQualityButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(1);
          expect(utils.storage.set).toHaveBeenCalledWith(
            CONSTANTS.KEYS.IMAGES_QUALITY,
            qualitySelected,
          );
          act(() => {
            jest.runAllTimers();
          });
        });

        it('should call "RNRestart.Restart" correctly', async () => {
          const component = render(renderTMDBImageQuality(qualitySelected));
          expect(mockRestart).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.changeQualityButton(component));
          await waitFor(() => {
            expect(mockRestart).toHaveBeenCalledTimes(1);
          });
          act(() => {
            jest.runAllTimers();
          });
        });
      });

      describe('When prerssing "Very High" option', () => {
        const qualitySelected = 'veryHigh';

        beforeEach(() => {
          jest.clearAllMocks();
          jest.useFakeTimers();
        });

        it('should call "storage.set" correctly', () => {
          const component = render(renderTMDBImageQuality(qualitySelected));
          expect(utils.storage.set).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.changeQualityButton(component));
          expect(utils.storage.set).toHaveBeenCalledTimes(1);
          expect(utils.storage.set).toHaveBeenCalledWith(
            CONSTANTS.KEYS.IMAGES_QUALITY,
            qualitySelected,
          );
          act(() => {
            jest.runAllTimers();
          });
        });

        it('should call "RNRestart.Restart" correctly', async () => {
          const component = render(renderTMDBImageQuality(qualitySelected));
          expect(mockRestart).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.changeQualityButton(component));
          await waitFor(() => {
            expect(mockRestart).toHaveBeenCalledTimes(1);
          });
          act(() => {
            jest.runAllTimers();
          });
        });
      });
    });
  });
});
