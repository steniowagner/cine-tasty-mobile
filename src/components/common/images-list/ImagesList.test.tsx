import React from 'react';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {randomPositiveNumber, randomArrayIndex} from '@mocks/utils';
import {TMDBImageQualityProvider} from '@providers';
import {dark as theme} from '@styles/themes/dark';
import {Routes} from '@routes/routes';

import {ImagesList} from './ImagesList';

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => {
  const actualReactNavigationNative = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...actualReactNavigationNative,
    useNavigation: () => mockNavigation,
  };
});

const renderImagesList = (images?: string[]) => {
  const orientation =
    randomPositiveNumber(10, 1) % 2 === 0 ? 'LANDSCAPE' : 'PORTRAIT';
  return (
    <ThemeProvider theme={theme}>
      <TMDBImageQualityProvider>
        <ImagesList orientation={orientation} images={images} />
      </TMDBImageQualityProvider>
    </ThemeProvider>
  );
};

describe('<ImagesList />', () => {
  const elements = {
    imageButtons: (api: RenderAPI) =>
      api.queryAllByTestId('image-list-item-button'),
    imagesList: (api: RenderAPI) => api.queryByTestId('images-list'),
  };

  describe('Render correctly', () => {
    it('should render correctly when there is some images', async () => {
      const numberOfImages = randomPositiveNumber(10, 1);
      const images = Array(numberOfImages)
        .fill('')
        .map((_, index) => `IMAGE_${index}`);
      const component = render(renderImagesList(images));
      expect(elements.imagesList(component)).not.toBeNull();
      expect(elements.imageButtons(component).length).toEqual(numberOfImages);
      await waitFor(() => {});
    });

    it('should not render the list when there is no images', async () => {
      const component = render(renderImagesList([]));
      expect(elements.imagesList(component)).toBeNull();
      expect(elements.imageButtons(component).length).toEqual(0);
      await waitFor(() => {});
    });

    it('should not render the list when "images" is "undefined"', async () => {
      const component = render(renderImagesList());
      expect(elements.imagesList(component)).toBeNull();
      expect(elements.imageButtons(component).length).toEqual(0);
      await waitFor(() => {});
    });
  });

  describe('Press on the Image', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should navigate correctly to the "IMAGES_GALLERY" screen when the user press some image', async () => {
      const numberOfImages = randomPositiveNumber(10, 1);
      const images = Array(numberOfImages)
        .fill('')
        .map((_, index) => `IMAGE_${index}`);
      const indexImageSelected = randomArrayIndex(images);
      const component = render(renderImagesList(images));
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.imageButtons(component)[indexImageSelected]);
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        Routes.ImagesGallery.IMAGES_GALLERY,
        {
          indexSelected: indexImageSelected,
          images: images,
        },
      );
      await waitFor(() => {});
    });
  });
});
