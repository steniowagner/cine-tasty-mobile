import { useCallback } from 'react';
import { DocumentNode } from 'graphql';

import { TrendingTVShowsKeys, TrendingMoviesKeys, TrendingMediaItemKey } from 'types';
import { usePaginatedQuery } from 'hooks';

import { NOW_PLAYING_MOVIES, ON_THE_AIR_TV_SHOWS } from './queries';

type Props = {
  trendingMediaItemKey: TrendingMediaItemKey;
  isMovie: boolean;
};

const useMediaSectionViewAll = ({ trendingMediaItemKey, isMovie }: Props) => {
  const getMovieProperQuery = useCallback((trendingMovieKey: TrendingMediaItemKey) => {
    const movieTrendingsMapping: Partial<Record<TrendingMoviesKeys, DocumentNode>> = {
      nowPlaying: NOW_PLAYING_MOVIES,
    };

    return movieTrendingsMapping[trendingMovieKey];
  }, []);

  const getTVShowProperQuery = useCallback((trendingMovieKey: TrendingMediaItemKey) => {
    const tvShowTrendingsMapping: Partial<Record<TrendingTVShowsKeys, DocumentNode>> = {
      onTheAir: ON_THE_AIR_TV_SHOWS,
    };

    return tvShowTrendingsMapping[trendingMovieKey];
  }, []);

  const getProperQuery = useCallback((): DocumentNode => (isMovie
    ? getMovieProperQuery(trendingMediaItemKey)
    : getTVShowProperQuery(trendingMediaItemKey)), [trendingMediaItemKey, isMovie]);

  usePaginatedQuery<any, any>({
    onPaginationQueryError: () => {
      console.log('onPaginationQueryError');
    },
    onEntryQueryError: () => {
      console.log('onEntryQueryError');
    },
    fireEntryQueryWhenMounted: false,
    onGetData: () => false,
    fetchPolicy: 'no-cache',
    query: getProperQuery(),
  });
};

export default useMediaSectionViewAll;
