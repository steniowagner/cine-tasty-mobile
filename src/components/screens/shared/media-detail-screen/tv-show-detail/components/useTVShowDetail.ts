/* eslint-disable camelcase */
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';

import { GET_TV_SHOW_DETAIL } from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

type UseTVShowDetailProps = {
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

type Variables = Directives & SchemaTypes.TVShowDetailVariables;

const useTVShowDetail = ({
  hasVoteAverage,
  hasGenresIds,
  hasVoteCount,
  id,
}: UseTVShowDetailProps) => {
  const { t } = useTranslation();

  const { data, error, loading } = useQuery<SchemaTypes.TVShowDetail, Variables>(
    GET_TV_SHOW_DETAIL,
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
    tvShow: data?.tvShow,
    isLoading: loading,
    hasError: !!error,
    t,
  };
};

export default useTVShowDetail;
