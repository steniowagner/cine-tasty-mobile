jest.unmock('react-native-reanimated');
import React from 'react';
import {
  RenderAPI,
  render,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';
import metrics from '@styles/metrics';

import {SimplifiedMediaListItem} from './SimplifiedMediaListItem';
import * as Styles from './SimplifiedMediaListItem.styles';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const VOTE_AVERAGE = randomPositiveNumber(10, 1);
const VOTE_COUNT = randomPositiveNumber(10, 1);
const IMAGE = 'IMAGE';
const TITLE = 'TITLE';

const renderSimplifiedMediaListItem = (
  onPress = jest.fn(),
  withLargeLayout = false,
) => (
  <ThemeProvider theme={theme}>
    <SimplifiedMediaListItem
      withLargeLayout={withLargeLayout}
      voteAverage={VOTE_AVERAGE}
      voteCount={VOTE_COUNT}
      onPress={onPress}
      image={IMAGE}
      title={TITLE}
    />
  </ThemeProvider>
);

describe('<SimplifiedMediaListItem />', () => {
  const elements = {
    wrapperButton: (api: RenderAPI) =>
      api.queryByTestId('simplified-media-list-button'),
    image: (api: RenderAPI) => api.queryByTestId('simplified-media-list-image'),
    fallbackImage: (api: RenderAPI) =>
      api.queryByTestId('fallback-image-wrapper'),
    imageOffIcon: (api: RenderAPI) => api.queryByTestId('icon-image-off'),
    starIcon: (api: RenderAPI) => api.queryByTestId('icon-star-full'),
    videoVintageIcon: (api: RenderAPI) =>
      api.queryByTestId('icon-video-vintage'),
    title: (api: RenderAPI) => api.queryByTestId('simplified-media-list-title'),
    votes: (api: RenderAPI) => api.queryByTestId('simplified-media-list-votes'),
  };

  describe('Renders correctly', () => {
    it('should render correctly', async () => {
      const component = render(renderSimplifiedMediaListItem());
      expect(elements.wrapperButton(component)).not.toBeNull();
      expect(elements.imageOffIcon(component)).toBeNull();
      expect(elements.videoVintageIcon(component)).not.toBeNull();
      expect(elements.fallbackImage(component)).not.toBeNull();
      expect(elements.image(component)).not.toBeNull();
      expect(elements.title(component)).not.toBeNull();
      expect(elements.title(component).children[0]).toEqual(TITLE);
      expect(elements.starIcon(component)).not.toBeNull();
      expect(elements.votes(component)).not.toBeNull();
      expect(elements.votes(component).children[0]).toEqual(
        `${VOTE_AVERAGE.toFixed(1)} (${VOTE_COUNT})`,
      );
      await waitFor(() => {});
    });

    it('should render correctly when the image loads', async () => {
      const component = render(renderSimplifiedMediaListItem());
      fireEvent(elements.image(component), 'onLoad');
      expect(elements.title(component)).not.toBeNull();
      expect(elements.starIcon(component)).not.toBeNull();
      expect(elements.votes(component).children[0]).toEqual(
        `${VOTE_AVERAGE.toFixed(1)} (${VOTE_COUNT})`,
      );
      expect(elements.fallbackImage(component)).toBeNull();
      expect(elements.imageOffIcon(component)).toBeNull();
      expect(elements.videoVintageIcon(component)).toBeNull();
      expect(elements.image(component)).not.toBeNull();
      expect(elements.title(component).children[0]).toEqual(TITLE);
      await waitFor(() => {});
    });

    it('should render correctly when the image had some problem during the load', async () => {
      const component = render(renderSimplifiedMediaListItem());
      fireEvent(elements.image(component), 'onError');
      expect(elements.wrapperButton(component)).not.toBeNull();
      expect(elements.imageOffIcon(component)).not.toBeNull();
      expect(elements.videoVintageIcon(component)).toBeNull();
      expect(elements.fallbackImage(component)).not.toBeNull();
      expect(elements.image(component)).not.toBeNull();
      expect(elements.title(component)).not.toBeNull();
      expect(elements.title(component).children[0]).toEqual(TITLE);
      expect(elements.starIcon(component)).not.toBeNull();
      expect(elements.votes(component)).not.toBeNull();
      expect(elements.votes(component).children[0]).toEqual(
        `${VOTE_AVERAGE.toFixed(1)} (${VOTE_COUNT})`,
      );
      await waitFor(() => {});
    });

    it('should render with the large-layout when the "withLargeLayout" is "true"', async () => {
      const component = render(renderSimplifiedMediaListItem(jest.fn(), true));
      expect(elements.wrapperButton(component).props.style.width).toEqual(
        metrics.getWidthFromDP(Styles.WRAPPER_LARGE_WIDTH),
      );
      expect(elements.wrapperButton(component).props.style.height).toEqual(
        '100%',
      );
      expect(elements.fallbackImage(component).props.style[0].width).toEqual(
        '100%',
      );
      expect(elements.fallbackImage(component).props.style[0].height).toEqual(
        metrics.getWidthFromDP(Styles.WRAPPER_LARGE_HEIGHT),
      );
      expect(elements.image(component).props.style[0].width).toEqual('100%');
      expect(elements.image(component).props.style[0].height).toEqual(
        metrics.getWidthFromDP(Styles.WRAPPER_LARGE_HEIGHT),
      );
      expect(elements.title(component)).not.toBeNull();
      expect(elements.title(component).props.style[0].fontSize).toEqual(
        metrics.extraLargeSize,
      );
      expect(elements.votes(component)).not.toBeNull();
      expect(elements.votes(component).props.style[0].fontSize).toEqual(
        metrics.extraLargeSize,
      );
      await waitFor(() => {});
    });

    it('should render with the default-layout when the "withLargeLayout" is "false"', async () => {
      const component = render(renderSimplifiedMediaListItem(jest.fn(), false));
      expect(elements.wrapperButton(component).props.style.width).toEqual(
        metrics.getWidthFromDP(Styles.WRAPPER_DEFAULT_WIDTH),
      );
      expect(elements.wrapperButton(component).props.style.height).toEqual(
        '100%',
      );
      expect(elements.fallbackImage(component).props.style[0].height).toEqual(
        metrics.getWidthFromDP(Styles.WRAPPER_DEFAULT_HEIGHT),
      );
      expect(elements.fallbackImage(component).props.style[0].width).toEqual(
        '100%',
      );
      expect(elements.image(component).props.style[0].width).toEqual('100%');
      expect(elements.image(component).props.style[0].height).toEqual(
        metrics.getWidthFromDP(Styles.WRAPPER_DEFAULT_HEIGHT),
      );
      expect(elements.title(component)).not.toBeNull();
      expect(elements.title(component).props.style[0].fontSize).toEqual(
        metrics.largeSize,
      );
      expect(elements.votes(component)).not.toBeNull();
      expect(elements.votes(component).props.style[0].fontSize).toEqual(
        metrics.largeSize,
      );
      await waitFor(() => {});
    });
  });

  describe('Presses correctly', () => {
    it('should call "onPress" when the user presses the item', async () => {
      const onPress = jest.fn();
      const component = render(renderSimplifiedMediaListItem(onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.wrapperButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });
  });
});
