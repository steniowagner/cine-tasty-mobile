import React from 'react';
import {Image} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {
  fireEvent,
  render,
  act,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import MockedNavigation from '@mocks/MockedNavigator';
import {dark as theme} from '@styles/themes/dark';
import {randomPositiveNumber} from '@mocks/utils';
import {Routes} from '@routes/routes';

jest.mock('@styles/metrics', () => {
  const metricsModule = jest.requireActual('@styles/metrics');
  return {
    ...metricsModule,
    getWidthFromDP: jest.fn().mockReturnValue(25),
    width: 100,
  };
});

import {ImagesGallery} from './ImagesGallery';

const mockGoback = jest.fn();

const renderImagesGallery = (indexSelected = 0, images = []) => {
  const ImagesGalleryComponent = ({navigation}) => (
    <TMDBImageQualityProvider>
      <ThemeProvider theme={theme}>
        <ImagesGallery
          navigation={{...navigation, goBack: mockGoback}}
          route={{
            name: Routes.ImagesGallery.IMAGES_GALLERY,
            key: `${Routes.ImagesGallery.IMAGES_GALLERY}-key`,
            params: {
              indexSelected,
              images,
            },
          }}
        />
      </ThemeProvider>
    </TMDBImageQualityProvider>
  );
  return <MockedNavigation component={ImagesGalleryComponent} />;
};

describe('<ImagesGallery />', () => {
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
    imagesList: (api: RenderAPI) => api.queryByTestId('images-list'),
    imagesItems: (api: RenderAPI) =>
      api.queryAllByTestId('images-gallery-list-item'),
    thumbsList: (api: RenderAPI) => api.queryByTestId('thumbs-gallery-list'),
    thumbsItems: (api: RenderAPI) => api.queryAllByTestId('thumb-list-item'),
    headerIconButton: (api: RenderAPI) =>
      api.queryByTestId('header-icon-button-wrapper-close'),
  };

  describe('Renders correctly', () => {
    it('should render all components correctly', async () => {
      const datasetLength = randomPositiveNumber(10, 5);
      const indexSelected = randomPositiveNumber(datasetLength - 1, 0);
      const images = Array(datasetLength)
        .fill('')
        .map((_, index) => `IMAGE_${index}`);
      const component = render(renderImagesGallery(indexSelected, images));
      expect(elements.imagesList(component)).not.toBeNull();
      expect(elements.imagesList(component).props.data.length).toEqual(
        datasetLength,
      );
      expect(elements.imagesItems(component).length).toBeGreaterThan(0);
      expect(elements.thumbsList(component)).not.toBeNull();
      expect(elements.thumbsItems(component).length).toEqual(datasetLength);
      expect(elements.headerIconButton(component)).not.toBeNull();
      expect(
        component.getByText(`${indexSelected + 1}/${datasetLength}`),
      ).not.toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Interacting with the "Images-List"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should update the "index-marker" when the user swipe the "images-list" to the right', async () => {
      const datasetLength = randomPositiveNumber(10, 5);
      const indexSelected = Math.floor(datasetLength / 2);
      const images = Array(datasetLength)
        .fill('')
        .map((_, index) => `IMAGE_${index}`);
      const component = render(renderImagesGallery(indexSelected, images));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(
          component.queryByText(`${indexSelected + 1}/${datasetLength}`),
        ).not.toBeNull();
      });
      act(() => {
        jest.runAllTimers();
      });
      fireEvent(elements.imagesList(component), 'onMomentumScrollEnd', {
        nativeEvent: {
          contentOffset: {
            x: 100 * (indexSelected + 1),
          },
        },
      });
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(
          component.queryByText(`${indexSelected + 2}/${datasetLength}`),
        ).not.toBeNull();
      });
      await waitFor(() => {});
    });

    it('should update the "index-marker" when the user swipe the "images-list" to the left', async () => {
      const datasetLength = randomPositiveNumber(10, 5);
      const indexSelected = Math.floor(datasetLength / 2);
      const images = Array(datasetLength)
        .fill('')
        .map((_, index) => `IMAGE_${index}`);
      const component = render(renderImagesGallery(indexSelected, images));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(
          component.queryByText(`${indexSelected + 1}/${datasetLength}`),
        ).not.toBeNull();
      });
      act(() => {
        jest.runAllTimers();
      });
      fireEvent(elements.imagesList(component), 'onMomentumScrollEnd', {
        nativeEvent: {
          contentOffset: {
            x: 100 * (indexSelected - 1),
          },
        },
      });
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(
          component.queryByText(`${indexSelected}/${datasetLength}`),
        ).not.toBeNull();
      });
      await waitFor(() => {});
    });
  });

  describe('Interacting with the "Thumbs-List"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should update the "index-marker" when the user selects some item from "thumbs-list" that are on the right of the current-selected-item', async () => {
      const datasetLength = randomPositiveNumber(10, 5);
      const indexSelected = Math.floor(datasetLength / 2);
      const images = Array(datasetLength)
        .fill('')
        .map((_, index) => `IMAGE_${index}`);
      const component = render(renderImagesGallery(indexSelected, images));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(
          component.queryByText(`${indexSelected + 1}/${datasetLength}`),
        ).not.toBeNull();
      });
      const nextIndexSelected = indexSelected + 1;
      fireEvent.press(elements.thumbsItems(component)[nextIndexSelected]);
      await waitFor(() => {
        expect(
          component.queryByText(`${nextIndexSelected + 1}/${datasetLength}`),
        ).not.toBeNull();
      });
    });

    it('should update the "index-marker" when the user selects some item from "thumbs-list" that are on the left of the current-selected-item', async () => {
      const datasetLength = randomPositiveNumber(10, 5);
      const indexSelected = Math.floor(datasetLength / 2);
      const images = Array(datasetLength)
        .fill('')
        .map((_, index) => `IMAGE_${index}`);
      const component = render(renderImagesGallery(indexSelected, images));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(
          component.queryByText(`${indexSelected + 1}/${datasetLength}`),
        ).not.toBeNull();
      });
      const nextIndexSelected = indexSelected - 1;
      fireEvent.press(elements.thumbsItems(component)[nextIndexSelected]);
      await waitFor(() => {
        expect(
          component.queryByText(`${nextIndexSelected + 1}/${datasetLength}`),
        ).not.toBeNull();
      });
    });
  });

  describe('Pressing the "X" header-button', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call the "navigation.goBack" when the user presses the "X" header-button', () => {
      const datasetLength = randomPositiveNumber(10, 5);
      const indexSelected = randomPositiveNumber(datasetLength - 1, 0);
      const images = Array(datasetLength)
        .fill('')
        .map((_, index) => `IMAGE_${index}`);
      const component = render(renderImagesGallery(indexSelected, images));
      expect(mockGoback).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.headerIconButton(component));
      expect(mockGoback).toHaveBeenCalledTimes(1);
    });
  });
});
