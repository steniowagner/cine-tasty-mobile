import React from 'react';
import {
  RenderAPI,
  render,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';

import {SimplifiedMediaListItem} from './SimplifiedMediaListItem';

const VOTE_AVERAGE = randomPositiveNumber(10, 1);
const VOTE_COUNT = randomPositiveNumber(10, 1);
const IMAGE = 'IMAGE';
const TITLE = 'TITLE';

const renderSimplifiedMediaListItem = (onPress = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualityProvider>
      <SimplifiedMediaListItem
        voteAverage={VOTE_AVERAGE}
        voteCount={VOTE_COUNT}
        onPress={onPress}
        image={IMAGE}
        title={TITLE}
      />
    </TMDBImageQualityProvider>
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

  beforeEach(() => {
    setupTimeTravel();
  });

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
      fireEvent(elements.image(component), 'onLoad');
      act(() => {
        timeTravel(1000);
      });
      expect(elements.wrapperButton(component)).not.toBeNull();
      expect(elements.imageOffIcon(component)).toBeNull();
      expect(elements.videoVintageIcon(component)).toBeNull();
      expect(elements.fallbackImage(component)).toBeNull();
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

    it('should render correctly when the image had some problem during the load', async () => {
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
      fireEvent(elements.image(component), 'onError');
      act(() => {
        timeTravel(1000);
      });
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
