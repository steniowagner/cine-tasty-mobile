import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gql from 'graphql-tag';

import useImperativeQuery from 'utils/useImperativeQuery';
import {
  TVShowSeasonsDetail_tvShowSeason as TVShowSeason,
  TVShowSeasonsDetailVariables,
  TVShowSeasonsDetail,
} from 'types/schema';

const TV_SHOW_SEASONS_DETAIL = gql`
  query TVShowSeasonsDetail($id: ID!, $season: Int!, $language: ISO6391Language) {
    tvShowSeason(id: $id, season: $season, language: $language) {
      seasonNumber
      posterPath
      overview
      id
      episodes {
        voteAverage
        stillPath
        voteCount
        overview
        airDate
        id
        name
      }
    }
  }
`;

const INITIAL_QUERY_STATE: QueryState = {
  seasonDetail: undefined,
  isLoading: true,
  hasError: false,
};

type QueryState = {
  seasonDetail: TVShowSeason | undefined;
  isLoading: boolean;
  hasError: boolean;
};

type State = {
  t: (key: string) => string;
} & QueryState;

type Props = {
  season: number;
  id: string;
};

const useTVShowSeasonsDetail = ({ season, id }: Props): State => {
  const [queryState, setQueryState] = useState<QueryState>(INITIAL_QUERY_STATE);

  const { t } = useTranslation();

  const execQuery = useImperativeQuery<TVShowSeasonsDetail, TVShowSeasonsDetailVariables>(
    TV_SHOW_SEASONS_DETAIL,
  );

  const onQueryTVShowSeason = useCallback(async () => {
    const { data, errors } = await execQuery({
      season,
      id,
    });

    if (errors) {
      setQueryState(() => ({
        seasonDetail: undefined,
        isLoading: false,
        hasError: true,
      }));

      return;
    }

    setQueryState(() => ({
      seasonDetail: data.tvShowSeason,
      isLoading: false,
      hasError: false,
    }));
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
