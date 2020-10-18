import React from 'react';
import {
  TouchableOpacity, FlatList, Linking, Image, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Section from 'components/common/Section';
import {
  TVShowDetail_tvShow_videos as TVShowVideos,
  MovieDetail_movie_videos as MovieVideos,
} from 'types/schema';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

export const SECTION_TITLE_I18N_REF = 'translations:mediaDetail:sections:videos';

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

interface VideoListItemWrapperStyleProps {
  readonly isFirst: boolean;
}

const VideoListItemWrapper = styled(TouchableOpacity)<VideoListItemWrapperStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('36%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('28%')}px;
  margin-left: ${({ isFirst }) => (isFirst ? CONSTANTS.VALUES.DEFAULT_SPACING : 0)}px;
  margin-right: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
`;

const VideoThumbnailImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
`;

const IconWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
`;

const PlayIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('10%'),
  color: 'white',
}))``;

type Props = {
  videos: (TVShowVideos | MovieVideos)[];
};

const Videos = ({ videos }: Props) => {
  const { t } = useTranslation();

  return (
    <Section
      title={t(SECTION_TITLE_I18N_REF)}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ index, item }) => (
          <VideoListItemWrapper
            onPress={() => Linking.openURL(`${YOUTUBE_BASE_URL}${item.key}`)}
            isFirst={index === 0}
          >
            <VideoThumbnailImage
              source={{
                uri: item.thumbnail.extraSmall,
              }}
            />
            <IconWrapper>
              <PlayIcon
                name="play-circle-outline"
              />
            </IconWrapper>
          </VideoListItemWrapper>
        )}
        testID="videos-list"
        data={videos}
        horizontal
      />
    </Section>
  );
};

export default Videos;
