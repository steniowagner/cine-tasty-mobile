import React from 'react';
import { ScrollView } from 'react-native';

import { SVGIcon, TMDBImage, Typography } from '@common-components';

import { TVShowSeasonLoading } from './components/tv-show-season-loading/TVShowSeasonLoading';
import { EpisodeDetailsModal } from './components/episode-details-modal/EpisodeDetailsModal';
import { TVShowSeasonProps } from '../routes/route-params-types';
import { useTVShowSeason } from './use-tv-show-season';
import * as Styles from './TVShowSeason.styles';

export const TVShowSeason = (props: TVShowSeasonProps) => {
  const tvShowSeason = useTVShowSeason(props);

  if (tvShowSeason.isLoading) {
    return <TVShowSeasonLoading />;
  }

  return (
    <>
      <ScrollView>
        <Styles.Header>
          <TMDBImage
            iconImageLoading="video-vintage"
            iconImageError="image-off"
            imageType="poster"
            style={Styles.sheet.headerImage}
            iconSize={Styles.IMAGE_LOADING_ICON_SIZE}
            image={tvShowSeason.season?.posterPath || ''}
            testID="image-list-item"
          />
          <Styles.HeaderTextWrapper>
            <Typography.MediumText testID="season-title" bold>
              {props.route.params.name || '-'}
            </Typography.MediumText>
            <Typography.SmallText
              style={Styles.sheet.seasonText}
              testID="season-title"
              color={tvShowSeason.theme.colors.subText}>
              {tvShowSeason.texts.season}
            </Typography.SmallText>
            <Styles.Row>
              <SVGIcon
                key="full-star"
                size={Styles.STAR_ICON_SIZE}
                color="primary"
                id="star-full"
              />
              <Typography.SmallText
                style={Styles.sheet.seasonStarText}
                testID="season-title"
                color={tvShowSeason.theme.colors.subText}>
                {(tvShowSeason.season?.voteAverage || 0).toFixed(1)}
              </Typography.SmallText>
            </Styles.Row>
          </Styles.HeaderTextWrapper>
        </Styles.Header>
        {tvShowSeason.season?.episodes.map((episode, index) => {
          const shouldRenderLineDivider =
            tvShowSeason.season &&
            index < tvShowSeason.season.episodes.length - 1;
          return (
            <React.Fragment key={episode.id}>
              <Styles.EpisodeItem
                onPress={() => tvShowSeason.onPressEpisode(episode)}>
                <Styles.EpisodeIndexWrapper>
                  <Typography.SmallText
                    style={Styles.sheet.seasonStarText}
                    testID="season-title"
                    bold
                    color={tvShowSeason.theme.colors.buttonText}>
                    {index + 1}
                  </Typography.SmallText>
                </Styles.EpisodeIndexWrapper>
                <Typography.SmallText
                  style={Styles.sheet.seasonTitleText}
                  testID="season-title">
                  {episode.name || '-'}
                </Typography.SmallText>
              </Styles.EpisodeItem>
              {shouldRenderLineDivider && <Styles.LineDivider />}
            </React.Fragment>
          );
        })}
      </ScrollView>
      <EpisodeDetailsModal
        onCloseModal={tvShowSeason.onCloseModal}
        episode={tvShowSeason.episodeSelected}
      />
    </>
  );
};
