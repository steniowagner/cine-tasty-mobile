import React from 'react';
import { FlatList, Linking } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';

import SVGIcon from 'components/common/svg-icon/SVGIcon';
import Section from 'components/common/Section';
import {
  TVShowDetail_tvShow_videos as TVShowVideos,
  MovieDetail_movie_videos as MovieVideos,
} from 'types/schema';
import metrics from 'styles/metrics';
import * as T from 'i18n/tags';

import * as S from './videos-styles';

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

type VideosProps = {
  videos: (TVShowVideos | MovieVideos)[];
};

const Videos = ({ videos }: VideosProps) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t(T.VIDEOS_SECTION)}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: metrics.mediumSize,
        }}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <S.VideoListItemWrapper
            onPress={() => Linking.openURL(`${YOUTUBE_BASE_URL}${item.key}`)}
          >
            <FastImage
              source={{
                uri: item.thumbnail.extraSmall,
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: metrics.smallSize,
              }}
            />
            <S.IconWrapper>
              <SVGIcon
                size={metrics.getWidthFromDP('12%')}
                id="play-circle"
                colorThemeRef="white"
              />
            </S.IconWrapper>
          </S.VideoListItemWrapper>
        )}
        testID="videos-list"
        data={videos}
        horizontal
      />
    </Section>
  );
};

export default Videos;
