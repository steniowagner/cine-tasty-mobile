import { useCallback } from 'react';

import { OnTheAirTVShows, NowPlayingMovies } from 'types/schema';
import {
  TrendingTVShowsKeys,
  TrendingMoviesKeys,
  TrendingMediaItemKey,
  SimplifiedMedia,
} from 'types';

type MovieData = NowPlayingMovies;

type TVShowData = OnTheAirTVShows;

export type Data = MovieData | TVShowData;

type TrendingMovieItem = Partial<
  Record<TrendingMoviesKeys, (data: MovieData) => DataResult>
>;

type TrendingTVShowItem = Partial<
  Record<TrendingTVShowsKeys, (data: TVShowData) => DataResult>
>;

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
          const nowPlayingMoviesData = data as NowPlayingMovies;

          return {
            hasMore: nowPlayingMoviesData.trendingMovies.nowPlaying.hasMore,
            items: nowPlayingMoviesData.trendingMovies.nowPlaying.items,
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
          const onTheAirTVShowsData = data as TVShowData;

          return {
            hasMore: onTheAirTVShowsData.trendingTvShows.onTheAir.hasMore,
            items: onTheAirTVShowsData.trendingTvShows.onTheAir.items,
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
