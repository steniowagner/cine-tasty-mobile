import React, {useCallback} from 'react';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';

import StarsVotes from '@components/common/stars-votes/StarsVotes';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';
import {formatDate} from '@utils';

import * as Styles from './EpisodeDetail.styles';

type EpisodeDetailProps = {
  // eslint-disable-next-line camelcase
  episode: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes;
};

const EpisodeDetail = ({episode}: EpisodeDetailProps) => {
  const {t} = useTranslation();

  const renderImage = useCallback(() => {
    if (episode.stillPath) {
      return (
        <TMDBImage
          image={episode.stillPath}
          testID="episode-image"
          imageType="poster"
          style={{
            width: '100%',
            height: metrics.getWidthFromDP('30%'),
          }}
        />
      );
    }

    return (
      <Styles.EpisodeImageFallback testID="episode-image-fallback">
        <SVGIcon
          size={metrics.getWidthFromDP('12%')}
          colorThemeRef="buttonText"
          id="image-off"
        />
      </Styles.EpisodeImageFallback>
    );
  }, [episode]);

  return (
    <Styles.Wrapper>
      <ScrollView bounces={false}>
        {renderImage()}
        <Styles.TextWrapper>
          <Styles.EpisodeTitleText testID="episode-title-text">
            {episode.name}
          </Styles.EpisodeTitleText>
          <StarsVotes
            textColor="rgba(0, 0, 0, 0.8)"
            voteCount={episode.voteCount}
            votes={episode.voteAverage}
            withText
          />
          <Styles.EpisodeAiredText testID="air-date-text">
            {`${t(
              TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_AIR_DATE,
            )} ${formatDate(episode.airDate)}`}
          </Styles.EpisodeAiredText>
          <Styles.EpisodeOverviewText testID="overview-text">
            {episode.overview || '...'}
          </Styles.EpisodeOverviewText>
        </Styles.TextWrapper>
      </ScrollView>
    </Styles.Wrapper>
  );
};

export default EpisodeDetail;
