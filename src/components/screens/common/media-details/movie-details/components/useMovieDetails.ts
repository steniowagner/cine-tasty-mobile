import {useCallback, useEffect, useMemo} from 'react';
import {useQuery} from '@apollo/client';

import {getRouteName as getReviewsRouteName} from '@src/components/screens/common/reviews/routes/route-params-types';
import {showLanguageAlert} from '@utils';
import {GET_MOVIE_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {useTranslations} from '@hooks';
import {Routes} from '@routes/routes';

import {useMakeAnimatedHeaderIntepolationParams} from '../../common/useMakeAnimatedHeaderInterpolationParams';
import {
  MovieDetailsNavigationProp,
  MovieDetailsRouteProp,
} from '../routes/route-params-types';
import {PressItemParams} from '../../common/people-list/PeopleList';
import {translateMoviesDetailsTexts} from './translateMoviesDetailsTexts';
import {makeMovieInfoItems} from './makeMovieInfoItems';

type UseMovieDetailsProps = {
  navigation: MovieDetailsNavigationProp;
  route: MovieDetailsRouteProp;
  hasVoteAverage: boolean;
  hasGenresIds: boolean;
  hasVoteCount: boolean;
  id: number;
};

export const useMovieDetails = (props: UseMovieDetailsProps) => {
  const animatedHeaderIntepolationParams =
    useMakeAnimatedHeaderIntepolationParams();

  const translations = useTranslations();

  const query = useQuery<
    SchemaTypes.MovieDetail,
    SchemaTypes.MovieDetailVariables
  >(GET_MOVIE_DETAIL, {
    variables: {
      withVoteAverage: !props.hasVoteAverage,
      withGenresIds: !props.hasGenresIds,
      withVoteCount: !props.hasVoteCount,
      language: translations.language,
      id: String(props.id),
    },
    fetchPolicy: 'cache-first',
  });

  const texts = useMemo(
    () => translateMoviesDetailsTexts(translations.translate),
    [translations.translate],
  );

  const infoItems = useMemo(
    () => makeMovieInfoItems(query, texts.info),
    [query, texts],
  );

  const handlePressSimilarMovie = useCallback(
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

  const handlePressCast = useCallback(
    (params: PressItemParams) => {
      props.navigation.push(Routes.Famous.DETAILS, {
        profileImage: params.image,
        id: Number(params.id),
        name: params.name,
      });
    },
    [props.navigation],
  );

  const handlePressCrew = useCallback(
    (params: PressItemParams) => {
      props.navigation.push(Routes.Famous.DETAILS, {
        profileImage: params.image,
        id: Number(params.id),
        name: params.name,
      });
    },
    [props.navigation],
  );

  const handlePressReviews = useCallback(
    (movie: SchemaTypes.MovieDetail_movie) => {
      const parentRootRouteName = getReviewsRouteName(
        props.navigation.getState().routes[0].name,
      );
      props.navigation.navigate(parentRootRouteName, {
        mediaTitle: movie.title,
        reviews: movie.reviews,
      });
    },
    [props.navigation],
  );

  const handleShowLanguageAlert = useCallback(() => {
    const shouldShowLanguageAlert =
      !query.loading && query.data?.movie && !query.data?.movie.overview;
    if (shouldShowLanguageAlert) {
      showLanguageAlert({
        description: texts.languageAlert.description,
        positiveActionTitle: texts.languageAlert.positiveActionTitle,
        title: texts.languageAlert.title,
        onPressPositiveAction: () => {},
        singleAction: true,
      });
    }
  }, [query.loading, query.data?.movie]);

  useEffect(() => {
    handleShowLanguageAlert();
  }, [query.loading, query.data?.movie]);

  return {
    canShowContent:
      !query.loading && !query.error && query.data && query.data.movie,
    votesAverage:
      props.route.params.voteAverage || query.data?.movie?.voteAverage || 0,
    voteCount:
      props.route.params.voteCount || query.data?.movie?.voteCount || 0,
    poster: props.route.params.posterPath,
    title: props.route.params.title,
    tags: props.route.params.genreIds || query.data?.movie?.genres || [],
    animatedHeaderIntepolationParams,
    movie: query.data?.movie,
    releaseDate: (query.data?.movie?.releaseDate || '-').split('-')[0],
    isLoading: query.loading,
    hasError: !!query.error,
    onPressSimilarMovie: handlePressSimilarMovie,
    onPressReviews: handlePressReviews,
    onPressCrew: handlePressCrew,
    onPressCast: handlePressCast,
    infoItems,
    texts,
  };
};
