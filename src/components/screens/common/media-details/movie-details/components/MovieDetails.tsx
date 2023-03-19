import React from 'react';

import {ScrollWithAnimatedHeader, StatusBarStyled} from '@components';

import {MediaDetailsError} from '../../common/media-details-error/MediaDetailsError';
import {MovieDetailStackProps} from '../routes/route-params-types';
import {BackgroundImage} from '../../common/header-info/background-image/BackgroundImage';
import {MediaDetailsLoading} from '../../common/media-details-loading/MediaDetailsLoading';
import {MovieDetailsContent} from './movies-details-content/MovieDetailsContent';
import {useMovieDetails} from './useMovieDetails';

export const MovieDetail = (props: MovieDetailStackProps) => {
  const movieDetails = useMovieDetails({
    hasVoteAverage: !!props.route.params.voteAverage,
    hasVoteCount: !!props.route.params.voteCount,
    hasGenresIds: !!props.route.params.genreIds,
    navigation: props.navigation,
    route: props.route,
    id: props.route.params.id,
  });

  return (
    <>
      <StatusBarStyled />
      {movieDetails.canShowContent && (
        <BackgroundImage image={props.route.params.posterPath} />
      )}
      <ScrollWithAnimatedHeader
        isLoading={movieDetails.isLoading}
        hasError={movieDetails.hasError}
        headerTitle={props.route.params.title}
        headerBackgroundColorInterpolationInput={
          movieDetails.animatedHeaderIntepolationParams
            .headerBackgroundColorInterpolationInput
        }
        headerBackgroundColorInterpolationOutput={
          movieDetails.animatedHeaderIntepolationParams
            .headerBackgroundColorInterpolationOutput
        }
        headerTitleOpacityInterpolationInput={
          movieDetails.animatedHeaderIntepolationParams
            .headerTitleOpacityInterpolationInput
        }
        headerTitleOpacityInterpolationOutput={
          movieDetails.animatedHeaderIntepolationParams
            .headerTitleOpacityInterpolationOutput
        }>
        {movieDetails.hasError && <MediaDetailsError />}
        {movieDetails.isLoading && <MediaDetailsLoading />}
        {movieDetails.canShowContent && (
          <MovieDetailsContent
            votesAverage={movieDetails.votesAverage}
            voteCount={movieDetails.voteCount}
            poster={movieDetails.poster}
            title={movieDetails.title}
            tags={movieDetails.tags}
            releaseDate={movieDetails.releaseDate}
            texts={movieDetails.texts}
            movie={movieDetails.movie}
            infoItems={movieDetails.infoItems}
            onPressCast={movieDetails.onPressCast}
            onPressCrew={movieDetails.onPressCrew}
            onPressSimilarMovie={movieDetails.onPressSimilarMovie}
            onPressReviews={movieDetails.onPressReviews}
          />
        )}
      </ScrollWithAnimatedHeader>
    </>
  );
};
