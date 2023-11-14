import React from 'react';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider, DefaultTheme } from 'styled-components/native';
import { ReactTestInstance } from 'react-test-renderer';

import { TMDBImageQualitiesProvider } from '@/providers';
import { dark, light } from '@styles/themes';

import { randomPositiveNumber } from '../../../../../../../../__mocks__/utils';
import { DotMarker } from './thumbs-list-item/ThumbsListItem.styles';
import { ThumbsList } from './ThumbsList';

const images = Array(randomPositiveNumber(10, 1))
  .fill('')
  .map((_, index) => `THUMB_${index}`);

type RenderThumbsListProps = {
  onPressThumbListItem?: jest.Mock;
  indexImageSelected: number;
  theme?: DefaultTheme;
};

const renderThumbsList = (props: RenderThumbsListProps) => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={props.theme || dark}>
      <ThumbsList
        onPressThumbListItem={props.onPressThumbListItem || jest.fn()}
        indexImageSelected={props.indexImageSelected}
        thumbs={images}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

describe('Common-screens/Images-Gallery/ThumbsList', () => {
  const elements = {
    items: (api: RenderAPI) => api.getAllByTestId('thumbs-list-item'),
    markers: (api: RenderAPI) => api.getByTestId('thumb-dot-marker'),
  };

  describe('Rendering', () => {
    describe('When the theme is "dark"', () => {
      it('should render the "selected-item" correctly', async () => {
        const indexImageSelected = randomPositiveNumber(images.length - 1);
        const component = render(
          renderThumbsList({
            indexImageSelected,
          }),
        );
        expect(
          elements.items(component)[indexImageSelected].props.style.borderColor,
        ).toEqual(dark.colors.primary);
        expect(
          (
            elements.items(component)[indexImageSelected] as ReactTestInstance
          ).findByType(DotMarker),
        ).not.toBeNull();
        await waitFor(() => {});
      });

      it('should render the "unselected-items" correctly', async () => {
        const indexImageSelected = randomPositiveNumber(images.length - 1);
        const component = render(
          renderThumbsList({
            indexImageSelected,
          }),
        );
        for (let i = 0; i < elements.items(component).length; i++) {
          if (i === indexImageSelected) {
            continue;
          }
          expect(elements.items(component)[i].props.style.borderColor).toEqual(
            'transparent',
          );
          expect(
            (elements.items(component)[i] as ReactTestInstance).findAllByProps({
              testID: 'thumb-dot-marker',
            }),
          ).toEqual([]);
        }
        await waitFor(() => {});
      });
    });

    describe('When the theme is "light"', () => {
      it('should render the "selected-item" correctly', async () => {
        const indexImageSelected = randomPositiveNumber(images.length - 1);
        const component = render(
          renderThumbsList({
            indexImageSelected,
            theme: light,
          }),
        );
        expect(
          elements.items(component)[indexImageSelected].props.style.borderColor,
        ).toEqual(light.colors.buttonText);
        expect(
          (
            elements.items(component)[indexImageSelected] as ReactTestInstance
          ).findByType(DotMarker),
        ).not.toBeNull();
        await waitFor(() => {});
      });

      it('should render the "unselected-items" correctly', async () => {
        const indexImageSelected = randomPositiveNumber(images.length - 1);
        const component = render(
          renderThumbsList({
            indexImageSelected,
            theme: light,
          }),
        );
        for (let i = 0; i < elements.items(component).length; i++) {
          if (i === indexImageSelected) {
            continue;
          }
          expect(elements.items(component)[i].props.style.borderColor).toEqual(
            'transparent',
          );
          expect(
            (elements.items(component)[i] as ReactTestInstance).findAllByProps({
              testID: 'thumb-dot-marker',
            }),
          ).toEqual([]);
        }
        await waitFor(() => {});
      });
    });
  });

  describe('Pressing the items', () => {
    it('should call "onPressThumbListItem" correctly', async () => {
      const onPressThumbListItem = jest.fn();
      const indexImageSelected = randomPositiveNumber(images.length - 1);
      const component = render(
        renderThumbsList({
          onPressThumbListItem,
          indexImageSelected,
        }),
      );
      expect(onPressThumbListItem).toBeCalledTimes(0);
      fireEvent.press(elements.items(component)[indexImageSelected]);
      expect(onPressThumbListItem).toBeCalledTimes(1);
      expect(onPressThumbListItem).toBeCalledWith(indexImageSelected);
      await waitFor(() => {});
    });
  });
});
