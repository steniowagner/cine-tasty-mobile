/* eslint-disable camelcase */
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';

import { useGetCurrentISO6391Language } from '@hooks';
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

const useMovieDetail = ({
  hasVoteAverage,
  hasGenresIds,
  hasVoteCount,
  id,
}: UseMovieDetailProps) => {
  const { currentISO6391Language } = useGetCurrentISO6391Language();
  const { t } = useTranslation();

  const { data, error, loading } = useQuery<SchemaTypes.MovieDetail, Variables>(
    GET_MOVIE_DETAIL,
    {
      variables: {
        language: currentISO6391Language,
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