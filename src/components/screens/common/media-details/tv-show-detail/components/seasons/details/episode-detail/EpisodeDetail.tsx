import React from 'react';
import {ScrollView} from 'react-native';

import {TMDBImageWithFallback, StarsVotes} from '@components';
import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {formatDate} from '@utils';
import {useTranslations} from '@hooks';

import * as Styles from './EpisodeDetail.styles';

type EpisodeDetailProps = {
  episode: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes;
};

export const EpisodeDetail = (props: EpisodeDetailProps) => {
  const translations = useTranslations();

  return (
    <Styles.Wrapper>
      <ScrollView bounces={false}>
        {props.episode.stillPath && (
          <TMDBImageWithFallback
            imageType="profile"
            testID="profile-image"
            image={props.episode.stillPath}
            style={Styles.sheet.profileImage}
            iconImageLoading="account"
            iconImageError="image-off"
            iconSize={Styles.IMAGE_OFF_ICON_SIZE}
          />
        )}
        <Styles.TextWrapper>
          <Styles.EpisodeTitleText testID="episode-title-text">
            {props.episode.name}
          </Styles.EpisodeTitleText>
          <StarsVotes
            textColor={Styles.DEFAULT_TEXT_COLOR}
            voteCount={props.episode.voteCount}
            votes={props.episode.voteAverage}
            withText
          />
          <Styles.EpisodeAiredText testID="air-date-text">
            {`${translations.translate(
              Translations.Tags.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_AIR_DATE,
            )} ${formatDate(props.episode.airDate)}`}
          </Styles.EpisodeAiredText>
          <Styles.EpisodeOverviewText testID="overview-text">
            {props.episode.overview || '...'}
          </Styles.EpisodeOverviewText>
        </Styles.TextWrapper>
      </ScrollView>
    </Styles.Wrapper>
  );
};
