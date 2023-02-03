import React from 'react';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';

import {LOAD_PROGRESSIVE_IMAGE_TIMEOUT} from './useProgressiveImage';
import {ProgressiveImage} from './ProgressiveImage';

const IMAGE = 'IMAGE';
let imageType;

const renderProgressiveImage = (borderRadius?: number) => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualityProvider>
      <ProgressiveImage
        borderRadius={borderRadius}
        imageType={imageType}
        image={IMAGE}
      />
    </TMDBImageQualityProvider>
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

  beforeEach(() => {
    setupTimeTravel();
  });

  describe('When "imageType" is "profile"', () => {
    beforeAll(() => {
      imageType = 'profile';
    });

    it('should render with the correct value for "borderRadius" when it is set', async () => {
      const borderRadius = randomPositiveNumber(10, 1);
      const component = render(renderProgressiveImage(borderRadius));
      expect(
        elements.progressiveImageWrapper(component).props.style[0].borderRadius,
      ).toEqual(borderRadius);
      await waitFor(() => {});
    });

    it('should show the thumbnail-image and the image when the image did not load yet', async () => {
      const component = render(renderProgressiveImage());
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the thumbnail-image when the image is loaded', async () => {
      const component = render(renderProgressiveImage());
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      fireEvent(elements.progressiveThumbnail(component), 'onLoad');
      fireEvent(elements.progressiveImage(component), 'onLoad');
      act(() => {
        timeTravel(2 * LOAD_PROGRESSIVE_IMAGE_TIMEOUT);
      });
      expect(elements.progressiveThumbnail(component)).toBeNull();
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });

  describe('When "imageType" is "poster"', () => {
    beforeAll(() => {
      imageType = 'poster';
    });

    it('should render with the correct value for "borderRadius" when it is set', async () => {
      const borderRadius = randomPositiveNumber(10, 1);
      const component = render(renderProgressiveImage(borderRadius));
      expect(
        elements.progressiveImageWrapper(component).props.style[0].borderRadius,
      ).toEqual(borderRadius);
      await waitFor(() => {});
    });

    it('should show the thumbnail-image and the image when the image did not load yet', async () => {
      const component = render(renderProgressiveImage());
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the thumbnail-image when the image is loaded', async () => {
      const component = render(renderProgressiveImage());
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      fireEvent(elements.progressiveThumbnail(component), 'onLoad');
      fireEvent(elements.progressiveImage(component), 'onLoad');
      act(() => {
        timeTravel(2 * LOAD_PROGRESSIVE_IMAGE_TIMEOUT);
      });
      expect(elements.progressiveThumbnail(component)).toBeNull();
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });

  describe('When "imageType" is "still"', () => {
    beforeAll(() => {
      imageType = 'still';
    });

    it('should render with the correct value for "borderRadius" when it is set', async () => {
      const borderRadius = randomPositiveNumber(10, 1);
      const component = render(renderProgressiveImage(borderRadius));
      expect(
        elements.progressiveImageWrapper(component).props.style[0].borderRadius,
      ).toEqual(borderRadius);
      await waitFor(() => {});
    });

    it('should show the thumbnail-image and the image when the image did not load yet', async () => {
      const component = render(renderProgressiveImage());
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the thumbnail-image when the image is loaded', async () => {
      const component = render(renderProgressiveImage());
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      fireEvent(elements.progressiveThumbnail(component), 'onLoad');
      fireEvent(elements.progressiveImage(component), 'onLoad');
      act(() => {
        timeTravel(2 * LOAD_PROGRESSIVE_IMAGE_TIMEOUT);
      });
      expect(elements.progressiveThumbnail(component)).toBeNull();
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });

  describe('When "imageType" is "backdrop"', () => {
    beforeAll(() => {
      imageType = 'backdrop';
    });

    it('should render with the correct value for "borderRadius" when it is set', async () => {
      const borderRadius = randomPositiveNumber(10, 1);
      const component = render(renderProgressiveImage(borderRadius));
      expect(
        elements.progressiveImageWrapper(component).props.style[0].borderRadius,
      ).toEqual(borderRadius);
      await waitFor(() => {});
    });

    it('should show the thumbnail-image and the image when the image did not load yet', async () => {
      const component = render(renderProgressiveImage());
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the thumbnail-image when the image is loaded', async () => {
      const component = render(renderProgressiveImage());
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveThumbnail(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      fireEvent(elements.progressiveThumbnail(component), 'onLoad');
      fireEvent(elements.progressiveImage(component), 'onLoad');
      act(() => {
        timeTravel(2 * LOAD_PROGRESSIVE_IMAGE_TIMEOUT);
      });
      expect(elements.progressiveThumbnail(component)).toBeNull();
      expect(elements.progressiveImageWrapper(component)).not.toBeNull();
      expect(elements.progressiveImage(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });
});
