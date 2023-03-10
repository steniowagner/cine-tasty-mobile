jest.unmock('react-native-reanimated');
import React from 'react';
import {Image} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualitiesProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {dark as theme} from '@styles/themes/dark';
import {randomPositiveNumber} from '@mocks/utils';

import {ImagesGalleryList} from './ImagesGalleryList';

type RenderImagesGalleryListProps = {
  indexImageSelected: number;
  images: string[];
  onFlatlistMomentumScrollEnd?: jest.Mock;
};

const renderImagesGalleryList = (props: RenderImagesGalleryListProps) => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={theme}>
      <ImagesGalleryList
        onFlatlistMomentumScrollEnd={
          props.onFlatlistMomentumScrollEnd || jest.fn()
        }
        indexImageSelected={props.indexImageSelected}
        images={props.images}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

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

  const elements = {
    placeholders: (api: RenderAPI) =>
      api.queryAllByTestId('placeholder-list-item'),
    imagesList: (api: RenderAPI) => api.queryByTestId('images-list'),
    images: (api: RenderAPI) =>
      api.queryAllByTestId('images-gallery-list-item'),
  };

  const makeArrayImages = (length: number) =>
    Array(length)
      .fill('')
      .map((_, index) => `IMAGE_${index}`);

  describe('Renders correctly', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render all items correctly with the selected-image selected', async () => {
      const images = makeArrayImages(randomPositiveNumber(10, 5));
      const indexImageSelected = randomPositiveNumber(images.length - 1, 0);
      const component = render(
        renderImagesGalleryList({images, indexImageSelected}),
      );
      expect(elements.imagesList(component)).not.toBeNull();
      expect(elements.placeholders(component).length).toEqual(
        images.length - 1,
      );
      expect(elements.images(component).length).toEqual(1);
      await waitFor(() => {});
    });

    it('should render all items correctly when there is no images to show', async () => {
      const component = render(
        renderImagesGalleryList({images: [], indexImageSelected: 0}),
      );
      expect(elements.imagesList(component)).not.toBeNull();
      expect(elements.placeholders(component).length).toEqual(0);
      expect(elements.images(component).length).toEqual(0);
      await waitFor(() => {});
    });

    it('should allow a new image to be shown when this image is selected', async () => {
      const images = makeArrayImages(randomPositiveNumber(10, 5));
      const component = render(
        renderImagesGalleryList({images, indexImageSelected: 0}),
      );
      expect(elements.imagesList(component)).not.toBeNull();
      expect(elements.placeholders(component).length).toEqual(
        images.length - 1,
      );
      expect(elements.images(component).length).toEqual(1);
      component.rerender(
        renderImagesGalleryList({images, indexImageSelected: 1}),
      );
      expect(elements.imagesList(component)).not.toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.placeholders(component).length).toEqual(
        images.length - 2,
      );
      expect(elements.images(component).length).toEqual(2);
      component.rerender(
        renderImagesGalleryList({images, indexImageSelected: 2}),
      );
      expect(elements.imagesList(component)).not.toBeNull();
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.placeholders(component).length).toEqual(
        images.length - 3,
      );
      expect(elements.images(component).length).toEqual(3);
      await waitFor(() => {});
    });
  });

  describe('Firing FlatList-events', () => {
    it('should call "onFlatlistMomentumScrollEnd" when the "onFlatlistMomentumScrollEnd" event is fired', async () => {
      const images = makeArrayImages(randomPositiveNumber(10, 5));
      const indexImageSelected = randomPositiveNumber(images.length - 1, 0);
      const onFlatlistMomentumScrollEnd = jest.fn();
      const component = render(
        renderImagesGalleryList({
          images,
          indexImageSelected,
          onFlatlistMomentumScrollEnd,
        }),
      );
      expect(onFlatlistMomentumScrollEnd).toHaveBeenCalledTimes(0);
      fireEvent(elements.imagesList(component), 'onMomentumScrollEnd');
      expect(onFlatlistMomentumScrollEnd).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });
  });
});
