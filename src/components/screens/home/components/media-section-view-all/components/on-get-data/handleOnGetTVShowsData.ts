import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import {TVShowTrendingData, TrendingResult} from './types';

type TrendingTVShowItem = Record<
  Types.TrendingTVShowsKeys,
  (data: TVShowTrendingData) => TrendingResult
>;

export const handleOnGetTVShowsData = (
  trendingKey: Types.TrendingMediaItemKey,
) => {
  const getDataMapping: TrendingTVShowItem = {
    onTheAir: (data: TVShowTrendingData) => {
      const onTheAirTVShowsData = data as SchemaTypes.TrendingOnTheAirTVShows;
      return {
        hasMore: onTheAirTVShowsData.trendingTvShows.onTheAir.hasMore || false,
        dataset: onTheAirTVShowsData.trendingTvShows.onTheAir.items || [],
      };
    },
    popular: (data: TVShowTrendingData) => {
      const popularTVShowsData = data as SchemaTypes.TrendingPopularTVShows;
      return {
        hasMore: popularTVShowsData.trendingTvShows.popular.hasMore || false,
        dataset: popularTVShowsData.trendingTvShows.popular.items || [],
      };
    },
    topRated: (data: TVShowTrendingData) => {
      const topRatedTVShowsData = data as SchemaTypes.TrendingTopRatedTVShows;
      return {
        hasMore: topRatedTVShowsData.trendingTvShows.topRated.hasMore || false,
        dataset: topRatedTVShowsData.trendingTvShows.topRated.items || [],
      };
    },
    airingToday: (data: TVShowTrendingData) => {
      const topRatedTVShowsData =
        data as SchemaTypes.TrendingAiringTodayTVShows;
      return {
        hasMore:
          topRatedTVShowsData.trendingTvShows.airingToday.hasMore || false,
        dataset: topRatedTVShowsData.trendingTvShows.airingToday.items || [],
      };
    },
  };
  return getDataMapping[trendingKey] as (
    data: TVShowTrendingData,
  ) => TrendingResult;
};
