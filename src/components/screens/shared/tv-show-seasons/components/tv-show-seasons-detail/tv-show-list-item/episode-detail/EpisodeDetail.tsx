/* eslint-disable camelcase */
import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import StarsVotes from '@components/common/stars-votes/StarsVotes';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import { formatDate } from '@utils/formatters';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import CONSTANTS from '@utils/constants';
import metrics from '@styles/metrics';

import * as Styles from './EpisodeDetail.styles';

type EpisodeDetailProps = {
  episode: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes;
};

const EpisodeDetail = (props: EpisodeDetailProps) => {
  const { t } = useTranslation();

  const renderImage = useCallback(() => {
    if (props.episode.stillPath) {
      return (
        <TMDBImage
          image={props.episode.stillPath}
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
      <Styles.EpisodeImageFallback
        testID="episode-image-fallback"
      >
        <SVGIcon
          size={metrics.getWidthFromDP('12%')}
          colorThemeRef="buttonText"
          id="image-off"
        />
      </Styles.EpisodeImageFallback>
    );
  }, [props.episode]);

  return (
    <Styles.Wrapper>
      {renderImage()}
      <ScrollView
        style={{ padding: CONSTANTS.VALUES.DEFAULT_SPACING }}
      >
        <Styles.EpisodeTitleText
          testID="episode-title-text"
        >
          {props.episode.name}
        </Styles.EpisodeTitleText>
        <StarsVotes
          textColor="rgba(0, 0, 0, 0.8)"
          voteCount={props.episode.voteCount}
          votes={props.episode.voteAverage}
          withText
        />
        <Styles.EpisodeAiredText
          testID="air-date-text"
        >
          {`${t(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_AIR_DATE)} ${formatDate(
            props.episode.airDate,
          )}`}
        </Styles.EpisodeAiredText>
        <Styles.EpisodeOverviewText
          testID="overview-text"
        >
          {props.episode.overview}
        </Styles.EpisodeOverviewText>
      </ScrollView>
    </Styles.Wrapper>
  );
};

export default EpisodeDetail;
