import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import {TrendingResult, MovieTrendingData} from './types';

type TrendingMovieItem = Record<
  Types.TrendingMoviesKeys,
  (data: MovieTrendingData) => TrendingResult
>;

export const handleOnGetMoviesData = (
  trendingKey: Types.TrendingMediaItemKey,
) => {
  const getDataMapping: TrendingMovieItem = {
    nowPlaying: (data: MovieTrendingData) => {
      const nowPlayingMoviesData = data as SchemaTypes.TrendingNowPlayingMovies;
      return {
        hasMore:
          nowPlayingMoviesData.trendingMovies.nowPlaying.hasMore || false,
        dataset: nowPlayingMoviesData.trendingMovies.nowPlaying.items || [],
      };
    },
    popular: (data: MovieTrendingData) => {
      const popularMoviesData = data as SchemaTypes.TrendingPopularMovies;
      return {
        hasMore: popularMoviesData.trendingMovies.popular.hasMore || false,
        dataset: popularMoviesData.trendingMovies.popular.items || [],
      };
    },
    topRated: (data: MovieTrendingData) => {
      const topRatedData = data as SchemaTypes.TrendingTopRatedMovies;
      return {
        hasMore: topRatedData.trendingMovies.topRated.hasMore || false,
        dataset: topRatedData.trendingMovies.topRated.items || [],
      };
    },
    upcoming: (data: MovieTrendingData) => {
      const upcomingData = data as SchemaTypes.TrendingUpcomingMovies;
      return {
        hasMore: upcomingData.trendingMovies.upcoming.hasMore || false,
        dataset: upcomingData.trendingMovies.upcoming.items || [],
      };
    },
  };
  return getDataMapping[trendingKey] as (
    data: MovieTrendingData,
  ) => TrendingResult;
};
