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

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';

import FamousListItem from './FamousListItem';

const TITLE = 'TITLE';

const renderFamousListItem = (
  image?: string,
  onPress = jest.fn(),
  index = randomPositiveNumber(10),
) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <FamousListItem
        onPress={onPress}
        image={image}
        title={TITLE}
        index={index}
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<FamousListItem />', () => {
  const elements = {
    famousListItemButton: (api: RenderAPI) =>
      api.queryByTestId('famous-list-item-button'),
    tmdbImage: (api: RenderAPI) => api.queryByTestId('famous-list-item-image'),
    fallbackWrapper: (api: RenderAPI) =>
      api.queryByTestId('fallback-image-wrapper'),
    imageOffIcon: (api: RenderAPI) => api.queryByTestId('icon-image-off'),
    accountIcon: (api: RenderAPI) => api.queryByTestId('icon-account'),
    titleText: (api: RenderAPI) => api.queryByTestId('title-text'),
  };

  afterEach(cleanup);

  describe('Render correctly', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should render correctly the "Loading-state" when is loading the image', async () => {
      const component = render(renderFamousListItem('SOME_IMAGE_URI'));
      await waitFor(() => {
        expect(elements.titleText(component)).not.toBeNull();
        expect(elements.titleText(component).children[0]).toEqual(TITLE);
        expect(elements.fallbackWrapper(component)).not.toBeNull();
        expect(elements.accountIcon(component)).not.toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
      });
    });

    it('should render correctly when the image is loaded after a rerender', async () => {
      const component = render(renderFamousListItem('SOME_IMAGE_URI'));
      component.rerender(renderFamousListItem('SOME_IMAGE_URI'));
      fireEvent(elements.tmdbImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.titleText(component)).not.toBeNull();
        expect(elements.titleText(component).children[0]).toEqual(TITLE);
        expect(elements.fallbackWrapper(component)).toBeNull();
        expect(elements.accountIcon(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
      });
    });

    it('should render correctly when the image is loaded', async () => {
      const component = render(renderFamousListItem('SOME_IMAGE_URI'));
      fireEvent(elements.tmdbImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.titleText(component)).not.toBeNull();
        expect(elements.titleText(component).children[0]).toEqual(TITLE);
        expect(elements.fallbackWrapper(component)).toBeNull();
        expect(elements.accountIcon(component)).toBeNull();
        expect(elements.imageOffIcon(component)).toBeNull();
      });
    });

    it('should render correctly the "Error-state" when had some error during the image-loading', async () => {
      const component = render(renderFamousListItem('SOME_IMAGE_URI'));
      fireEvent(elements.tmdbImage(component), 'onError');
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.titleText(component)).not.toBeNull();
        expect(elements.titleText(component).children[0]).toEqual(TITLE);
        expect(elements.fallbackWrapper(component)).not.toBeNull();
        expect(elements.imageOffIcon(component)).not.toBeNull();
        expect(elements.accountIcon(component)).toBeNull();
      });
    });

    it('should render correctly the "Error-state" when has no "image"', async () => {
      const component = render(renderFamousListItem());
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.titleText(component)).not.toBeNull();
        expect(elements.titleText(component).children[0]).toEqual(TITLE);
        expect(elements.fallbackWrapper(component)).not.toBeNull();
        expect(elements.imageOffIcon(component)).not.toBeNull();
        expect(elements.accountIcon(component)).toBeNull();
      });
    });
  });

  describe('Press the wrapper', () => {
    it('should call the "onPress" when the user press the "Wrapper-button"', async () => {
      const onPress = jest.fn();
      const component = render(renderFamousListItem('SOME_IMAGE', onPress));
      await waitFor(() => {
        expect(onPress).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.famousListItemButton(component));
        expect(onPress).toHaveBeenCalledTimes(1);
      });
    });
  });
});
