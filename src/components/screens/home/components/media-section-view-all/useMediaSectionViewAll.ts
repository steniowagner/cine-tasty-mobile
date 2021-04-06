import { useCallback, useState, useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { DocumentNode } from 'graphql';

import { ISO6391Language } from 'types/schema';
import { getQuery } from '@graphql/queries';
import { usePaginatedQuery } from 'hooks';
import * as Types from 'types';

import { getTVShowProperQuery, getMovieProperQuery } from './get-proper-query';
import { HomeStackParams } from '../../routes/route-params-types';
import useOnGetData, { Data } from './useOnGetData';

export const I18N_PAGINATE_TV_SHOWS_ERROR_REF = 'translations:home:tvShowsPaginationError';
export const I18N_PAGINATE_MOVIES_ERROR_REF = 'translations:home:moviesPaginationError';

type PaginationVariables = {
  language?: ISO6391Language | null;
  page: number;
};

type Props = {
  navigation: StackNavigationProp<HomeStackParams, 'MEDIA_DETAILS_VIEW_ALL'>;
  trendingMediaItemKey: Types.TrendingMediaItemKey;
  initialMediaItems: Types.SimplifiedMedia[];
  isMovie: boolean;
};

const useMediaSectionViewAll = ({
  trendingMediaItemKey,
  initialMediaItems,
  navigation,
  isMovie,
}: Props) => {
  const [mediaItems, setMediaItems] = useState<Types.SimplifiedMedia[]>(
    initialMediaItems,
  );
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onGetData = useOnGetData({ trendingMediaItemKey, isMovie });
  const { t } = useTranslation();

  const properQuery = useMemo((): DocumentNode => {
    const queryId = isMovie
      ? getMovieProperQuery(trendingMediaItemKey)
      : getTVShowProperQuery(trendingMediaItemKey);

    return getQuery(queryId);
  }, [trendingMediaItemKey, isMovie]);

  const handleOnGetData = useCallback((data: Data): boolean => {
    const { hasMore, items } = onGetData(data);

    setMediaItems((preiviousMediaItems: Types.SimplifiedMedia[]) => [
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
    query: properQuery,
  });

  const onPressBottomReloadButton = useCallback(() => {
    setHasPaginationError(false);

    setError('');

    onPaginateQuery();
  }, []);

  const shouldShowListBottomReloadButton = useMemo(
    () => !!mediaItems.length && (hasPaginationError || isPaginating),
    [hasPaginationError, isPaginating, mediaItems],
  );

  const onPressItem = useCallback(
    (item: Types.SimplifiedMedia) => {
      const nextRoute = isMovie ? 'MOVIE_DETAIL' : 'TV_SHOW_DETAIL';

      const params = {
        genreIds: item.genreIds || [],
        voteAverage: item.voteAverage,
        posterPath: item.posterPath,
        voteCount: item.voteCount,
        title: item.title,
        id: item.id,
      };

      navigation.navigate(nextRoute, params);
    },
    [isMovie],
  );

  return {
    shouldShowListBottomReloadButton,
    onEndReached: onPaginateQuery,
    onPressBottomReloadButton,
    dataset: mediaItems,
    hasPaginationError,
    isPaginating,
    onPressItem,
    error,
  };
};

export default useMediaSectionViewAll;
