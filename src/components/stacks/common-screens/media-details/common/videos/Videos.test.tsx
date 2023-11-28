import React from 'react';
import { Linking } from 'react-native';
import { RenderAPI, render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark } from '@styles/themes/dark';

import { randomPositiveNumber } from '../../../../../../../__mocks__/utils';
import { YOUTUBE_BASE_URL } from './use-videos';
import { Videos, Video } from './Videos';

jest.spyOn(Linking, 'openURL');

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

describe('Common-screens/Media-Details/Common/Videos', () => {
  const elements = {
    videoButtons: (api: RenderAPI) => api.queryAllByTestId('video-button'),
    list: (api: RenderAPI) => api.queryByTestId('videos-list'),
  };

  it('should render correctly', () => {
    const length = randomPositiveNumber(10, 1);
    const videosDataset = videos(length);
    const component = render(renderVideos(videosDataset));
    expect(elements.list(component)).not.toBeNull();
    expect(elements.videoButtons(component).length).toEqual(length);
  });

  describe('Pressing the items', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call "Linking.openURL" correctly', () => {
      const length = randomPositiveNumber(10, 1);
      const itemSelected = randomPositiveNumber(length - 1, 0);
      const dataset = videos(length);
      const component = render(renderVideos(dataset));
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.videoButtons(component)[itemSelected]);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
      expect(Linking.openURL).toHaveBeenCalledWith(
        `${YOUTUBE_BASE_URL}${dataset[itemSelected].key}`,
      );
    });

    it('should not call "Linking.openURL" when the "video-item" doesnt have the "key" field', () => {
      const dataset = videos(1).map(video => ({
        ...video,
        key: null,
      }));
      const component = render(renderVideos(dataset));
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.videoButtons(component)[0]);
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
    });
  });
});
