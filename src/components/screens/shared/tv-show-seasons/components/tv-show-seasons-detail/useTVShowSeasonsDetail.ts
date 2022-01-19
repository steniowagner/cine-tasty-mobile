import {useTranslation} from 'react-i18next';
import {useQuery} from '@apollo/client';

import {TV_SHOW_SEASONS_DETAIL} from '@graphql/queries';
import {useGetCurrentISO6391Language} from '@hooks';
import * as SchemaTypes from '@schema-types';

type UseTVShowSeasonsDetailProps = {
  season: number;
  id: string;
};

const useTVShowSeasonsDetail = ({season, id}: UseTVShowSeasonsDetailProps) => {
  const {currentISO6391Language} = useGetCurrentISO6391Language();
  const {t} = useTranslation();

  const {data, error, loading} = useQuery<
    SchemaTypes.TVShowSeasonsDetail,
    SchemaTypes.TVShowSeasonsDetailVariables
  >(TV_SHOW_SEASONS_DETAIL, {
    variables: {
      language: currentISO6391Language,
      season,
      id,
    },
    fetchPolicy: 'cache-first',
  });

  return {
    seasonDetail: data?.tvShowSeason,
    isLoading: loading,
    hasError: !!error,
    t,
  };
};

export default useTVShowSeasonsDetail;
