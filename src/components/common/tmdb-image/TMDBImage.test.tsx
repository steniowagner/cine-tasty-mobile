jest.unmock('react-native-reanimated');
import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {
  RenderAPI,
  render,
  waitFor,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react-native';

import {TMDBImageQualitiesProvider} from '@providers';
import {randomArrayElement} from '@mocks/utils';
import {dark as theme} from '@styles/themes';
import {ImageType} from '@local-types';
import {CONSTANTS} from '@utils';

import screenClassification from '../../../providers/tmdb-image-qualities/qualities/xlarge/medium';
import {TMDBImage} from './TMDBImage';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const TEST_ID = 'TEST_ID';
const IMAGE_TYPES: ImageType[] = ['backdrop', 'poster', 'still', 'profile'];
const IMAGE = '/IMAGE';
const style = {
  width: 21,
  height: 21,
  borderRadius: 21,
};

type RenderTMDBImageProps = {
  onLoad?: jest.Mock;
  onError?: jest.Mock;
  imageType: ImageType;
  isThumbnail?: boolean;
};

const renderTMDBImage = (props: RenderTMDBImageProps) => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualitiesProvider>
      <TMDBImage
        imageType={props.imageType}
        onLoad={props.onLoad}
        onError={props.onError}
        isThumbnail={props.isThumbnail}
        style={style}
        image={IMAGE}
        testID={TEST_ID}
      />
    </TMDBImageQualitiesProvider>
  </ThemeProvider>
);

describe('<TMDBImage />', () => {
  const elements = {
    tmdbImageAnimated: (api: RenderAPI) => api.queryByTestId(TEST_ID),
  };

  describe('Calling the event-handlers', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should call "onLoad" when the image is loaded', async () => {
      const onLoad = jest.fn();
      const component = render(
        renderTMDBImage({onLoad, imageType: randomArrayElement(IMAGE_TYPES)}),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(onLoad).toHaveBeenCalledTimes(0);
      fireEvent(elements.tmdbImageAnimated(component), 'onLoad');
      expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it('should call "onError" when some error happens during the image-load', async () => {
      const onError = jest.fn();
      const component = render(
        renderTMDBImage({onError, imageType: randomArrayElement(IMAGE_TYPES)}),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(onError).toHaveBeenCalledTimes(0);
      fireEvent(elements.tmdbImageAnimated(component), 'onError');
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });

  describe('When "isThumbnail" is "true"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should have the correct "uri"', async () => {
      const component = render(
        renderTMDBImage({
          isThumbnail: true,
          imageType: randomArrayElement(IMAGE_TYPES),
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(elements.tmdbImageAnimated(component).props.source.uri).toEqual(
        `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}${IMAGE}`,
      );
    });
  });

  describe('When "isThumbnail" is "false"', () => {
    describe('When the "image-quality" selected is "backdrop"', () => {
      const imageType: ImageType = 'backdrop';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should have the correct "uri"', async () => {
        const component = render(
          renderTMDBImage({
            imageType,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {});
        expect(elements.tmdbImageAnimated(component).props.source.uri).toEqual(
          `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${screenClassification[imageType]}${IMAGE}`,
        );
      });
    });

    describe('When the "image-quality" selected is "poster"', () => {
      const imageType: ImageType = 'poster';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should have the correct "uri"', async () => {
        const component = render(
          renderTMDBImage({
            imageType,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {});
        expect(elements.tmdbImageAnimated(component).props.source.uri).toEqual(
          `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${screenClassification[imageType]}${IMAGE}`,
        );
      });
    });

    describe('When the "image-quality" selected is "still"', () => {
      const imageType: ImageType = 'still';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should have the correct "uri"', async () => {
        const component = render(
          renderTMDBImage({
            imageType,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {});
        expect(elements.tmdbImageAnimated(component).props.source.uri).toEqual(
          `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${screenClassification[imageType]}${IMAGE}`,
        );
      });
    });

    describe('When the "image-quality" selected is "profile"', () => {
      const imageType: ImageType = 'profile';

      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should have the correct "uri"', async () => {
        const component = render(
          renderTMDBImage({
            imageType,
          }),
        );
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {});
        expect(elements.tmdbImageAnimated(component).props.source.uri).toEqual(
          `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${screenClassification[imageType]}${IMAGE}`,
        );
      });
    });
  });

  describe('Styles', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render with the correct "styles"', async () => {
      const component = render(
        renderTMDBImage({
          imageType: randomArrayElement(IMAGE_TYPES),
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(elements.tmdbImageAnimated(component).props.style).toEqual(style);
    });

    it('should render with the correct "resize-mode"', async () => {
      const component = render(
        renderTMDBImage({
          imageType: randomArrayElement(IMAGE_TYPES),
        }),
      );
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(elements.tmdbImageAnimated(component).props.resizeMode).toEqual(
        FastImage.resizeMode.cover,
      );
    });
  });
});
