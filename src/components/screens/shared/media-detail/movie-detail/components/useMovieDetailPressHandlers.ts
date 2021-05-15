/* eslint-disable camelcase */
import { useCallback } from 'react';

import * as SchemaTypes from '@schema-types';
import { Routes } from '@routes/routes';

import { MovieDetailNavigationProp } from '../routes/route-params-types';

type UseMovieDetailPressHandlersProps = {
  navigation: MovieDetailNavigationProp;
};

const useMovieDetailPressHandlers = (props: UseMovieDetailPressHandlersProps) => {
  const onPressSimilarItem = useCallback(
    (similar: SchemaTypes.MovieDetail_movie_similar) => {
      props.navigation.push(Routes.Movie.DETAILS, {
        voteAverage: similar.voteAverage,
        posterPath: similar.posterPath,
        voteCount: similar.voteCount,
        title: similar.title,
        id: similar.id,
      });
    },
    [props.navigation],
  );

  const onPressCast = useCallback(
    (id: string, name: string, image: string) => {
      props.navigation.push(Routes.Famous.DETAILS, {
        profileImage: image,
        id: Number(id),
        name,
      });
    },
    [props.navigation],
  );

  const onPressCrew = useCallback(
    (id: string, name: string, image: string) => {
      props.navigation.push(Routes.Famous.DETAILS, {
        profileImage: image,
        id: Number(id),
        name,
      });
    },
    [props.navigation],
  );

  const onPressReviews = useCallback(
    (movie: SchemaTypes.MovieDetail_movie) => {
      props.navigation.navigate(Routes.MediaDetail.REVIEWS, {
        mediaTitle: movie.title,
        reviews: movie.reviews,
      });
    },
    [props.navigation],
  );

  return {
    onPressSimilarItem,
    onPressReviews,
    onPressCast,
    onPressCrew,
  };
};

export default useMovieDetailPressHandlers;
