import React from 'react';
import {Image} from 'react-native';
import {
  cleanup,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {dark as theme} from '@styles/themes/dark';

import ImagesGalleryListItem from './ImagesGalleryListItem';
import {
  LANDSCAPE_HEIGHT,
  PORTRAIT_HEIGHT,
} from './ImagesGalleryListItem.styles';

const IMAGE_URL = 'SOME_IMAGE_URL';

const renderImagesGalleryListItem = (
  imageURL: string,
  isAllowedToBeShowed = true,
) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <ImagesGalleryListItem
        isAllowedToBeShowed={isAllowedToBeShowed}
        imageURL={imageURL}
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<ImagesGalleryListItem />', () => {
  const elements = {
    loadingState: (api: RenderAPI) =>
      api.queryByTestId('images-gallery-list-item-loading'),
    errorState: (api: RenderAPI) => api.queryByTestId('image-error-wrapper'),
    imageOffIcon: (api: RenderAPI) => api.queryByTestId('icon-image-off'),
    listItem: (api: RenderAPI) => api.queryByTestId('images-gallery-list-item'),
    image: (api: RenderAPI) => api.queryByTestId('image-gallery-item'),
  };

  describe('"isAllowedToBeShowed" is "true"', () => {
    describe('When the image is Landscape', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should render with the correct height', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            onSuccess(101, 100);
          },
        );
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        expect(elements.image(component).props.style[0].height).toEqual(
          LANDSCAPE_HEIGHT,
        );
        await waitFor(() => {});
      });

      it('should render correctly when the app fetches the image-size successfully', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            onSuccess(101, 100);
          },
        );
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        expect(elements.listItem(component)).not.toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).not.toBeNull();
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        expect(getSizeMock.mock.calls[0][0]).toEqual(
          `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
        );
        await waitFor(() => {});
      });

      it('should render the loading-state correctly when the app is fetching the image size', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            setTimeout(() => {
              onSuccess(101, 100);
            }, 0);
          },
        );
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        expect(elements.listItem(component)).toBeNull();
        expect(elements.loadingState(component)).not.toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).toBeNull();
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        expect(getSizeMock.mock.calls[0][0]).toEqual(
          `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
        );
        await waitFor(() => {});
      });
    });

    describe('When the image Portrait', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should render with the correct height', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            onSuccess(100, 100);
          },
        );
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        expect(elements.image(component).props.style[0].height).toEqual(
          PORTRAIT_HEIGHT,
        );
        await waitFor(() => {});
      });

      it('should render correctly when the app fetches the image-size successfully', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            onSuccess(100, 100);
          },
        );
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        expect(elements.listItem(component)).not.toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).not.toBeNull();
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        expect(getSizeMock.mock.calls[0][0]).toEqual(
          `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
        );
        await waitFor(() => {});
      });

      it('should render the loading-state correctly when the app is fetching the image size', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            setTimeout(() => {
              onSuccess(100, 100);
            }, 0);
          },
        );
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        expect(elements.listItem(component)).toBeNull();
        expect(elements.loadingState(component)).not.toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).toBeNull();
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        expect(getSizeMock.mock.calls[0][0]).toEqual(
          `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
        );
        await waitFor(() => {});
      });
    });

    describe('When some error happens', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should render the error-state correctly when the app gets an error when try to fetch the image-size', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, __: Function, onError: Function) => {
            onError();
          },
        );
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        expect(elements.listItem(component)).toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).not.toBeNull();
        expect(elements.imageOffIcon(component)).not.toBeNull();
        expect(elements.image(component)).toBeNull();
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        expect(getSizeMock.mock.calls[0][0]).toEqual(
          `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
        );
        await waitFor(() => {});
      });
    });
  });

  describe('"isAllowedToBeShowed" is "false"', () => {
    describe('When the image is Landscape', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should render with the correct height', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            onSuccess(101, 100);
          },
        );
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        component.rerender(renderImagesGalleryListItem(IMAGE_URL, false));
        expect(elements.image(component).props.style[0].height).toEqual(
          LANDSCAPE_HEIGHT,
        );
        await waitFor(() => {});
      });

      it('should render correctly when the app fetches the image-size successfully', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            onSuccess(101, 100);
          },
        );
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        component.rerender(renderImagesGalleryListItem(IMAGE_URL, false));
        expect(elements.listItem(component)).not.toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).not.toBeNull();
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        expect(getSizeMock.mock.calls[0][0]).toEqual(
          `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
        );
        await waitFor(() => {});
      });

      it('should render the loading-state correctly when the app is fetching the image size', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            setTimeout(() => {
              onSuccess(101, 100);
            }, 0);
          },
        );
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        component.rerender(renderImagesGalleryListItem(IMAGE_URL, false));
        expect(elements.listItem(component)).toBeNull();
        expect(elements.loadingState(component)).not.toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).toBeNull();
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        expect(getSizeMock.mock.calls[0][0]).toEqual(
          `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
        );
        await waitFor(() => {});
      });
    });

    describe('When the image Portrait', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should render with the correct height', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            onSuccess(100, 100);
          },
        );
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        component.rerender(renderImagesGalleryListItem(IMAGE_URL, false));
        expect(elements.image(component).props.style[0].height).toEqual(
          PORTRAIT_HEIGHT,
        );
        await waitFor(() => {});
      });

      it('should render correctly when the app fetches the image-size successfully', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            onSuccess(100, 100);
          },
        );
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        component.rerender(renderImagesGalleryListItem(IMAGE_URL, false));
        expect(elements.listItem(component)).not.toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).not.toBeNull();
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        expect(getSizeMock.mock.calls[0][0]).toEqual(
          `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
        );
        await waitFor(() => {});
      });

      it('should render the loading-state correctly when the app is fetching the image size', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            setTimeout(() => {
              onSuccess(100, 100);
            }, 0);
          },
        );
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        component.rerender(renderImagesGalleryListItem(IMAGE_URL, false));
        expect(elements.listItem(component)).toBeNull();
        expect(elements.loadingState(component)).not.toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).toBeNull();
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        expect(getSizeMock.mock.calls[0][0]).toEqual(
          `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
        );
        await waitFor(() => {});
      });
    });

    describe('When some error happens', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should render the error-state correctly when the app gets an error when try to fetch the image-size', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, __: Function, onError: Function) => {
            onError();
          },
        );
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        component.rerender(renderImagesGalleryListItem(IMAGE_URL, false));
        expect(elements.listItem(component)).toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).not.toBeNull();
        expect(elements.imageOffIcon(component)).not.toBeNull();
        expect(elements.image(component)).toBeNull();
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        expect(getSizeMock.mock.calls[0][0]).toEqual(
          `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
        );
        await waitFor(() => {});
      });
    });
  });
});