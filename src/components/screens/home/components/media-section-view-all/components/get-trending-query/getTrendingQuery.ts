import * as Types from '@local-types';
import {getQuery} from '@graphql/queries';

import {getTrendingMoviesQueryId} from './getTrendingMoviesQueryId';
import {getTrendingTVShowsQueryId} from './getTrendingTVShowsQueryId';

const getTrendingQueryId = (
  trendingMediaItemKey: Types.TrendingMediaItemKey,
  isMovie: boolean,
) =>
  isMovie
    ? getTrendingMoviesQueryId(trendingMediaItemKey)
    : getTrendingTVShowsQueryId(trendingMediaItemKey);

export const getTrendingQuery = (
  trendingMediaItemKey: Types.TrendingMediaItemKey,
  isMovie: boolean,
) => {
  const queryId = getTrendingQueryId(trendingMediaItemKey, isMovie);
  return getQuery(queryId);
};
