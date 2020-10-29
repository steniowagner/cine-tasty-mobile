import React from 'react';
import {
  ScrollView, Image, Text, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { TVShowSeasonsDetail_tvShowSeason_episodes as Episode } from 'types/schema';
import StarsVotes from 'components/common/stars-votes/StarsVotes';
import { formatDate } from 'utils/formatters';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

const MEDIA_IMAGE_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.MEDIA_POSTER_SIZE_CODE}`;

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('90%')}px;
  max-height: ${({ theme }) => theme.metrics.getHeightFromDP('80%')}px;
  background-color: white;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const EpisodeImage = styled(Image)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
  border-top-left-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const EpisodeImageFallback = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const EpisodeTitleText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.buttonText};
  font-family: CircularStd-Black;
`;

const EpisodeOverviewText = styled(Text)`
  padding-bottom: ${CONSTANTS.VALUES.DEFAULT_SPACING * 2}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  font-family: CircularStd-Medium;
  color: rgba(0, 0, 0, 0.5);
`;

const EpisodeAiredText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.buttonText};
`;

const ImageOffIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('12%'),
  color: theme.colors.buttonText,
  name: 'image-off',
}))``;

type Props = {
  episode: Episode;
};

const EpisodeDetail = ({ episode }: Props) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {episode.stillPath ? (
        <EpisodeImage
          source={{
            uri: `${MEDIA_IMAGE_URI}${episode.stillPath}`,
          }}
        />
      ) : (
        <EpisodeImageFallback>
          <ImageOffIcon />
        </EpisodeImageFallback>
      )}
      <ScrollView
        style={{ padding: CONSTANTS.VALUES.DEFAULT_SPACING }}
      >
        <EpisodeTitleText>{episode.name}</EpisodeTitleText>
        <StarsVotes
          voteCount={episode.voteCount}
          votes={episode.voteAverage}
          textColor="rgba(0, 0, 0, 0.8)"
          withText
        />
        <EpisodeAiredText>
          {`${t('translations:mediaDetail:tvShow:seasonEpisode:airDate')} ${formatDate(
            episode.airDate,
          )}`}
        </EpisodeAiredText>
        <EpisodeOverviewText>{episode.overview}</EpisodeOverviewText>
      </ScrollView>
    </Wrapper>
  );
};

export default EpisodeDetail;
