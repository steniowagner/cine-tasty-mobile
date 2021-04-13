import { useCallback } from 'react';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

export type Data = MovieData | TVShowData;

type MovieData =
  | SchemaTypes.TrendingNowPlayingMovies
  | SchemaTypes.TrendingPopularMovies
  | SchemaTypes.TrendingTopRatedMovies
  | SchemaTypes.TrendingUpcomingMovies;

type TVShowData =
  | SchemaTypes.TrendingAiringTodayTVShows
  | SchemaTypes.TrendingOnTheAirTVShows
  | SchemaTypes.TrendingPopularTVShows
  | SchemaTypes.TrendingTopRatedTVShows;

type TrendingMovieItem = Record<
  Types.TrendingMoviesKeys,
  (data: MovieData) => DataResult
>;

type TrendingTVShowItem = Record<
  Types.TrendingTVShowsKeys,
  (data: TVShowData) => DataResult
>;

type DataResult = {
  items: Types.SimplifiedMedia[];
  hasMore: boolean;
};

type State = (data: Data) => DataResult;

type Props = {
  trendingMediaItemKey: Types.TrendingMediaItemKey;
  isMovie: boolean;
};

const useOnGetData = ({ trendingMediaItemKey, isMovie }: Props): State => {
  const getMovieOnGetDataHandler = useCallback(
    (trendingMovieKey: Types.TrendingMediaItemKey) => {
      const movieOnGetDataMapping: TrendingMovieItem = {
        nowPlaying: (data: MovieData): DataResult => {
          const nowPlayingMoviesData = data as SchemaTypes.TrendingNowPlayingMovies;

          return {
            hasMore: nowPlayingMoviesData.trendingMovies.nowPlaying.hasMore,
            items: nowPlayingMoviesData.trendingMovies.nowPlaying.items,
          };
        },
        popular: (data: MovieData): DataResult => {
          const popularMoviesData = data as SchemaTypes.TrendingPopularMovies;

          return {
            hasMore: popularMoviesData.trendingMovies.popular.hasMore,
            items: popularMoviesData.trendingMovies.popular.items,
          };
        },
        topRated: (data: MovieData): DataResult => {
          const topRatedData = data as SchemaTypes.TrendingTopRatedMovies;

          return {
            hasMore: topRatedData.trendingMovies.topRated.hasMore,
            items: topRatedData.trendingMovies.topRated.items,
          };
        },
        upcoming: (data: MovieData): DataResult => {
          const upcomingData = data as SchemaTypes.TrendingUpcomingMovies;

          return {
            hasMore: upcomingData.trendingMovies.upcoming.hasMore,
            items: upcomingData.trendingMovies.upcoming.items,
          };
        },
      };

      return movieOnGetDataMapping[trendingMovieKey];
    },
    [],
  );

  const getTVSahowOnGetDataHandler = useCallback(
    (trendingMovieKey: Types.TrendingMediaItemKey): DataResult => {
      const tvShowOnGetDataMapping: TrendingTVShowItem = {
        onTheAir: (data: TVShowData): DataResult => {
          const onTheAirTVShowsData = data as SchemaTypes.TrendingOnTheAirTVShows;

          return {
            hasMore: onTheAirTVShowsData.trendingTvShows.onTheAir.hasMore,
            items: onTheAirTVShowsData.trendingTvShows.onTheAir.items,
          };
        },
        popular: (data: TVShowData): DataResult => {
          const popularTVShowsData = data as SchemaTypes.TrendingPopularTVShows;

          return {
            hasMore: popularTVShowsData.trendingTvShows.popular.hasMore,
            items: popularTVShowsData.trendingTvShows.popular.items,
          };
        },
        topRated: (data: TVShowData): DataResult => {
          const topRatedTVShowsData = data as SchemaTypes.TrendingTopRatedTVShows;

          return {
            hasMore: topRatedTVShowsData.trendingTvShows.topRated.hasMore,
            items: topRatedTVShowsData.trendingTvShows.topRated.items,
          };
        },
        airingToday: (data: TVShowData): DataResult => {
          const topRatedTVShowsData = data as SchemaTypes.TrendingAiringTodayTVShows;

          return {
            hasMore: topRatedTVShowsData.trendingTvShows.airingToday.hasMore,
            items: topRatedTVShowsData.trendingTvShows.airingToday.items,
          };
        },
      };

      return tvShowOnGetDataMapping[trendingMovieKey];
    },
    [],
  );

  return isMovie
    ? getMovieOnGetDataHandler(trendingMediaItemKey)
    : getTVSahowOnGetDataHandler(trendingMediaItemKey);
};

export default useOnGetData;
