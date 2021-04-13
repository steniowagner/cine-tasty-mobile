/* eslint-disable camelcase */
import React, { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import StarsVotes from '@components/common/stars-votes/StarsVotes';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import { formatDate } from '@utils/formatters';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import CONSTANTS from '@utils/constants';
import metrics from '@styles/metrics';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('90%')}px;
  max-height: ${({ theme }) => theme.metrics.getHeightFromDP('80%')}px;
  background-color: white;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
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
  color: ${({ theme }) => theme.colors.buttonText};
`;

const EpisodeAiredText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  font-family: CircularStd-Medium;
  color: rgba(0, 0, 0, 0.5);
`;

type Props = {
  episode: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes;
};

const EpisodeDetail = ({ episode }: Props) => {
  const { t } = useTranslation();

  const renderImage = useCallback(() => {
    if (episode.stillPath) {
      return (
        <TMDBImage
          image={episode.stillPath}
          testID="episode-image"
          imageType="still"
          style={{
            width: '100%',
            height: metrics.getWidthFromDP('30%'),
            borderTopLeftRadius: metrics.extraSmallSize,
            borderTopRightRadius: metrics.extraSmallSize,
          }}
        />
      );
    }

    return (
      <EpisodeImageFallback
        testID="episode-image-fallback"
      >
        <SVGIcon
          size={metrics.getWidthFromDP('12%')}
          colorThemeRef="buttonText"
          id="image-off"
        />
      </EpisodeImageFallback>
    );
  }, [episode]);

  return (
    <Wrapper>
      {renderImage()}
      <ScrollView
        style={{ padding: CONSTANTS.VALUES.DEFAULT_SPACING }}
      >
        <EpisodeTitleText
          testID="episode-title-text"
        >
          {episode.name}
        </EpisodeTitleText>
        <StarsVotes
          textColor="rgba(0, 0, 0, 0.8)"
          voteCount={episode.voteCount}
          votes={episode.voteAverage}
          withText
        />
        <EpisodeAiredText
          testID="air-date-text"
        >
          {`${t(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_AIR_DATE)} ${formatDate(
            episode.airDate,
          )}`}
        </EpisodeAiredText>
        <EpisodeOverviewText
          testID="overview-text"
        >
          {episode.overview}
        </EpisodeOverviewText>
      </ScrollView>
    </Wrapper>
  );
};

export default EpisodeDetail;
