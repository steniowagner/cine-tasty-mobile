/* eslint-disable camelcase */
import {useTranslation} from 'react-i18next';
import {useQuery} from '@apollo/client';

import {GET_TV_SHOW_DETAIL} from '@graphql/queries';
import {useGetCurrentISO6391Language} from '@hooks';
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
  const {currentISO6391Language} = useGetCurrentISO6391Language();
  const {t} = useTranslation();

  const {data, error, loading} = useQuery<SchemaTypes.TVShowDetail, Variables>(
    GET_TV_SHOW_DETAIL,
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
    tvShow: data?.tvShow,
    isLoading: loading,
    hasError: !!error,
    t,
  };
};

export default useTVShowDetail;
