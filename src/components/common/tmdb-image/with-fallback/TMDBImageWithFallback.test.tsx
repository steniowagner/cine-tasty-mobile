jest.unmock('react-native-reanimated');
import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {
  RenderAPI,
  render,
  waitFor,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react-native';

import {TMDBImageQualitiesProvider} from '@providers';
import {dark as theme} from '@styles/themes';
import {ImageType} from '@local-types';

import * as Styles from './TMDBImageWithFallback.styles';
import {TMDBImageWithFallback} from './TMDBImageWithFallback';
import {Icons} from '../../svg-icon';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const ICON_IMAGE_LOADING: Icons = 'account';
const ICON_IMAGE_ERROR: Icons = 'alert-box';
const IMAGE_TYPE: ImageType = 'backdrop';
const TEST_ID = 'TEST_ID';
const ICON_SIZE = 21;
const IMAGE = 'IMAGE';
const style = {
  width: 21,
  height: 21,
  borderRadius: 21,
};

const renderTMDBImageWithFallback = () => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualitiesProvider>
      <TMDBImageWithFallback
        iconImageLoading={ICON_IMAGE_LOADING}
        iconImageError={ICON_IMAGE_ERROR}
        imageType={IMAGE_TYPE}
        style={style}
        iconSize={ICON_SIZE}
        image={IMAGE}
        testID={TEST_ID}
      />
    </TMDBImageQualitiesProvider>
  </ThemeProvider>
);

describe('<TMDBImageWithFallback />', () => {
  const elements = {
    tmdbImage: (api: RenderAPI) => api.queryByTestId(TEST_ID),
    tmdbImageWithFallback: (api: RenderAPI) =>
      api.queryByTestId(`${TEST_ID}-tmdb-fallback-image`),
    loadingImageIcon: (api: RenderAPI) =>
      api.queryByTestId(`icon-${ICON_IMAGE_LOADING}`),
    errorImageIcon: (api: RenderAPI) =>
      api.queryByTestId(`icon-${ICON_IMAGE_ERROR}`),
  };

  describe('When the image is loading', () => {
    afterEach(cleanup);

    it('should render correctly', async () => {
      const component = render(renderTMDBImageWithFallback());
      expect(elements.tmdbImage(component)).not.toBeNull();
      expect(elements.tmdbImageWithFallback(component)).not.toBeNull();
      expect(elements.loadingImageIcon(component)).not.toBeNull();
      expect(elements.errorImageIcon(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should render the Fallback-component with the correct style', async () => {
      const component = render(renderTMDBImageWithFallback());
      expect(elements.tmdbImageWithFallback(component).props.style).toEqual({
        width: style.width,
        height: style.height,
        justifyContent: Styles.sheet.fallbackImage.justifyContent,
        alignItems: Styles.sheet.fallbackImage.alignItems,
        position: Styles.sheet.fallbackImage.position,
        opacity: 1,
        borderRadius: style.borderRadius,
        backgroundColor: theme.colors.fallbackImageBackground,
      });
      await waitFor(() => {});
    });

    it('should render the TMDBImage-component with the correct style', async () => {
      const component = render(renderTMDBImageWithFallback());
      expect(elements.tmdbImage(component).props.style).toEqual(style);
      await waitFor(() => {});
    });
  });

  describe('When the image is loaded', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render correctly', async () => {
      const component = render(renderTMDBImageWithFallback());
      fireEvent(elements.tmdbImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.tmdbImage(component)).not.toBeNull();
      expect(elements.tmdbImageWithFallback(component)).toBeNull();
      expect(elements.loadingImageIcon(component)).toBeNull();
      expect(elements.errorImageIcon(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should render the TMDBImage-component with the correct style', async () => {
      const component = render(renderTMDBImageWithFallback());
      fireEvent(elements.tmdbImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.tmdbImage(component).props.style).toEqual(style);
      await waitFor(() => {});
    });
  });

  describe('When some error happens during the image-loading', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render correctly', async () => {
      const component = render(renderTMDBImageWithFallback());
      fireEvent(elements.tmdbImage(component), 'onError');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.tmdbImage(component)).not.toBeNull();
      expect(elements.tmdbImageWithFallback(component)).not.toBeNull();
      expect(elements.loadingImageIcon(component)).toBeNull();
      expect(elements.errorImageIcon(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render the Fallback-component with the correct style', async () => {
      const component = render(renderTMDBImageWithFallback());
      fireEvent(elements.tmdbImage(component), 'onError');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.tmdbImageWithFallback(component).props.style).toEqual({
        width: style.width,
        height: style.height,
        justifyContent: Styles.sheet.fallbackImage.justifyContent,
        alignItems: Styles.sheet.fallbackImage.alignItems,
        position: Styles.sheet.fallbackImage.position,
        opacity: 1,
        borderRadius: style.borderRadius,
        backgroundColor: theme.colors.fallbackImageBackground,
      });
      await waitFor(() => {});
    });

    it('should render the TMDBImage-component with the correct style', async () => {
      const component = render(renderTMDBImageWithFallback());
      fireEvent(elements.tmdbImage(component), 'onError');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.tmdbImage(component).props.style).toEqual(style);
      await waitFor(() => {});
    });
  });
});
