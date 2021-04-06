import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';

import { GET_MOVIE_DETAIL } from '@graphql/queries';
import {
  MovieDetail_movie as Movie,
  MovieDetailVariables,
  MovieDetail,
} from 'types/schema';

type Props = {
  hasVoteAverage: boolean;
  hasGenresIds: boolean;
  hasVoteCount: boolean;
  id: number;
};

type State = {
  t: (key: string) => string;
  isLoading: boolean;
  hasError: boolean;
  movie?: Movie;
};

type Directives = {
  withVoteAverage: boolean;
  withGenresIds: boolean;
  withVoteCount: boolean;
};

type Variables = Directives & MovieDetailVariables;

const useMovieDetail = ({
  hasVoteAverage,
  hasGenresIds,
  hasVoteCount,
  id,
}: Props): State => {
  const { t } = useTranslation();

  const { data, error, loading } = useQuery<MovieDetail, Variables>(GET_MOVIE_DETAIL, {
    variables: {
      withVoteAverage: !hasVoteAverage,
      withGenresIds: !hasGenresIds,
      withVoteCount: !hasVoteCount,
      id: String(id),
    },
    fetchPolicy: 'cache-first',
  });

  return {
    movie: data?.movie,
    isLoading: loading,
    hasError: !!error,
    t,
  };
};

export default useMovieDetail;
