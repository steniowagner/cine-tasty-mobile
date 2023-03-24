import React from 'react';

import {ScrollViewSection, Section} from '@components';
import * as SchemaTypes from '@schema-types';

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
              <Styles.PlayVideoIcon />
            </Styles.IconWrapper>
          </Styles.VideoListItemWrapper>
        ))}
      </ScrollViewSection>
    </Section>
  );
};
