/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useImperativeQuery from '@utils/useImperativeQuery';
import { TV_SHOW_SEASONS_DETAIL } from '@graphql/queries';
import { useGetCurrentISO6391Language } from '@hooks';
import * as SchemaTypes from '@schema-types';

const INITIAL_QUERY_STATE: QueryState = {
  seasonDetail: undefined,
  isLoading: true,
  hasError: false,
};

type QueryState = {
  seasonDetail: SchemaTypes.TVShowSeasonsDetail_tvShowSeason | undefined;
  isLoading: boolean;
  hasError: boolean;
};

type UseTVShowSeasonsDetailProps = {
  season: number;
  id: string;
};

const useTVShowSeasonsDetail = ({ season, id }: UseTVShowSeasonsDetailProps) => {
  const [queryState, setQueryState] = useState<QueryState>(INITIAL_QUERY_STATE);

  const { currentISO6391Language } = useGetCurrentISO6391Language();
  const { t } = useTranslation();

  const execQuery = useImperativeQuery<
    SchemaTypes.TVShowSeasonsDetail,
    SchemaTypes.TVShowSeasonsDetailVariables
  >(TV_SHOW_SEASONS_DETAIL);

  const onQueryTVShowSeason = useCallback(async () => {
    try {
      const { data } = await execQuery({
        language: currentISO6391Language,
        season,
        id,
      });

      setQueryState(() => ({
        seasonDetail: data.tvShowSeason,
        isLoading: false,
        hasError: false,
      }));
    } catch (err) {
      setQueryState(() => ({
        seasonDetail: undefined,
        isLoading: false,
        hasError: true,
      }));
    }
  }, []);

  useEffect(() => {
    onQueryTVShowSeason();
  }, []);

  return {
    seasonDetail: queryState.seasonDetail,
    isLoading: queryState.isLoading,
    hasError: queryState.hasError,
    t,
  };
};

export default useTVShowSeasonsDetail;
