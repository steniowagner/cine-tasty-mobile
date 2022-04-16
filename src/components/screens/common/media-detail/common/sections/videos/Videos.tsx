import React from 'react';

import {ScrollViewSection, SVGIcon, Section} from '@components';
import * as SchemaTypes from '@schema-types';
import metrics from '@styles/metrics';

import * as Styles from './Videos.styles';
import {useVideos} from './useVideos';

export type Video =
  | SchemaTypes.TVShowDetail_tvShow_videos
  | SchemaTypes.MovieDetail_movie_videos;

type VideosProps = {
  videos: Video[];
};

export const Videos = (props: VideosProps) => {
  const videos = useVideos();
  return (
    <Section title={videos.texts.section}>
      <ScrollViewSection
        showsHorizontalScrollIndicator={false}
        testID="videos-list"
        horizontal>
        {props.videos.map(video => (
          <Styles.VideoListItemWrapper
            onPress={() => videos.onPressVideo(video.key)}
            key={video.key}
            testID="video-button">
            <Styles.Image
              source={{
                uri: video.thumbnail.extraSmall,
              }}
            />
            <Styles.IconWrapper>
              <SVGIcon
                size={metrics.getWidthFromDP('12%')}
                id="play-circle"
                colorThemeRef="white"
              />
            </Styles.IconWrapper>
          </Styles.VideoListItemWrapper>
        ))}
      </ScrollViewSection>
    </Section>
  );
};
