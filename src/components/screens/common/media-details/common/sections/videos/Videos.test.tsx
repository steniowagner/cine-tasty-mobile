import React from 'react';
import {Linking} from 'react-native';
import {RenderAPI, render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {randomPositiveNumber} from '@mocks/utils';
import {dark} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

jest.spyOn(Linking, 'openURL');

import {YOUTUBE_BASE_URL} from './useVideos';
import {Videos, Video} from './Videos';

const videos = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'MediaVideo',
      thumbnail: {
        extraSmall: 'EXTRA_SMALL_THUMBNAIL',
      },
      key: `KEY_${index}`,
      id: `ID_${index}`,
    })) as Video[];

const renderVideos = (dataset: Video[]) => (
  <ThemeProvider theme={dark}>
    <Videos videos={dataset} />
  </ThemeProvider>
);

describe('<Videos />', () => {
  const elements = {
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    videoButtons: (api: RenderAPI) => api.queryAllByTestId('video-button'),
    playIcon: (api: RenderAPI) => api.queryAllByTestId('icon-play-circle'),
    list: (api: RenderAPI) => api.queryByTestId('videos-list'),
  };

  describe('Renders correctly', () => {
    it('should render correctly when it has some data to show', () => {
      const length = randomPositiveNumber(10, 1);
      const videosDataset = videos(length);
      const component = render(renderVideos(videosDataset));
      expect(elements.sectionTitle(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_VIDEOS,
      );
      expect(elements.list(component)).not.toBeNull();
      expect(elements.playIcon(component).length).toEqual(length);
      expect(elements.videoButtons(component).length).toEqual(length);
    });

    it('should render correctly when it has no data to show', () => {
      const component = render(renderVideos([]));
      expect(elements.sectionTitle(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_SECTIONS_VIDEOS,
      );
      expect(elements.list(component)).not.toBeNull();
      expect(elements.playIcon(component).length).toEqual(0);
      expect(elements.videoButtons(component).length).toEqual(0);
    });
  });

  describe('Pressing the items', () => {
    it('should call "Linking.openURL" correctly when the user press some "video-item"', () => {
      const length = randomPositiveNumber(10, 1);
      const itemSelected = randomPositiveNumber(length - 1, 0);
      const videosDataset = videos(length);
      const component = render(renderVideos(videosDataset));
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.videoButtons(component)[itemSelected]);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
      expect(Linking.openURL).toHaveBeenCalledWith(
        `${YOUTUBE_BASE_URL}${videosDataset[itemSelected].key}`,
      );
    });
  });
});
