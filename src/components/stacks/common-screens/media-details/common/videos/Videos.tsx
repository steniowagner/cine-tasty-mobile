import React from 'react';

import { TVShowDetails_tvShow_videos } from '@schema-types';
import { SVGIcon } from '@common-components';
import metrics from '@/styles/metrics';

import * as Styles from './Videos.styles';
import { useVideos } from './use-videos';

export type Video = TVShowDetails_tvShow_videos;

type VideosProps = {
  videos: Video[];
};

export const Videos = (props: VideosProps) => {
  const videos = useVideos();

  return (
    <Styles.List
      showsHorizontalScrollIndicator={false}
      testID="videos-list"
      horizontal>
      {props.videos.map(
        video =>
          video.thumbnail?.extraSmall && (
            <Styles.VideoListItemWrapper
              onPress={() => videos.onPress(video.key)}
              key={video.key}
              testID="video-button">
              <Styles.Image
                source={{
                  uri: video.thumbnail.extraSmall,
                }}
              />
              <Styles.IconWrapper>
                <SVGIcon size={metrics.xl * 2} id="play-circle" color="white" />
              </Styles.IconWrapper>
            </Styles.VideoListItemWrapper>
          ),
      )}
    </Styles.List>
  );
};
