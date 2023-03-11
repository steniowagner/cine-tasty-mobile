jest.unmock('react-native-reanimated');
import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualitiesProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {dark as theme} from '@styles/themes/dark';
import {randomPositiveNumber} from '@mocks/utils';

import {ThumbsGalleryList} from './ThumbsGalleryList';

const renderThumbsGalleryList = (
  thumbs = [],
  indexImageSelected = 0,
  onPressThumbListItem = jest.fn(),
) => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={theme}>
      <ThumbsGalleryList
        onPressThumbListItem={onPressThumbListItem}
        indexImageSelected={indexImageSelected}
        thumbs={thumbs}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

describe('<ThumbsGalleryList />', () => {
  const elements = {
    thumbsList: (api: RenderAPI) => api.queryByTestId('thumbs-gallery-list'),
    thumbsItems: (api: RenderAPI) => api.queryAllByTestId('thumb-list-item'),
  };

  describe('Renders correctly', () => {
    it('should show all items correctly when there is some thumbs to be shown', async () => {
      const thumbs = Array(randomPositiveNumber(10, 1))
        .fill('')
        .map((_, index) => `THUMB_${index}`);
      const indexSelected = randomPositiveNumber(thumbs.length - 1, 0);
      const component = render(renderThumbsGalleryList(thumbs, indexSelected));
      expect(elements.thumbsList(component)).not.toBeNull();
      expect(elements.thumbsItems(component).length).toEqual(thumbs.length);
      await waitFor(() => {});
    });

    it('should render correctly when there is no thumbs to be shown', async () => {
      const component = render(renderThumbsGalleryList());
      expect(elements.thumbsList(component)).not.toBeNull();
      expect(elements.thumbsItems(component).length).toEqual(0);
      await waitFor(() => {});
    });
  });

  describe('Pressing list-items', () => {
    it('should call "onPressThumbListItem" when the user press the selected item', async () => {
      const onPressThumbListItem = jest.fn();
      const thumbs = Array(randomPositiveNumber(10, 1))
        .fill('')
        .map((_, index) => `THUMB_${index}`);
      const indexSelected = randomPositiveNumber(thumbs.length - 1, 0);
      const component = render(
        renderThumbsGalleryList(thumbs, indexSelected, onPressThumbListItem),
      );
      expect(onPressThumbListItem).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.thumbsItems(component)[indexSelected]);
      expect(onPressThumbListItem).toHaveBeenCalledTimes(1);
      expect(onPressThumbListItem).toHaveBeenCalledWith(indexSelected);
      await waitFor(() => {});
    });

    it('should call "onPressThumbListItem" when the user press some unselected item', async () => {
      const onPressThumbListItem = jest.fn();
      const thumbs = Array(randomPositiveNumber(10, 2))
        .fill('')
        .map((_, index) => `THUMB_${index}`);
      const indexItemSelected = randomPositiveNumber(thumbs.length - 1, 0);
      const component = render(
        renderThumbsGalleryList(thumbs, 0, onPressThumbListItem),
      );
      expect(onPressThumbListItem).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.thumbsItems(component)[indexItemSelected]);
      expect(onPressThumbListItem).toHaveBeenCalledTimes(1);
      expect(onPressThumbListItem).toHaveBeenCalledWith(indexItemSelected);
      await waitFor(() => {});
    });
  });
});
