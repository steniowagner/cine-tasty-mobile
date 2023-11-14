import React from 'react';
import { Image } from 'react-native';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import { TMDBImageQualitiesProvider } from '@providers';
import { Routes } from '@navigation';
import { dark } from '@/styles/themes';
import metrics from '@/styles/metrics';

import { MockedNavigator } from '../../../../../../__mocks__/MockedNavigator';
import { randomPositiveNumber } from '../../../../../../__mocks__/utils';
import { ImagesGalleryProps } from '../routes/route-params-types';
import { ImagesGallery } from './ImagesGallery';

const images = Array(3)
  .fill('')
  .map((_, index) => `IMAGE_${index}`);

const renderImagesGallery = (indexSelected: number, goBack = jest.fn()) => {
  const ImagesGalleryComponent = (props: ImagesGalleryProps) => {
    const route =
      randomPositiveNumber(2, 1) % 2 === 0
        ? Routes.Home.IMAGES_GALLERY
        : Routes.Famous.IMAGES_GALLERY;
    return (
      <TMDBImageQualitiesProvider>
        <ImagesGallery
          route={{
            name: route,
            key: `${route}-key`,
            params: {
              indexSelected,
              images,
            },
          }}
          navigation={{
            ...props.navigation,
            goBack: goBack || jest.fn(),
          }}
        />
      </TMDBImageQualitiesProvider>
    );
  };
  return <MockedNavigator component={ImagesGalleryComponent} />;
};

