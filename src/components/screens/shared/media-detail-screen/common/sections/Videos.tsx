import React from 'react';
import {
  TouchableOpacity, FlatList, Linking, Image, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import SVGIcon from 'components/common/svg-icon/SVGIcon';
import Section from 'components/common/Section';
import {
  TVShowDetail_tvShow_videos as TVShowVideos,
  MovieDetail_movie_videos as MovieVideos,
} from 'types/schema';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

export const SECTION_TITLE_I18N_REF = 'translations:mediaDetail:sections:videos';

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

interface VideoListItemWrapperStyleProps {
  readonly isFirst: boolean;
}

const VideoListItemWrapper = styled(TouchableOpacity)<VideoListItemWrapperStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('48%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('36%')}px;
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
              <SVGIcon
                size={metrics.getWidthFromDP('12%')}
                id="play-circle"
                colorThemeRef="white"
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
