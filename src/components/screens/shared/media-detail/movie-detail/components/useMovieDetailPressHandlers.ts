/* eslint-disable camelcase */
import { useCallback } from 'react';

import * as SchemaTypes from '@schema-types';
import { Routes } from '@routes/routes';

import { MovieDetailNavigationProp } from '../routes/route-params-types';

type UseMovieDetailPressHandlersProps = {
  navigation: MovieDetailNavigationProp;
};

const useMovieDetailPressHandlers = ({
  navigation,
}: UseMovieDetailPressHandlersProps) => {
  const onPressSimilarItem = useCallback(
    (similar: SchemaTypes.MovieDetail_movie_similar) => {
      navigation.push(Routes.Movie.DETAILS, {
        voteAverage: similar.voteAverage,
        posterPath: similar.posterPath,
        voteCount: similar.voteCount,
        title: similar.title,
        id: similar.id,
      });
    },
    [navigation],
  );

  const onPressCast = useCallback(
    (id: string, name: string, image: string) => {
      navigation.push(Routes.Famous.DETAILS, {
        profileImage: image,
        id: Number(id),
        name,
      });
    },
    [navigation],
  );

  const onPressCrew = useCallback(
    (id: string, name: string, image: string) => {
      navigation.push(Routes.Famous.DETAILS, {
        profileImage: image,
        id: Number(id),
        name,
      });
    },
    [navigation],
  );

  const onPressReviews = useCallback(
    (movie: SchemaTypes.MovieDetail_movie) => {
      navigation.navigate(Routes.MediaDetail.REVIEWS, {
        mediaTitle: movie.title,
        reviews: movie.reviews,
      });
    },
    [navigation],
  );

  return {
    onPressSimilarItem,
    onPressReviews,
    onPressCast,
    onPressCrew,
  };
};

export default useMovieDetailPressHandlers;
