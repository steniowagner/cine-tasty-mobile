jest.unmock('react-native-reanimated');
import React from 'react';
import {Image} from 'react-native';
import {
  act,
  cleanup,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualitiesProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
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
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={theme}>
      <ImagesGalleryListItem
        isAllowedToBeShown={isAllowedToBeShowed}
        imageURL={imageURL}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

describe('<ImagesGalleryListItem />', () => {
  const elements = {
    loadingState: (api: RenderAPI) =>
      api.queryByTestId('images-gallery-list-item-loading'),
    errorState: (api: RenderAPI) => api.queryByTestId('image-error-wrapper'),
    imageOffIcon: (api: RenderAPI) => api.queryByTestId('icon-image-off'),
    listItem: (api: RenderAPI) => api.queryByTestId('images-gallery-list-item'),
    image: (api: RenderAPI) => api.queryByTestId('progressive-image'),
    thumbnail: (api: RenderAPI) => api.queryByTestId('progressive-thumbnail'),
  };

  describe('When "isAllowedToBeShown" is "true"', () => {
    describe('When the "image" is "Landscape"', () => {
      const getSizeMock = jest.spyOn(Image, 'getSize');

      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            process.nextTick(() => {
              onSuccess(101, 100);
            });
          },
        );
      });

      afterEach(cleanup);

      it('should render with the correct height', async () => {
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {});
        expect(elements.image(component).props.style.height).toEqual(
          LANDSCAPE_HEIGHT,
        );
        expect(elements.thumbnail(component).props.style.height).toEqual(
          LANDSCAPE_HEIGHT,
        );
        await waitFor(() => {});
      });

      it('should render correctly when the app fetches the image-size successfully', async () => {
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {});
        expect(elements.listItem(component)).not.toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).not.toBeNull();
        await waitFor(() => {});
      });

      it('should render the "loading-state" correctly when the app is "fetching" the image size', async () => {
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        expect(elements.loadingState(component)).not.toBeNull();
        expect(elements.listItem(component)).toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).toBeNull();
        act(() => {
          jest.runAllTimers();
        });
      });
    });

    describe('When the "image" is "Portrait"', () => {
      const getSizeMock = jest.spyOn(Image, 'getSize');

      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            // Postponing this callback call to the next-tick, so we can have some fictional time to load the image
            process.nextTick(() => {
              onSuccess(100, 100);
            });
          },
        );
      });

      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should render with the correct height', async () => {
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {});
        expect(elements.image(component).props.style.height).toEqual(
          PORTRAIT_HEIGHT,
        );
        expect(elements.thumbnail(component).props.style.height).toEqual(
          PORTRAIT_HEIGHT,
        );
        await waitFor(() => {});
      });

      it('should render correctly when the app fetches the image-size successfully', async () => {
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {});
        expect(elements.listItem(component)).not.toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).not.toBeNull();
        await waitFor(() => {});
      });

      it('should render the "loading-state" correctly when the app is "fetching" the image size', async () => {
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        expect(elements.loadingState(component)).not.toBeNull();
        expect(elements.listItem(component)).toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).toBeNull();
        await waitFor(() => {});
      });
    });

    describe('When some error happens', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should render the "error-state" correctly when the app gets an "error" when try to fetch the image-size', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, __: Function, onError: Function) => {
            onError();
          },
        );
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        expect(elements.listItem(component)).toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).not.toBeNull();
        expect(elements.imageOffIcon(component)).not.toBeNull();
        expect(elements.image(component)).toBeNull();
        await waitFor(() => {});
      });
    });
  });

  describe('When "isAllowedToBeShowed" is "false"', () => {
    describe('When the image is "Landscape"', () => {
      const getSizeMock = jest.spyOn(Image, 'getSize');

      beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        getSizeMock.mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            // Postponing this callback call to the next-tick, so we can have some fictional time to load the image
            process.nextTick(() => {
              onSuccess(101, 100);
            });
          },
        );
      });

      afterEach(cleanup);

      it('should fetch the image from the correct url', async () => {
        expect(getSizeMock).toHaveBeenCalledTimes(0);
        render(renderImagesGalleryListItem(IMAGE_URL, false));
        expect(getSizeMock).toHaveBeenCalledTimes(1);
        await waitFor(() => {});
      });

      it('should render with the correct height', async () => {
        const component = render(renderImagesGalleryListItem(IMAGE_URL, false));
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {});
        expect(elements.image(component).props.style.height).toEqual(
          LANDSCAPE_HEIGHT,
        );
        expect(elements.thumbnail(component).props.style.height).toEqual(
          LANDSCAPE_HEIGHT,
        );
        await waitFor(() => {});
      });

      it('should render correctly when the app fetches the image-size successfully', async () => {
        const component = render(renderImagesGalleryListItem(IMAGE_URL, false));
        act(() => {
          jest.runAllTimers();
        });
        await waitFor(() => {});
        expect(elements.listItem(component)).not.toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).not.toBeNull();
        await waitFor(() => {});
      });

      it('should render the loading-state correctly when the app is fetching the image size', async () => {
        const component = render(renderImagesGalleryListItem(IMAGE_URL));
        component.rerender(renderImagesGalleryListItem(IMAGE_URL, false));
        expect(elements.listItem(component)).toBeNull();
        expect(elements.loadingState(component)).not.toBeNull();
        expect(elements.errorState(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.image(component)).toBeNull();
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
        expect(elements.image(component).props.style.height).toEqual(
          PORTRAIT_HEIGHT,
        );
        expect(elements.thumbnail(component).props.style.height).toEqual(
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
        await waitFor(() => {});
      });
    });

    describe('When some error happens', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      afterEach(cleanup);

      it('should render the "error-state" correctly when the app gets an "error" when try to fetch the image-size', async () => {
        const getSizeMock = jest.spyOn(Image, 'getSize');
        getSizeMock.mockImplementation(
          (_: string, __: Function, onError: Function) => {
            onError();
          },
        );
        const component = render(renderImagesGalleryListItem(IMAGE_URL, false));
        expect(elements.listItem(component)).toBeNull();
        expect(elements.loadingState(component)).toBeNull();
        expect(elements.errorState(component)).not.toBeNull();
        expect(elements.imageOffIcon(component)).not.toBeNull();
        expect(elements.image(component)).toBeNull();
        await waitFor(() => {});
      });
    });
  });
});
