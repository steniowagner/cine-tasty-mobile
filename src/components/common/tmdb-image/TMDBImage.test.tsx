jest.unmock('react-native-reanimated');
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  RenderAPI,
  render,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react-native';

import { ImageType } from '@/providers/tmdb-image-qualities/types';
import { TMDBImageQualitiesProvider } from '@providers';
import { dark as theme } from '@styles/themes';

import { TMDBImage } from './TMDBImage';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const mockUri = jest.fn();

jest.mock('@hooks', () => ({
  useTMDBImageURI: () => ({
    uri: mockUri,
  }),
}));

const IMAGE = '/IMAGE';
const ERROR_ICON = 'image-off';
const LOADING_ICON = 'account';
const style = {
  width: 21,
  height: 21,
  borderRadius: 21,
};

const renderTMDBImage = (
  isThumbnail = false,
  imageType = 'backdrop' as ImageType,
) => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualitiesProvider>
      <TMDBImage
        imageType={imageType}
        isThumbnail={isThumbnail}
        style={style}
        iconSize={1}
        image={IMAGE}
        testID="tmdb-image"
        iconImageLoading={LOADING_ICON}
        iconImageError={ERROR_ICON}
      />
    </TMDBImageQualitiesProvider>
  </ThemeProvider>
);

describe('Components/Common/TMDBImage', () => {
  const elements = {
    image: (api: RenderAPI) => api.queryByTestId('tmdb-image'),
    fallbackImage: (api: RenderAPI) => api.queryByTestId('tmdb-fallback-image'),
    errorIcon: (api: RenderAPI) => api.queryByTestId(`icon-${ERROR_ICON}`),
    loadingIcon: (api: RenderAPI) => api.queryByTestId(`icon-${LOADING_ICON}`),
  };

  describe('Rendering', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should show the "loading-state" while is loading the image', async () => {
      mockUri.mockReturnValueOnce(undefined);
      const component = render(renderTMDBImage());
      expect(elements.image(component)).toBeNull();
      expect(elements.fallbackImage(component)).not.toBeNull();
      expect(elements.errorIcon(component)).toBeNull();
      expect(elements.loadingIcon(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should show the "loaded-state" when "load the image successfuly', async () => {
      mockUri.mockReturnValueOnce('SOME_URI');
      const component = render(renderTMDBImage());
      await waitFor(() => {
        expect(elements.image(component)).not.toBeNull();
      });
      act(() => {
        fireEvent(elements.image(component)!, 'onLoad');
      });
      expect(elements.image(component)).not.toBeNull();
      expect(elements.fallbackImage(component)).toBeNull();
      expect(elements.errorIcon(component)).toBeNull();
      expect(elements.loadingIcon(component)).toBeNull();
    });

    it('should show the "error-state" when an "error happened" when "loading the image"', async () => {
      mockUri.mockReturnValueOnce('SOME_URI');
      const component = render(renderTMDBImage());
      await waitFor(() => {
        expect(elements.image(component)).not.toBeNull();
      });
      act(() => {
        fireEvent(elements.image(component)!, 'onError');
      });
      expect(elements.image(component)).not.toBeNull();
      expect(elements.fallbackImage(component)).not.toBeNull();
      expect(elements.errorIcon(component)).not.toBeNull();
      expect(elements.loadingIcon(component)).toBeNull();
    });
  });

  describe('Style', () => {
    it('should render the "fallback-image" with the correcty stlyes', async () => {
      const component = render(renderTMDBImage());
      expect(elements.fallbackImage(component)?.props.style).toEqual({
        width: style.width,
        height: style.height,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        opacity: 1,
        borderRadius: style.borderRadius,
        backgroundColor: theme.colors.fallbackImageBackground,
      });
      await waitFor(() => {});
    });
  });
});
