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
import {CONSTANTS} from '@utils';

import {TMDBImageAnimated} from './TMDBImageAnimated';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

type RenderTMDBImageAnimatedProps = {
  onLoad?: jest.Mock;
  onError?: jest.Mock;
  blurRadius?: number;
  isThumbnail?: boolean;
};

const IMAGE_TYPE: ImageType = 'backdrop';
const TEST_ID = 'TEST_ID';
const IMAGE = '/IMAGE';
const style = {
  width: 21,
  height: 21,
  borderRadius: 21,
};

const renderTMDBImageAnimated = (props: RenderTMDBImageAnimatedProps) => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualitiesProvider>
      <TMDBImageAnimated
        blurRadius={props.blurRadius}
        onLoad={props.onLoad}
        onError={props.onError}
        imageType={IMAGE_TYPE}
        isThumbnail={props.isThumbnail}
        style={style}
        image={IMAGE}
        testID={TEST_ID}
      />
    </TMDBImageQualitiesProvider>
  </ThemeProvider>
);

describe('<TMDBImageAnimated />', () => {
  const elements = {
    tmdbImageAnimated: (api: RenderAPI) => api.queryByTestId(TEST_ID),
  };

  describe('Calling the event-handlers', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should call "onLoad" when the image is loaded', async () => {
      const onLoad = jest.fn();
      const component = render(renderTMDBImageAnimated({onLoad}));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(onLoad).toHaveBeenCalledTimes(0);
      fireEvent(elements.tmdbImageAnimated(component), 'onLoad');
      expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it('should call "onError" when some error happens during the image-load', async () => {
      const onError = jest.fn();
      const component = render(renderTMDBImageAnimated({onError}));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(onError).toHaveBeenCalledTimes(0);
      fireEvent(elements.tmdbImageAnimated(component), 'onError');
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });

  describe('When "isThumbnail" is "true"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should have the correct "uri"', async () => {
      const component = render(renderTMDBImageAnimated({isThumbnail: true}));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(elements.tmdbImageAnimated(component).props.source.uri).toEqual(
        `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}${IMAGE}`,
      );
    });
  });

  describe('When "isThumbnail" is "false"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should have the correct "uri"', async () => {
      const component = render(renderTMDBImageAnimated({isThumbnail: false}));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(elements.tmdbImageAnimated(component).props.source.uri).toEqual(
        `${CONSTANTS.VALUES.IMAGES.BASE_URL}/w300${IMAGE}`,
      );
    });
  });

  describe('Styles', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render with the correct "styles"', async () => {
      const blurRadius = 1;
      const component = render(renderTMDBImageAnimated({blurRadius}));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(elements.tmdbImageAnimated(component).props.style).toEqual(style);
    });

    it('should render with the correct "resize-mode"', async () => {
      const component = render(renderTMDBImageAnimated({}));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(elements.tmdbImageAnimated(component).props.resizeMode).toEqual(
        'cover',
      );
    });

    it('should render with the correct "blurRadius" whe it is set', async () => {
      const blurRadius = 1;
      const component = render(renderTMDBImageAnimated({blurRadius}));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(elements.tmdbImageAnimated(component).props.blurRadius).toEqual(
        blurRadius,
      );
    });

    it('should render with the correct "blurRadius" whe it is not set', async () => {
      const component = render(renderTMDBImageAnimated({}));
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {});
      expect(elements.tmdbImageAnimated(component).props.blurRadius).toEqual(0);
    });
  });
});
