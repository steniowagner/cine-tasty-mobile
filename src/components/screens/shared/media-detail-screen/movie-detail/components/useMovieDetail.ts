/* eslint-disable camelcase */
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';

import { GET_MOVIE_DETAIL } from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

type Props = {
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

const useMovieDetail = ({
  hasVoteAverage, hasGenresIds, hasVoteCount, id,
}: Props) => {
  const { t } = useTranslation();

  const { data, error, loading } = useQuery<SchemaTypes.MovieDetail, Variables>(
    GET_MOVIE_DETAIL,
    {
      variables: {
        withVoteAverage: !hasVoteAverage,
        withGenresIds: !hasGenresIds,
        withVoteCount: !hasVoteCount,
        id: String(id),
      },
      fetchPolicy: 'cache-first',
    },
  );

  return {
    movie: data?.movie,
    isLoading: loading,
    hasError: !!error,
    t,
  };
};

export default useMovieDetail;
