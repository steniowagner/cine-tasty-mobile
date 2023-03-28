import React from 'react';

import {StatusBarStyled, ScrollWithAnimatedHeader} from '@components';

import {MediaDetailsError} from '../../common/media-details-error/MediaDetailsError';
import {TVShowDetailsProps} from '../routes/route-params-types';
import {useTVShowDetails} from './useTVShowDetails';
import {MediaDetailsLoading} from '../../common/media-details-loading/MediaDetailsLoading';
import {BackgroundImage} from '../../common/header-info/background-image/BackgroundImage';
import {TVShowDetailsContent} from './TVShowDetailsContent';

export const TVShowDetail = (props: TVShowDetailsProps) => {
  const tvShowDetails = useTVShowDetails({
    hasVoteAverage: !!props.route.params.voteAverage,
    hasVoteCount: !!props.route.params.voteCount,
    hasGenresIds: !!props.route.params.genreIds,
    route: props.route,
    navigation: props.navigation,
    id: props.route.params.id,
  });

  return (
    <>
      <StatusBarStyled />
      {tvShowDetails.canShowContent && (
        <BackgroundImage image={props.route.params.posterPath} />
      )}
      <ScrollWithAnimatedHeader
        isLoading={tvShowDetails.isLoading}
        hasError={tvShowDetails.hasError}
        headerTitle={props.route.params.title}
        headerBackgroundColorInterpolationInput={
          tvShowDetails.animatedHeaderIntepolationParams
            .headerBackgroundColorInterpolationInput
        }
        headerBackgroundColorInterpolationOutput={
          tvShowDetails.animatedHeaderIntepolationParams
            .headerBackgroundColorInterpolationOutput
        }
        headerTitleOpacityInterpolationInput={
          tvShowDetails.animatedHeaderIntepolationParams
            .headerTitleOpacityInterpolationInput
        }
        headerTitleOpacityInterpolationOutput={
          tvShowDetails.animatedHeaderIntepolationParams
            .headerTitleOpacityInterpolationOutput
        }>
        {tvShowDetails.hasError && <MediaDetailsError />}
        {tvShowDetails.isLoading && <MediaDetailsLoading />}
        {tvShowDetails.canShowContent && (
          <TVShowDetailsContent
            firstAirDate={tvShowDetails.firstAirDate}
            tvShow={tvShowDetails.tvShow}
            votesAverage={tvShowDetails.votesAverage}
            voteCount={tvShowDetails.voteCount}
            poster={tvShowDetails.poster}
            tags={tvShowDetails.tags}
            onPressSimilarTVShow={tvShowDetails.onPressSimilarTVShow}
            onPressSeeSeasons={tvShowDetails.onPressSeeSeasons}
            onPressCreatedBy={tvShowDetails.onPressCreatedBy}
            onPressReviews={tvShowDetails.onPressReviews}
            onPressCrew={tvShowDetails.onPressCrew}
            onPressCast={tvShowDetails.onPressCast}
            infoItems={tvShowDetails.infoItems}
            texts={tvShowDetails.texts}
            title={tvShowDetails.title}
            releaseDate={tvShowDetails.firstAirDate}
          />
        )}
      </ScrollWithAnimatedHeader>
    </>
  );
};
