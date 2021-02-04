import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentNode } from 'graphql';

import { ISO6391Language } from 'types/schema';
import { usePaginatedQuery } from 'hooks';
import {
  TrendingTVShowsKeys,
  TrendingMoviesKeys,
  TrendingMediaItemKey,
  SimplifiedMedia,
} from 'types';

import * as TrendingQueries from './queries';
import useOnGetData, { Data } from './useOnGetData';

export const I18N_PAGINATE_TV_SHOWS_ERROR_REF = 'translations:home:tvShowsPaginationError';
export const I18N_PAGINATE_MOVIES_ERROR_REF = 'translations:home:moviesPaginationError';

type PaginationVariables = {
  language?: ISO6391Language | null;
  page: number;
};

type Props = {
  trendingMediaItemKey: TrendingMediaItemKey;
  initialMediaItems: SimplifiedMedia[];
  isMovie: boolean;
};

type State = {
  onPressBottomReloadButton: () => void;
  hasPaginationError: boolean;
  dataset: SimplifiedMedia[];
  onEndReached: () => void;
  isPaginating: boolean;
  error: string;
};

const useMediaSectionViewAll = ({
  trendingMediaItemKey,
  initialMediaItems,
  isMovie,
}: Props): State => {
  const [mediaItems, setMediaItems] = useState<SimplifiedMedia[]>(initialMediaItems);
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { t } = useTranslation();

  const onGetData = useOnGetData({ trendingMediaItemKey, isMovie });

  const getMovieProperQuery = useCallback((trendingMovieKey: TrendingMediaItemKey) => {
    const movieTrendingsMapping: Record<TrendingMoviesKeys, DocumentNode> = {
      nowPlaying: TrendingQueries.NOW_PLAYING_MOVIES,
      popular: TrendingQueries.POPULAR_MOVIES,
      topRated: TrendingQueries.TOP_RATED_MOVIES,
      upcoming: TrendingQueries.UPCOMING_MOVIES,
    };

    return movieTrendingsMapping[trendingMovieKey];
  }, []);

  const getTVShowProperQuery = useCallback((trendingMovieKey: TrendingMediaItemKey) => {
    const tvShowTrendingsMapping: Record<TrendingTVShowsKeys, DocumentNode> = {
      airingToday: TrendingQueries.AIRING_TODAY_TV_SHOWS,
      onTheAir: TrendingQueries.ON_THE_AIR_TV_SHOWS,
      popular: TrendingQueries.POPULAR_TV_SHOWS,
      topRated: TrendingQueries.TOP_RATED_TV_SHOWS,
    };

    return tvShowTrendingsMapping[trendingMovieKey];
  }, []);

  const getProperQuery = useCallback(
    (): DocumentNode => (isMovie
      ? getMovieProperQuery(trendingMediaItemKey)
      : getTVShowProperQuery(trendingMediaItemKey)),
    [trendingMediaItemKey, isMovie],
  );

  const handleOnGetData = useCallback((data: Data): boolean => {
    const { hasMore, items } = onGetData(data);

    setMediaItems((preiviousMediaItems: SimplifiedMedia[]) => [
      ...preiviousMediaItems,
      ...items,
    ]);

    return hasMore;
  }, []);

  const { onPaginateQuery, isPaginating } = usePaginatedQuery<Data, PaginationVariables>({
    onPaginationQueryError: () => {
      const i18nErrorRef = isMovie
        ? I18N_PAGINATE_MOVIES_ERROR_REF
        : I18N_PAGINATE_TV_SHOWS_ERROR_REF;

      setError(t(i18nErrorRef));

      setHasPaginationError(true);
    },
    fireEntryQueryWhenMounted: false,
    onEntryQueryError: () => {},
    onGetData: handleOnGetData,
    fetchPolicy: 'no-cache',
    query: getProperQuery(),
  });

  const onPressBottomReloadButton = useCallback(() => {
    setHasPaginationError(false);

    setError('');

    onPaginateQuery();
  }, []);

  return {
    onEndReached: onPaginateQuery,
    onPressBottomReloadButton,
    dataset: mediaItems,
    hasPaginationError,
    isPaginating,
    error,
  };
};

export default useMediaSectionViewAll;
