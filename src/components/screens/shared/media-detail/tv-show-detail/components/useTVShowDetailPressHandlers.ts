/* eslint-disable camelcase */
import { useCallback } from 'react';

import * as SchemaTypes from '@schema-types';
import { Routes } from '@routes/routes';

import { TVShowDetailNavigationProp } from '../routes/route-params-types';

type UseTVShowDetailPressHandlersProps = {
  navigation: TVShowDetailNavigationProp;
};

const useTVShowDetailPressHandlers = (props: UseTVShowDetailPressHandlersProps) => {
  const onPressSimilarItem = useCallback(
    (similar: SchemaTypes.TVShowDetail_tvShow_similar) => {
      props.navigation.push(Routes.TVShow.DETAILS, {
        voteAverage: similar.voteAverage,
        posterPath: similar.posterPath,
        voteCount: similar.voteCount,
        title: similar.name,
        id: similar.id,
      });
    },
    [props.navigation],
  );

  const onPressReviews = useCallback(
    (tvShow: SchemaTypes.TVShowDetail_tvShow) => {
      props.navigation.navigate(Routes.MediaDetail.REVIEWS, {
        mediaTitle: tvShow.name,
        reviews: tvShow.reviews,
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

  const onPressCreatedBy = useCallback((id: string, name: string, image: string) => {
    props.navigation.push(Routes.Famous.DETAILS, {
      profileImage: image,
      id: Number(id),
      name,
    });
  }, []);

  const onPressSeeSeasons = useCallback((tvShow: SchemaTypes.TVShowDetail_tvShow) => {
    props.navigation.navigate(Routes.TVShow.SEASONS, {
      numberOfSeasons: tvShow.numberOfSeasons,
      title: tvShow.name,
      id: tvShow.id,
    });
  }, []);

  return {
    onPressSimilarItem,
    onPressSeeSeasons,
    onPressCreatedBy,
    onPressReviews,
    onPressCrew,
    onPressCast,
  };
};

export default useTVShowDetailPressHandlers;
