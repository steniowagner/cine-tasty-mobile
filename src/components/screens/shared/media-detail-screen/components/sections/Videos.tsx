import React from 'react';
import {
  TouchableOpacity, FlatList, Linking, Image, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Section from 'components/common/Section';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

// const YOUTUBE_BASE_URL = 'https://www.youtube.com/';

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

const Videos = () => {
  const { t } = useTranslation();

  return (
    <Section
      title={t('translations:mediaDetail:sections:videos')}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        // keyExtractor={item}
        renderItem={({ index }) => (
          <VideoListItemWrapper
            onPress={() => Linking.openURL('https://img.youtube.com/vi/FG1EByNnHUU/hqdefault.jpg')}
            isFirst={index === 0}
          >
            <VideoThumbnailImage
              source={{
                uri: 'https://img.youtube.com/vi/FG1EByNnHUU/hqdefault.jpg',
              }}
            />
            <IconWrapper>
              <PlayIcon
                name="play-circle-outline"
              />
            </IconWrapper>
          </VideoListItemWrapper>
        )}
        data={Array(5).fill({})}
      />
    </Section>
  );
};

export default Videos;
