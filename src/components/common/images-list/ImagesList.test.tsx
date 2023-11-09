import React from 'react';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { borderRadius } from '@/styles/border-radius';
import { dark as theme } from '@styles/themes';
import metrics from '@/styles/metrics';
import { Routes } from '@/navigation';

import { Orientation } from './images-list-item/ImageListItem.styles';
import { randomPositiveNumber } from '../../../../__mocks__/utils';
import { ImagesList } from './ImagesList';

const images = Array(randomPositiveNumber(10, 1))
  .fill('')
  .map((_, index) => `/image_${index}`);

const mockNavigate = jest.fn();
const mockGetState = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualReactNavigationNative = jest.requireActual(
    '@react-navigation/native',
  );
  return {
    ...actualReactNavigationNative,
    useNavigation: () => ({
      navigate: mockNavigate,
      getState: mockGetState,
    }),
  };
});

const renderImages = (orientation: Orientation, images: string[]) => (
  <ThemeProvider theme={theme}>
    <ImagesList orientation={orientation} images={images} />
  </ThemeProvider>
);

describe('Components/Common/ImagesList', () => {
  const elements = {
    list: (component: RenderAPI) => component.queryByTestId('images-list'),
    listItems: (component: RenderAPI) =>
      component.queryAllByTestId('image-list-item-button'),
    images: (component: RenderAPI) =>
      component.queryAllByTestId('tmdb-fallback-image'),
  };

  describe('When "orientation" is "PORTRAIT"', () => {
    const orientation: Orientation = 'PORTRAIT';

    describe('Rendering', () => {
      it('should render correctly when "has some items to render"', () => {
        const component = render(renderImages(orientation, images));
        expect(elements.list(component)).not.toBeNull();
        expect(elements.listItems(component).length).toEqual(images.length);
      });

      it('should render correctly when "has no items to render"', () => {
        const component = render(renderImages(orientation, []));
        expect(elements.list(component)).toBeNull();
      });

      it('should render with the correct styles', async () => {
        const component = render(renderImages(orientation, images));
        for (let i = 0; i < elements.images(component).length; i++) {
          expect(elements.images(component)[i].props.style.width).toEqual(
            metrics.getWidthFromDP('36'),
          );
          expect(elements.images(component)[i].props.style.height).toEqual(
            metrics.getWidthFromDP('44'),
          );
          expect(
            elements.images(component)[i].props.style.borderRadius,
          ).toEqual(borderRadius.xs);
        }
        await waitFor(() => {});
      });
    });

    describe('Pressing list-items', () => {
      describe('When the "current-stack" is "Home"', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it('shoudl call "navigation.navigate" correctly', () => {
          const indexImageSelected = randomPositiveNumber(images.length - 1);
          const component = render(renderImages(orientation, images));
          mockGetState.mockReturnValue({
            routes: [
              {
                name: Routes.Home.IMAGES_GALLERY,
              },
            ],
          });
          expect(mockNavigate).toBeCalledTimes(0);
          fireEvent.press(elements.listItems(component)[indexImageSelected]);
          expect(mockNavigate).toBeCalledTimes(1);
          expect(mockNavigate).toBeCalledWith(Routes.Home.IMAGES_GALLERY);
        });
      });

      describe('When the "current-stack" is "Famous"', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it('shoudl call "navigation.navigate" correctly', () => {
          const indexImageSelected = randomPositiveNumber(images.length - 1);
          const component = render(renderImages(orientation, images));
          mockGetState.mockReturnValue({
            routes: [
              {
                name: Routes.Famous.DETAILS,
              },
            ],
          });
          expect(mockNavigate).toBeCalledTimes(0);
          fireEvent.press(elements.listItems(component)[indexImageSelected]);
          expect(mockNavigate).toBeCalledTimes(1);
          expect(mockNavigate).toBeCalledWith(Routes.Famous.IMAGES_GALLERY);
        });
      });
    });
  });

  describe('When "orientation" is "LANDSCAPE"', () => {
    const orientation: Orientation = 'LANDSCAPE';

    describe('Rendering', () => {
      it('should render correctly when "has some items to render"', () => {
        const component = render(renderImages(orientation, images));
        expect(elements.list(component)).not.toBeNull();
        expect(elements.listItems(component).length).toEqual(images.length);
      });

      it('should render correctly when "has no items to render"', () => {
        const component = render(renderImages(orientation, []));
        expect(elements.list(component)).toBeNull();
      });

      it('should render with the correct styles', async () => {
        const component = render(renderImages(orientation, images));
        for (let i = 0; i < elements.images(component).length; i++) {
          expect(elements.images(component)[i].props.style.width).toEqual(
            metrics.getWidthFromDP('60'),
          );
          expect(elements.images(component)[i].props.style.height).toEqual(
            metrics.getWidthFromDP('36'),
          );
          expect(
            elements.images(component)[i].props.style.borderRadius,
          ).toEqual(borderRadius.xs);
        }
        await waitFor(() => {});
      });
    });

    describe('Pressing list-items', () => {
      describe('When the "current-stack" is "Home"', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it('shoudl call "navigation.navigate" correctly', () => {
          const indexImageSelected = randomPositiveNumber(images.length - 1);
          const component = render(renderImages(orientation, images));
          mockGetState.mockReturnValue({
            routes: [
              {
                name: Routes.Home.IMAGES_GALLERY,
              },
            ],
          });
          expect(mockNavigate).toBeCalledTimes(0);
          fireEvent.press(elements.listItems(component)[indexImageSelected]);
          expect(mockNavigate).toBeCalledTimes(1);
          expect(mockNavigate).toBeCalledWith(Routes.Home.IMAGES_GALLERY);
        });
      });

      describe('When the "current-stack" is "Famous"', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it('shoudl call "navigation.navigate" correctly', () => {
          const indexImageSelected = randomPositiveNumber(images.length - 1);
          const component = render(renderImages(orientation, images));
          mockGetState.mockReturnValue({
            routes: [
              {
                name: Routes.Famous.DETAILS,
              },
            ],
          });
          expect(mockNavigate).toBeCalledTimes(0);
          fireEvent.press(elements.listItems(component)[indexImageSelected]);
          expect(mockNavigate).toBeCalledTimes(1);
          expect(mockNavigate).toBeCalledWith(Routes.Famous.IMAGES_GALLERY);
        });
      });
    });
  });
});
