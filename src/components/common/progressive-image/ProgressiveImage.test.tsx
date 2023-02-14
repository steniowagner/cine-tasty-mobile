jest.unmock('react-native-reanimated');

import React from 'react';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualitiesProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';
import {ImageType} from '@local-types';

import {
  ON_LOAD_PROGRESSIVE_IMAGE_TIMEOUT,
  DEFAULT_TIMING,
} from './useProgressiveImage';
import {ProgressiveImage} from './ProgressiveImage';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const IMAGE = 'IMAGE';

const renderProgressiveImage = (
  imageType: ImageType,
  borderRadius?: number,
) => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualitiesProvider>
      <ProgressiveImage
        borderRadius={borderRadius}
        imageType={imageType}
        image={IMAGE}
      />
    </TMDBImageQualitiesProvider>
  </ThemeProvider>
);

describe('<ProgressiveImage />', () => {
  const elements = {
    progressiveThumbnail: (api: RenderAPI) =>
      api.queryByTestId('progressive-thumbnail'),
    progressiveImage: (api: RenderAPI) =>
      api.queryByTestId('progressive-image'),
    progressiveImageWrapper: (api: RenderAPI) =>
      api.queryByTestId('progressive-image-wrapper'),
  };

  describe('When "imageType" is "profile"', () => {
    const imageType = 'profile';

    beforeEach(() => {
      setupTimeTravel();
    });

    it('should render with the correct value for "borderRadius" when it is set', async () => {
      const borderRadius = randomPositiveNumber(10, 1);
      const component = render(renderProgressiveImage(imageType, borderRadius));
      expect(
        elements.progressiveImageWrapper(component).props.style[0].borderRadius,
      ).toEqual(borderRadius);
      await waitFor(() => {});
    });

    it('should show the thumbnail-image and the image when the image did not load yet', async () => {
      const component = render(renderProgressiveImage(imageType));
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the thumbnail-image when the image is loaded', async () => {
      const component = render(renderProgressiveImage(imageType));
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      fireEvent(elements.progressiveThumbnail(component), 'onLoad');
      fireEvent(elements.progressiveImage(component), 'onLoad');
      act(() => {
        timeTravel(ON_LOAD_PROGRESSIVE_IMAGE_TIMEOUT + DEFAULT_TIMING);
      });
      expect(elements.progressiveThumbnail(component)).toBeNull();
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });

  describe('When "imageType" is "poster"', () => {
    const imageType = 'poster';

    beforeEach(() => {
      setupTimeTravel();
    });

    it('should render with the correct value for "borderRadius" when it is set', async () => {
      const borderRadius = randomPositiveNumber(10, 1);
      const component = render(renderProgressiveImage(imageType, borderRadius));
      expect(
        elements.progressiveImageWrapper(component).props.style[0].borderRadius,
      ).toEqual(borderRadius);
      await waitFor(() => {});
    });

    it('should show the thumbnail-image and the image when the image did not load yet', async () => {
      const component = render(renderProgressiveImage(imageType));
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the thumbnail-image when the image is loaded', async () => {
      const component = render(renderProgressiveImage(imageType));
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      fireEvent(elements.progressiveThumbnail(component), 'onLoad');
      fireEvent(elements.progressiveImage(component), 'onLoad');
      act(() => {
        timeTravel(ON_LOAD_PROGRESSIVE_IMAGE_TIMEOUT + DEFAULT_TIMING);
      });
      expect(elements.progressiveThumbnail(component)).toBeNull();
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });

  describe('When "imageType" is "still"', () => {
    const imageType = 'still';

    beforeEach(() => {
      setupTimeTravel();
    });

    it('should render with the correct value for "borderRadius" when it is set', async () => {
      const borderRadius = randomPositiveNumber(10, 1);
      const component = render(renderProgressiveImage(imageType, borderRadius));
      expect(
        elements.progressiveImageWrapper(component).props.style[0].borderRadius,
      ).toEqual(borderRadius);
      await waitFor(() => {});
    });

    it('should show the thumbnail-image and the image when the image did not load yet', async () => {
      const component = render(renderProgressiveImage(imageType));
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the thumbnail-image when the image is loaded', async () => {
      const component = render(renderProgressiveImage(imageType));
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      fireEvent(elements.progressiveThumbnail(component), 'onLoad');
      fireEvent(elements.progressiveImage(component), 'onLoad');
      act(() => {
        timeTravel(ON_LOAD_PROGRESSIVE_IMAGE_TIMEOUT + DEFAULT_TIMING);
      });
      expect(elements.progressiveThumbnail(component)).toBeNull();
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });

  describe('When "imageType" is "backdrop"', () => {
    const imageType = 'backdrop';

    beforeEach(() => {
      setupTimeTravel();
    });

    it('should render with the correct value for "borderRadius" when it is set', async () => {
      const borderRadius = randomPositiveNumber(10, 1);
      const component = render(renderProgressiveImage(imageType, borderRadius));
      expect(
        elements.progressiveImageWrapper(component).props.style[0].borderRadius,
      ).toEqual(borderRadius);
      await waitFor(() => {});
    });

    it('should show the thumbnail-image and the image when the image did not load yet', async () => {
      const component = render(renderProgressiveImage(imageType));
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the thumbnail-image when the image is loaded', async () => {
      const component = render(renderProgressiveImage(imageType));
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      fireEvent(elements.progressiveThumbnail(component), 'onLoad');
      fireEvent(elements.progressiveImage(component), 'onLoad');
      act(() => {
        timeTravel(ON_LOAD_PROGRESSIVE_IMAGE_TIMEOUT + DEFAULT_TIMING);
      });
      expect(elements.progressiveThumbnail(component)).toBeNull();
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });
});
