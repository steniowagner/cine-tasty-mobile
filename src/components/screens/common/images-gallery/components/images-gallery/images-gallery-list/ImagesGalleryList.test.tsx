import React from 'react';
import {Image} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {dark as theme} from '@styles/themes/dark';
import {randomPositiveNumber} from '@mocks/utils';

import {ImagesGalleryList} from './ImagesGalleryList';

const renderImagesGalleryList = (
  images = [],
  indexImageSelected = 0,
  onFlatlistMomentumScrollEnd = jest.fn(),
) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <ImagesGalleryList
        onFlatlistMomentumScrollEnd={onFlatlistMomentumScrollEnd}
        indexImageSelected={indexImageSelected}
        images={images}
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

let imagesArray = [];

describe('<ImagesGalleryList />', () => {
  beforeAll(() => {
    jest
      .spyOn(Image, 'getSize')
      .mockImplementation(
        (_: string, onSuccess: (width: number, height: number) => void) => {
          onSuccess(100, 100);
        },
      );
  });

  beforeEach(() => {
    jest.useFakeTimers();
    imagesArray = Array(randomPositiveNumber(10, 5))
      .fill('')
      .map((_, index) => `IMAGE_${index}`);
  });

  const elements = {
    placeholders: (api: RenderAPI) =>
      api.queryAllByTestId('placeholder-list-item'),
    imagesList: (api: RenderAPI) => api.queryByTestId('images-list'),
    images: (api: RenderAPI) =>
      api.queryAllByTestId('images-gallery-list-item'),
  };

  describe('Renders correctly', () => {
    it('should render all items correctly with the selected-image selected', async () => {
      const imageSelected = randomPositiveNumber(imagesArray.length - 1, 5);
      const component = render(
        renderImagesGalleryList(imagesArray, imageSelected),
      );
      expect(elements.imagesList(component)).not.toBeNull();
      expect(elements.placeholders(component).length).toEqual(
        imagesArray.length - 1,
      );
      expect(elements.images(component).length).toEqual(1);
      await waitFor(() => {});
    });

    it('should render all items correctly when there is no images to show', async () => {
      const component = render(renderImagesGalleryList());
      expect(elements.imagesList(component)).not.toBeNull();
      expect(elements.placeholders(component).length).toEqual(0);
      expect(elements.images(component).length).toEqual(0);
      await waitFor(() => {});
    });

    it('should allow a new image to be shown when a new item is selected', async () => {
      const component = render(renderImagesGalleryList(imagesArray));
      expect(elements.imagesList(component)).not.toBeNull();
      expect(elements.placeholders(component).length).toEqual(
        imagesArray.length - 1,
      );
      expect(elements.images(component).length).toEqual(1);
      component.rerender(renderImagesGalleryList(imagesArray, 1));
      component.rerender(renderImagesGalleryList(imagesArray, 1));
      expect(elements.imagesList(component)).not.toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.placeholders(component).length).toEqual(
        imagesArray.length - 2,
      );
      expect(elements.images(component).length).toEqual(2);
      component.rerender(renderImagesGalleryList(imagesArray, 2));
      component.rerender(renderImagesGalleryList(imagesArray, 2));
      expect(elements.imagesList(component)).not.toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.placeholders(component).length).toEqual(
        imagesArray.length - 3,
      );
      expect(elements.images(component).length).toEqual(3);
      await waitFor(() => {});
    });
  });

  describe('Fires events correctly', () => {
    it('should call "onFlatlistMomentumScrollEnd" when the "onFlatlistMomentumScrollEnd" event is fired', async () => {
      const imageSelected = randomPositiveNumber(imagesArray.length - 1, 5);
      const onFlatlistMomentumScrollEnd = jest.fn();
      const component = render(
        renderImagesGalleryList(
          imagesArray,
          imageSelected,
          onFlatlistMomentumScrollEnd,
        ),
      );
      expect(onFlatlistMomentumScrollEnd).toHaveBeenCalledTimes(0);
      fireEvent(elements.imagesList(component), 'onMomentumScrollEnd');
      expect(onFlatlistMomentumScrollEnd).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });
  });
});
