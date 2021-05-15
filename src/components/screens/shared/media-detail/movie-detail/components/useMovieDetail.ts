/* eslint-disable camelcase */
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';

import { GET_MOVIE_DETAIL } from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

type UseMovieDetailProps = {
  hasVoteAverage: boolean;
  hasGenresIds: boolean;
  hasVoteCount: boolean;
  id: number;
};

type Directives = {
  withVoteAverage: boolean;
  withGenresIds: boolean;
  withVoteCount: boolean;
};

type Variables = Directives & SchemaTypes.MovieDetailVariables;

const useMovieDetail = (props: UseMovieDetailProps) => {
  const { t } = useTranslation();

  const query = useQuery<SchemaTypes.MovieDetail, Variables>(GET_MOVIE_DETAIL, {
    variables: {
      withVoteAverage: !props.hasVoteAverage,
      withGenresIds: !props.hasGenresIds,
      withVoteCount: !props.hasVoteCount,
      id: String(props.id),
    },
    fetchPolicy: 'cache-first',
  });

  return {
    movie: query.data?.movie,
    isLoading: query.loading,
    hasError: !!query.error,
    t,
  };
};

export default useMovieDetail;
