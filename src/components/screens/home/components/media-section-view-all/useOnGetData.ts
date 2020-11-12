import { useCallback } from 'react';

import {
  TrendingAiringTodayTVShows,
  TrendingOnTheAirTVShows,
  TrendingPopularTVShows,
  TrendingTopRatedTVShows,
  TrendingNowPlayingMovies,
  TrendingPopularMovies,
  TrendingTopRatedMovies,
  TrendingUpcomingMovies,
} from 'types/schema';
import {
  TrendingTVShowsKeys,
  TrendingMoviesKeys,
  TrendingMediaItemKey,
  SimplifiedMedia,
} from 'types';

export type Data = MovieData | TVShowData;

type MovieData =
  | TrendingNowPlayingMovies
  | TrendingPopularMovies
  | TrendingTopRatedMovies
  | TrendingUpcomingMovies;

type TVShowData =
  | TrendingAiringTodayTVShows
  | TrendingOnTheAirTVShows
  | TrendingPopularTVShows
  | TrendingTopRatedTVShows;

type TrendingMovieItem = Record<TrendingMoviesKeys, (data: MovieData) => DataResult>;

type TrendingTVShowItem = Record<TrendingTVShowsKeys, (data: TVShowData) => DataResult>;

type DataResult = {
  items: SimplifiedMedia[];
  hasMore: boolean;
};

type State = (data: Data) => DataResult;

type Props = {
  trendingMediaItemKey: TrendingMediaItemKey;
  isMovie: boolean;
};

const useOnGetData = ({ trendingMediaItemKey, isMovie }: Props): State => {
  const getMovieOnGetDataHandler = useCallback(
    (trendingMovieKey: TrendingMediaItemKey) => {
      const movieOnGetDataMapping: TrendingMovieItem = {
        nowPlaying: (data: MovieData): DataResult => {
          const nowPlayingMoviesData = data as TrendingNowPlayingMovies;

          return {
            hasMore: nowPlayingMoviesData.trendingMovies.nowPlaying.hasMore,
            items: nowPlayingMoviesData.trendingMovies.nowPlaying.items,
          };
        },
        popular: (data: MovieData): DataResult => {
          const popularMoviesData = data as TrendingPopularMovies;

          return {
            hasMore: popularMoviesData.trendingMovies.popular.hasMore,
            items: popularMoviesData.trendingMovies.popular.items,
          };
        },
        topRated: (data: MovieData): DataResult => {
          const topRatedData = data as TrendingTopRatedMovies;

          return {
            hasMore: topRatedData.trendingMovies.topRated.hasMore,
            items: topRatedData.trendingMovies.topRated.items,
          };
        },
        upcoming: (data: MovieData): DataResult => {
          const upcomingData = data as TrendingUpcomingMovies;

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
    (trendingMovieKey: TrendingMediaItemKey): DataResult => {
      const tvShowOnGetDataMapping: TrendingTVShowItem = {
        onTheAir: (data: TVShowData): DataResult => {
          const onTheAirTVShowsData = data as TrendingOnTheAirTVShows;

          return {
            hasMore: onTheAirTVShowsData.trendingTvShows.onTheAir.hasMore,
            items: onTheAirTVShowsData.trendingTvShows.onTheAir.items,
          };
        },
        popular: (data: TVShowData): DataResult => {
          const popularTVShowsData = data as TrendingPopularTVShows;

          return {
            hasMore: popularTVShowsData.trendingTvShows.popular.hasMore,
            items: popularTVShowsData.trendingTvShows.popular.items,
          };
        },
        topRated: (data: TVShowData): DataResult => {
          const topRatedTVShowsData = data as TrendingTopRatedTVShows;

          return {
            hasMore: topRatedTVShowsData.trendingTvShows.topRated.hasMore,
            items: topRatedTVShowsData.trendingTvShows.topRated.items,
          };
        },
        airingToday: (data: TVShowData): DataResult => {
          const topRatedTVShowsData = data as TrendingAiringTodayTVShows;

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
