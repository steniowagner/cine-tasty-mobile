jest.unmock('react-native-reanimated');
import React from 'react';
import {
  RenderAPI,
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';

import {MediaListItem} from './MediaListItem';
import * as Styles from './MediaListItem.styles';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const VOTE_AVERAGE = randomPositiveNumber(10, 1);
const VOTE_COUNT = randomPositiveNumber(10, 1);
const IMAGE = 'IMAGE';
const TITLE = 'TITLE';

const renderMediaListItem = (
  onPress = jest.fn(),
  layoutSize: Styles.LayoutSize = 'large',
) => (
  <ThemeProvider theme={theme}>
    <MediaListItem
      layoutSize={layoutSize}
      voteAverage={VOTE_AVERAGE}
      voteCount={VOTE_COUNT}
      onPress={onPress}
      image={IMAGE}
      title={TITLE}
    />
  </ThemeProvider>
);

describe('<MediaListItem />', () => {
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
    describe('When "layoutSize" is "large"', () => {
      it('should render with the correct measures', async () => {
        const component = render(renderMediaListItem());
        expect(elements.wrapperButton(component).props.style.width).toEqual(
          Styles.LAYOUT_MEASURES.large.width,
        );
        expect(elements.wrapperButton(component).props.style.height).toEqual(
          '100%',
        );
        expect(elements.fallbackImage(component).props.style[0].width).toEqual(
          '100%',
        );
        expect(elements.fallbackImage(component).props.style[0].height).toEqual(
          Styles.LAYOUT_MEASURES.large.height,
        );
        expect(elements.image(component).props.style[0].width).toEqual('100%');
        expect(elements.image(component).props.style[0].height).toEqual(
          Styles.LAYOUT_MEASURES.large.height,
        );
        await waitFor(() => {});
      });

      it('should render correctly', async () => {
        const component = render(renderMediaListItem());
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
        const component = render(renderMediaListItem());
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
        const component = render(renderMediaListItem());
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
    });

    describe('When "layoutSize" is "medium"', () => {
      it('should render with the correct measures', async () => {
        const component = render(renderMediaListItem(jest.fn(), 'medium'));
        expect(elements.wrapperButton(component).props.style.width).toEqual(
          Styles.LAYOUT_MEASURES.medium.width,
        );
        expect(elements.wrapperButton(component).props.style.height).toEqual(
          '100%',
        );
        expect(elements.fallbackImage(component).props.style[0].width).toEqual(
          '100%',
        );
        expect(elements.fallbackImage(component).props.style[0].height).toEqual(
          Styles.LAYOUT_MEASURES.medium.height,
        );
        expect(elements.image(component).props.style[0].width).toEqual('100%');
        expect(elements.image(component).props.style[0].height).toEqual(
          Styles.LAYOUT_MEASURES.medium.height,
        );
        await waitFor(() => {});
      });

      it('should render correctly', async () => {
        const component = render(renderMediaListItem());
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
        const component = render(renderMediaListItem());
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
        const component = render(renderMediaListItem());
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
    });
  });

  describe('Pressing the item', () => {
    it('should call "onPress" when the user presses the item', async () => {
      const onPress = jest.fn();
      const component = render(renderMediaListItem(onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.wrapperButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });
  });
});
