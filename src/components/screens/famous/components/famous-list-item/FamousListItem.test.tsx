jest.unmock('react-native-reanimated');
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  RenderAPI,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualitiesProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';

import {FamousListItem} from './FamousListItem';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const TITLE = 'TITLE';

const renderFamousListItem = (
  image?: string,
  onPress = jest.fn(),
  index = randomPositiveNumber(10),
) => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={theme}>
      <FamousListItem
        onPress={onPress}
        image={image}
        title={TITLE}
        index={index}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

describe('<FamousListItem />', () => {
  const elements = {
    famousListItemButton: (api: RenderAPI) =>
      api.queryByTestId('famous-list-item-button'),
    tmdbImage: (api: RenderAPI) => api.queryByTestId('famous-list-item-image'),
    fallbackWrapper: (api: RenderAPI) =>
      api.queryByTestId('famous-list-item-image-tmdb-fallback-image'),
    imageOffIcon: (api: RenderAPI) => api.queryByTestId('icon-image-off'),
    accountIcon: (api: RenderAPI) => api.queryByTestId('icon-account'),
    titleText: (api: RenderAPI) => api.queryByTestId('title-text'),
  };

  afterEach(cleanup);

  describe('Renders correctly', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should render correctly the "Loading-state" when is loading the image', async () => {
      const component = render(renderFamousListItem('SOME_IMAGE_URI'));
      expect(elements.titleText(component)).not.toBeNull();
      expect(elements.titleText(component).children[0]).toEqual(TITLE);
      expect(elements.fallbackWrapper(component)).not.toBeNull();
      expect(elements.accountIcon(component)).not.toBeNull();
      expect(elements.imageOffIcon(component)).toBeNull();
    });

    it('should render correctly when the image is loaded after a rerender', async () => {
      const component = render(renderFamousListItem('SOME_IMAGE_URI'));
      component.rerender(renderFamousListItem('SOME_IMAGE_URI'));
      fireEvent(elements.tmdbImage(component), 'onLoad');
      expect(elements.titleText(component)).not.toBeNull();
      expect(elements.titleText(component).children[0]).toEqual(TITLE);
      expect(elements.fallbackWrapper(component)).toBeNull();
      expect(elements.accountIcon(component)).toBeNull();
      expect(elements.imageOffIcon(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when the image is loaded', async () => {
      const component = render(renderFamousListItem('SOME_IMAGE_URI'));
      fireEvent(elements.tmdbImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.titleText(component)).not.toBeNull();
      expect(elements.titleText(component).children[0]).toEqual(TITLE);
      expect(elements.fallbackWrapper(component)).toBeNull();
      expect(elements.accountIcon(component)).toBeNull();
      expect(elements.imageOffIcon(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly the "Error-state" when had some "error" during the "image-loading"', async () => {
      const component = render(renderFamousListItem('SOME_IMAGE_URI'));
      fireEvent(elements.tmdbImage(component), 'onError');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.titleText(component)).not.toBeNull();
      expect(elements.titleText(component).children[0]).toEqual(TITLE);
      expect(elements.fallbackWrapper(component)).not.toBeNull();
      expect(elements.imageOffIcon(component)).not.toBeNull();
      expect(elements.accountIcon(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly the "Error-state" when has no "image"', async () => {
      const component = render(renderFamousListItem());
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.titleText(component)).not.toBeNull();
      expect(elements.titleText(component).children[0]).toEqual(TITLE);
      expect(elements.fallbackWrapper(component)).not.toBeNull();
      expect(elements.imageOffIcon(component)).not.toBeNull();
      expect(elements.accountIcon(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Pressing the item', () => {
    it('should call the "onPress" when the user press the "Wrapper-button"', async () => {
      const onPress = jest.fn();
      const component = render(renderFamousListItem('SOME_IMAGE', onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.famousListItemButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });
  });
});