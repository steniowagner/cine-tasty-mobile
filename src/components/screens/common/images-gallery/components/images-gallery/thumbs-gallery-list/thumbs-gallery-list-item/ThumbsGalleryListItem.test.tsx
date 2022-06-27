import React from 'react';
import {Image} from 'react-native';
import {DefaultTheme} from 'styled-components/native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {dark} from '@styles/themes/dark';
import {light} from '@styles/themes/light';
import metrics from '@styles/metrics';

import ThumbsGalleryListItem from './ThumbsGalleryListItem';

type RenderThumbsGalleryListItemProps = {
  isSelected?: boolean;
  theme?: DefaultTheme;
  onPress?: jest.Mock;
  image?: string;
};

const renderThumbsGalleryListItem = (
  props: RenderThumbsGalleryListItemProps,
) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={props.theme || dark}>
      <ThumbsGalleryListItem
        onPress={props.onPress || jest.fn()}
        isSelected={props.isSelected}
        image={props.image}
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<ThumbsGalleryListItem />', () => {
  const elements = {
    wrapper: (api: RenderAPI) => api.queryByTestId('thumb-list-item'),
    image: (api: RenderAPI) => api.queryByTestId('thumb-image'),
    fallbackWrapper: (api: RenderAPI) =>
      api.queryByTestId('thumb-fallback-wrapper'),
    imageIcon: (api: RenderAPI) => api.queryByTestId('icon-image'),
    imageOffIcon: (api: RenderAPI) => api.queryByTestId('icon-image-off'),
    dotMarker: (api: RenderAPI) => api.queryByTestId('thumb-dot-marker'),
  };

  describe('Successfuly loads the image', () => {
    beforeAll(() => {
      jest
        .spyOn(Image, 'getSize')
        .mockImplementation(
          (_: string, onSuccess: (width: number, height: number) => void) => {
            onSuccess(100, 100);
          },
        );
    });

    describe('The item is "selected"', () => {
      it('should render correctly when the image-state is "LOADING"', async () => {
        const component = render(
          renderThumbsGalleryListItem({image: 'SOME_IMAGE', isSelected: true}),
        );
        expect(elements.wrapper(component)).not.toBeNull();
        expect(elements.image(component)).not.toBeNull();
        expect(elements.dotMarker(component)).not.toBeNull();
        expect(elements.fallbackWrapper(component)).not.toBeNull();
        expect(elements.imageIcon(component)).not.toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        await waitFor(() => {});
      });

      it('should render correctly when the image-state is "LOADED"', async () => {
        const component = render(
          renderThumbsGalleryListItem({image: 'SOME_IMAGE', isSelected: true}),
        );
        fireEvent(elements.image(component), 'onLoad');
        expect(elements.wrapper(component)).not.toBeNull();
        expect(elements.image(component)).not.toBeNull();
        expect(elements.dotMarker(component)).not.toBeNull();
        expect(elements.fallbackWrapper(component)).toBeNull();
        expect(elements.imageIcon(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        await waitFor(() => {});
      });
    });

    describe('The item is "unselected"', () => {
      it('should render correctly when the image-state is "LOADING"', async () => {
        const component = render(
          renderThumbsGalleryListItem({image: 'SOME_IMAGE', isSelected: false}),
        );
        expect(elements.wrapper(component)).not.toBeNull();
        expect(elements.image(component)).not.toBeNull();
        expect(elements.fallbackWrapper(component)).not.toBeNull();
        expect(elements.imageIcon(component)).not.toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.dotMarker(component)).toBeNull();
        await waitFor(() => {});
      });

      it('should render correctly when the image-state is "LOADED"', async () => {
        const component = render(
          renderThumbsGalleryListItem({image: 'SOME_IMAGE', isSelected: false}),
        );
        fireEvent(elements.image(component), 'onLoad');
        expect(elements.wrapper(component)).not.toBeNull();
        expect(elements.image(component)).not.toBeNull();
        expect(elements.fallbackWrapper(component)).toBeNull();
        expect(elements.imageIcon(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
        expect(elements.dotMarker(component)).toBeNull();
        await waitFor(() => {});
      });
    });

    describe('Renders the border correctly', () => {
      describe('When the theme is "DARK"', () => {
        describe('The item is "selected"', () => {
          it('should render the "border" correctly when the image-state is "LOADING"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: true,
              }),
            );
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              dark.colors.primary,
            );
            await waitFor(() => {});
          });

          it('should render the "border" correctly when the image-state is "LOADED"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: true,
              }),
            );
            fireEvent(elements.image(component), 'onLoad');
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              dark.colors.primary,
            );
            await waitFor(() => {});
          });
        });

        describe('The item is "unselected"', () => {
          it('should render the "border" correctly when the image-state is "LOADING"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: false,
              }),
            );
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              'transparent',
            );
            await waitFor(() => {});
          });

          it('should render the "border" correctly when the image-state is "LOADED"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: false,
              }),
            );
            fireEvent(elements.image(component), 'onLoad');
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              'transparent',
            );
            await waitFor(() => {});
          });
        });
      });

      describe('When the theme is "LIGHT"', () => {
        describe('The item is "selected"', () => {
          it('should render the "border" correctly when the image-state is "LOADING"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: true,
                theme: light,
              }),
            );
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              light.colors.buttonText,
            );
            await waitFor(() => {});
          });

          it('should render the "border" correctly when the image-state is "LOADED"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: true,
                theme: light,
              }),
            );
            fireEvent(elements.image(component), 'onLoad');
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              light.colors.buttonText,
            );
            await waitFor(() => {});
          });
        });

        describe('The item is "unselected"', () => {
          it('should render the "border" correctly when the image-state is "LOADING"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: false,
                theme: light,
              }),
            );
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              'transparent',
            );
            await waitFor(() => {});
          });

          it('should render the "border" correctly when the image-state is "LOADED"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: false,
                theme: light,
              }),
            );
            fireEvent(elements.image(component), 'onLoad');
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              'transparent',
            );
            await waitFor(() => {});
          });
        });
      });
    });
  });

  describe('Error when tried to load the image', () => {
    describe('The item is "selected"', () => {
      it('should render correctly when the image-state is "ERROR"', async () => {
        const component = render(
          renderThumbsGalleryListItem({image: 'SOME_IMAGE', isSelected: true}),
        );
        fireEvent(elements.image(component), 'onError');
        expect(elements.wrapper(component)).not.toBeNull();
        expect(elements.image(component)).not.toBeNull();
        expect(elements.dotMarker(component)).not.toBeNull();
        expect(elements.fallbackWrapper(component)).not.toBeNull();
        expect(elements.imageIcon(component)).toBeNull();
        expect(elements.imageOffIcon(component)).not.toBeNull();
        await waitFor(() => {});
      });
    });

    describe('The item is "unselected"', () => {
      it('should render correctly when the image-state is "ERROR"', async () => {
        const component = render(
          renderThumbsGalleryListItem({image: 'SOME_IMAGE', isSelected: false}),
        );
        fireEvent(elements.image(component), 'onError');
        expect(elements.wrapper(component)).not.toBeNull();
        expect(elements.image(component)).not.toBeNull();
        expect(elements.fallbackWrapper(component)).not.toBeNull();
        expect(elements.imageIcon(component)).toBeNull();
        expect(elements.imageOffIcon(component)).not.toBeNull();
        expect(elements.dotMarker(component)).toBeNull();
        await waitFor(() => {});
      });
    });

    describe('Renders the border correctly', () => {
      describe('When the theme is "DARK"', () => {
        describe('The item is "selected"', () => {
          it('should render the "border" correctly when the image-state is "ERROR"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: true,
              }),
            );
            fireEvent(elements.image(component), 'onError');
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              dark.colors.primary,
            );
            await waitFor(() => {});
          });
        });

        describe('The item is "unselected"', () => {
          it('should render the "border" correctly when the image-state is "ERROR"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: false,
              }),
            );
            fireEvent(elements.image(component), 'onError');
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              'transparent',
            );
            await waitFor(() => {});
          });
        });
      });

      describe('When the theme is "LIGHT"', () => {
        describe('The item is "selected"', () => {
          it('should render the "border" correctly when the image-state is "ERROR"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: true,
                theme: light,
              }),
            );
            fireEvent(elements.image(component), 'onError');
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              light.colors.buttonText,
            );
            await waitFor(() => {});
          });
        });

        describe('The item is "unselected"', () => {
          it('should render the "border" correctly when the image-state is "ERROR"', async () => {
            const component = render(
              renderThumbsGalleryListItem({
                image: 'SOME_IMAGE',
                isSelected: false,
                theme: light,
              }),
            );
            fireEvent(elements.image(component), 'onError');
            expect(elements.wrapper(component).props.style.borderWidth).toEqual(
              metrics.getWidthFromDP('0.5%'),
            );
            expect(elements.wrapper(component).props.style.borderColor).toEqual(
              'transparent',
            );
            await waitFor(() => {});
          });
        });
      });
    });
  });

  describe('Pressing the item', () => {
    describe('The item is "selected"', () => {
      describe('The image-state is "LOADING"', () => {
        it('should call the "onPress" when the user press the item', async () => {
          const onPress = jest.fn();
          const component = render(
            renderThumbsGalleryListItem({
              image: 'SOME_IMAGE',
              isSelected: true,
              onPress,
            }),
          );
          expect(onPress).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.wrapper(component));
          expect(onPress).toHaveBeenCalledTimes(1);
          await waitFor(() => {});
        });
      });

      describe('The image-state is "LOADED"', () => {
        it('should call the "onPress" when the user press the item', async () => {
          const onPress = jest.fn();
          const component = render(
            renderThumbsGalleryListItem({
              image: 'SOME_IMAGE',
              isSelected: true,
              onPress,
            }),
          );
          fireEvent(elements.image(component), 'onLoad');
          expect(onPress).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.wrapper(component));
          expect(onPress).toHaveBeenCalledTimes(1);
          await waitFor(() => {});
        });
      });

      describe('The image-state is "ERROR"', () => {
        it('should call the "onPress" when the user press the item', async () => {
          const onPress = jest.fn();
          const component = render(
            renderThumbsGalleryListItem({
              image: 'SOME_IMAGE',
              isSelected: true,
              onPress,
            }),
          );
          fireEvent(elements.image(component), 'onLoad');
          expect(onPress).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.wrapper(component));
          expect(onPress).toHaveBeenCalledTimes(1);
          await waitFor(() => {});
        });
      });
    });

    describe('The item is "unselected"', () => {
      describe('The image-state is "LOADING"', () => {
        it('should call the "onPress" when the user press the item', async () => {
          const onPress = jest.fn();
          const component = render(
            renderThumbsGalleryListItem({
              image: 'SOME_IMAGE',
              isSelected: false,
              onPress,
            }),
          );
          expect(onPress).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.wrapper(component));
          expect(onPress).toHaveBeenCalledTimes(1);
          await waitFor(() => {});
        });
      });

      describe('The image-state is "LOADED"', () => {
        it('should call the "onPress" when the user press the item', async () => {
          const onPress = jest.fn();
          const component = render(
            renderThumbsGalleryListItem({
              image: 'SOME_IMAGE',
              isSelected: false,
              onPress,
            }),
          );
          fireEvent(elements.image(component), 'onLoad');
          expect(onPress).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.wrapper(component));
          expect(onPress).toHaveBeenCalledTimes(1);
          await waitFor(() => {});
        });
      });

      describe('The image-state is "ERROR"', () => {
        it('should call the "onPress" when the user press the item', async () => {
          const onPress = jest.fn();
          const component = render(
            renderThumbsGalleryListItem({
              image: 'SOME_IMAGE',
              isSelected: false,
              onPress,
            }),
          );
          fireEvent(elements.image(component), 'onLoad');
          expect(onPress).toHaveBeenCalledTimes(0);
          fireEvent.press(elements.wrapper(component));
          expect(onPress).toHaveBeenCalledTimes(1);
          await waitFor(() => {});
        });
      });
    });
  });
});