describe('Common-screens/ImagesGallery', () => {
  const elements = {
    imagesList: (api: RenderAPI) => api.getByTestId('images-list'),
    imagesItems: (api: RenderAPI) =>
      api.queryAllByTestId('images-gallery-list-item'),
    thumbsList: (api: RenderAPI) => api.getByTestId('thumbs-list'),
    thumbsItems: (api: RenderAPI) => api.getAllByTestId('thumbs-list-item'),
    imagesPlaceholders: (api: RenderAPI) =>
      api.queryAllByTestId('image-placeholder'),
  };

  beforeAll(() => {
    jest
      .spyOn(Image, 'getSize')
      .mockImplementation(
        (_: string, onSuccess: (width: number, height: number) => void) => {
          onSuccess(100, 100);
        },
      );
  });

  describe('Rendering', () => {
    it('should render correctly', async () => {
      const component = render(renderImagesGallery(randomPositiveNumber(0)));
      expect(elements.imagesList(component)).not.toBeNull();
      expect(elements.thumbsList(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should "render" the "header" "correctly"', async () => {
      const indexImageSelected = randomPositiveNumber(images.length - 1);
      const component = render(renderImagesGallery(indexImageSelected));
      await waitFor(() => {
        expect(
          component.queryByText(`${indexImageSelected + 1}/${images.length}`),
        ).not.toBeNull();
      });
    });
  });

  describe('Scrolling the "images-list"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    describe('Updating the "header-index-marker"', () => {
      describe('Scrolling to right', () => {
        describe('Updating the "header-index-marker"', () => {
          it('should update the "header-index-marker" when swiping the "images-list" to the right', async () => {
            const component = render(renderImagesGallery(0));
            act(() => {
              jest.runAllTimers();
            });
            await waitFor(() => {
              expect(
                component.queryByText(`1/${images.length}`),
              ).not.toBeNull();
            });
            fireEvent(elements.imagesList(component), 'onMomentumScrollEnd', {
              nativeEvent: {
                contentOffset: {
                  x: metrics.width,
                },
              },
            });
            act(() => {
              jest.runAllTimers();
            });
            await waitFor(() => {
              expect(
                component.queryByText(`2/${images.length}`),
              ).not.toBeNull();
            });
            await waitFor(() => {});
          });
        });
      });

      describe('Scrolling to left', () => {
        describe('Updating the "header-index-marker"', () => {
          it('should update the "index-marker" when the user swipe the "images-list" to the left', async () => {
            await waitFor(() => {});
            const component = render(renderImagesGallery(1));
            act(() => {
              jest.runAllTimers();
            });
            await waitFor(() => {
              expect(
                component.queryByText(`2/${images.length}`),
              ).not.toBeNull();
            });
            act(() => {
              jest.runAllTimers();
            });
            fireEvent(elements.imagesList(component), 'onMomentumScrollEnd', {
              nativeEvent: {
                contentOffset: {
                  x: -metrics.width,
                },
              },
            });
            act(() => {
              jest.runAllTimers();
            });
            await waitFor(() => {
              expect(
                component.queryByText(`1/${images.length}`),
              ).not.toBeNull();
            });
          });
        });
      });
    });

    describe('Updating the "thumbs-list"', () => {
      describe('Scrolling to right', () => {
        describe('Updating the "thumb-item-selected"', () => {
          it('should update the "thumb-item-selected"', async () => {
            const component = render(renderImagesGallery(0));
            await waitFor(() => {});
            expect(
              elements.thumbsItems(component)[0].props.style.borderColor,
            ).toEqual(dark.colors.primary);
            expect(
              elements.thumbsItems(component)[1].props.style.borderColor,
            ).toEqual('transparent');
            act(() => {
              fireEvent(elements.imagesList(component), 'onMomentumScrollEnd', {
                nativeEvent: {
                  contentOffset: {
                    x: metrics.width,
                  },
                },
              });
            });
            expect(
              elements.thumbsItems(component)[1].props.style.borderColor,
            ).toEqual(dark.colors.primary);
            expect(
              elements.thumbsItems(component)[0].props.style.borderColor,
            ).toEqual('transparent');
          });
        });
      });

      describe('Scrolling to left', () => {
        it('should update the "thumb-item-selected"', async () => {
          const component = render(renderImagesGallery(1));
          await waitFor(() => {});
          expect(
            elements.thumbsItems(component)[1].props.style.borderColor,
          ).toEqual(dark.colors.primary);
          expect(
            elements.thumbsItems(component)[0].props.style.borderColor,
          ).toEqual('transparent');
          act(() => {
            fireEvent(elements.imagesList(component), 'onMomentumScrollEnd', {
              nativeEvent: {
                contentOffset: {
                  x: -metrics.width,
                },
              },
            });
          });
          expect(
            elements.thumbsItems(component)[0].props.style.borderColor,
          ).toEqual(dark.colors.primary);
          expect(
            elements.thumbsItems(component)[1].props.style.borderColor,
          ).toEqual('transparent');
        });
      });
    });
  });

  describe('Selecting "thumb-items" from "thumbs-list"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should update the "header-index-marker" correctly', async () => {
      const component = render(renderImagesGallery(0));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(component.queryByText(`1/${images.length}`)).not.toBeNull();
      });
      const indexThumbSelected = randomPositiveNumber(images.length - 1);
      act(() => {
        fireEvent.press(elements.thumbsItems(component)[indexThumbSelected]);
      });
      await waitFor(() => {
        expect(
          component.queryByText(`${indexThumbSelected + 1}/${images.length}`),
        ).not.toBeNull();
      });
      await waitFor(() => {});
    });

    it('should move the "images-list"', async () => {
      const component = render(renderImagesGallery(0));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.imagesItems(component).length).toBeGreaterThan(0);
        expect(elements.thumbsItems(component).length).toBeGreaterThan(0);
      });
      expect(elements.imagesPlaceholders(component).length).toEqual(
        images.length - 1,
      );
      expect(elements.imagesItems(component).length).toEqual(1);
      act(() => {
        fireEvent.press(elements.thumbsItems(component)[1]);
      });
      expect(elements.imagesPlaceholders(component).length).toEqual(1);
      expect(elements.imagesItems(component).length).toEqual(2);
      act(() => {
        fireEvent.press(elements.thumbsItems(component)[2]);
      });
      expect(elements.imagesPlaceholders(component).length).toEqual(0);
      expect(elements.imagesItems(component).length).toEqual(3);
      await waitFor(() => {});
    });
  });
});
