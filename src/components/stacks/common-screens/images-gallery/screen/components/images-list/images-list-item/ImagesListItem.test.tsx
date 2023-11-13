import React from 'react';
import { Image } from 'react-native';
import { act, render, RenderAPI, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { TMDBImageQualitiesProvider } from '@/providers';
import { dark as theme } from '@styles/themes';

import { LANDSCAPE_HEIGHT, PORTRAIT_HEIGHT } from './ImagesListItem.styles';
import { ImagesListItem } from './ImagesListItem';

const renderImagesListItem = (isAllowedToBeShown = true) => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={theme}>
      <ImagesListItem
        image="SOME_IMAGE"
        isAllowedToBeShown={isAllowedToBeShown}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

describe('Common-screens/Images-Gallery/ImagesListItem', () => {
  const elements = {
    image: (api: RenderAPI) => api.getByTestId('tmdb-fallback-image'),
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

      it('should "render" with the "correct height"', async () => {
        const component = render(renderImagesListItem());
        await waitFor(() => {
          expect(
            elements.image(component).props.animatedStyle.value.height,
          ).toEqual(LANDSCAPE_HEIGHT);
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

      it('should "render" with the "correct height"', async () => {
        const component = render(renderImagesListItem());
        await waitFor(() => {
          expect(
            elements.image(component).props.animatedStyle.value.height,
          ).toEqual(PORTRAIT_HEIGHT);
        });
      });
    });
  });
});
