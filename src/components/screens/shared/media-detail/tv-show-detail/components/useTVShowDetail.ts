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

const useTVShowDetail = (props: UseTVShowDetailProps) => {
  const { t } = useTranslation();

  const query = useQuery<SchemaTypes.TVShowDetail, Variables>(GET_TV_SHOW_DETAIL, {
    variables: {
      withVoteAverage: !props.hasVoteAverage,
      withGenresIds: !props.hasGenresIds,
      withVoteCount: !props.hasVoteCount,
      id: String(props.id),
    },
    fetchPolicy: 'cache-first',
  });

  return {
    tvShow: query.data?.tvShow,
    isLoading: query.loading,
    hasError: !!query.error,
    t,
  };
};

export default useTVShowDetail;
