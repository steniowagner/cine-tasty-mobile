import React from 'react';
import { Image } from 'react-native';
import {
  act,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { TMDBImageQualitiesProvider } from '@/providers';
import { dark as theme } from '@styles/themes';

import { randomPositiveNumber } from '../../../../../../../../__mocks__/utils';
import { ImagesList } from './ImagesList';

jest.mock('@providers', () => {
  const actualProvidersModule = jest.requireActual('@providers');
  return {
    ...actualProvidersModule,
    useTMDBImageQualities: () => ({
      poster: 'w92',
      backdrop: 'w300',
      still: 'w92',
      profile: 'w92',
    }),
  };
});

const images = Array(2)
  .fill('')
  .map((_, index) => `IMAGE_${index}`);

const renderImagesList = (
  indexImageSelected: number,
  onFlatlistMomentumScrollEnd = jest.fn(),
) => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={theme}>
      <ImagesList
        onFlatlistMomentumScrollEnd={onFlatlistMomentumScrollEnd}
        indexImageSelected={indexImageSelected}
        images={images}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

describe('Common-screens/Images-Gallery/ImagesList', () => {
  const elements = {
    images: (api: RenderAPI) =>
      api.queryAllByTestId('images-gallery-list-item'),
    placeholders: (api: RenderAPI) => api.queryAllByTestId('image-placeholder'),
    list: (api: RenderAPI) => api.getByTestId('images-list'),
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
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should render the items correctly', async () => {
      const component = render(renderImagesList(0));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.images(component).length).toEqual(1);
      expect(elements.placeholders(component).length).toEqual(1);
      await waitFor(() => {});
    });
  });

  describe('Scrolling', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should render correctly when scroll', async () => {
      const component = render(renderImagesList(0));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.images(component).length).toEqual(1);
      expect(elements.placeholders(component).length).toEqual(1);
      component.rerender(renderImagesList(1));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.images(component).length).toEqual(2);
      expect(elements.placeholders(component).length).toEqual(0);
      await waitFor(() => {});
    });

    it('should call "onFlatlistMomentumScrollEnd" when the user finishes the scroll', async () => {
      const onFlatlistMomentumScrollEnd = jest.fn();
      const component = render(
        renderImagesList(0, onFlatlistMomentumScrollEnd),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(onFlatlistMomentumScrollEnd).toHaveBeenCalledTimes(0);
      fireEvent(elements.list(component), 'onMomentumScrollEnd');
      expect(onFlatlistMomentumScrollEnd).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });
  });
});
