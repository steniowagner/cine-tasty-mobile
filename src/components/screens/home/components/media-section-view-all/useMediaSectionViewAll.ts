import { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentNode } from 'graphql';

import { useGetCurrentISO6391Language, usePaginatedQuery } from '@hooks';
import * as SchemaTypes from '@schema-types';
import { getQuery } from '@graphql/queries';

import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';
import * as Types from '@local-types';

import { MediaSectionViewAllNavigationProp } from '../../routes/route-params-types';
import { getTVShowProperQuery, getMovieProperQuery } from './getProperQuery';
import useOnGetData, { Data } from './useOnGetData';

type PaginationVariables = {
  language?: SchemaTypes.ISO6391Language | null;
  page: number;
};

type UseMediaSectionViewAllProps = {
  trendingMediaItemKey: Types.TrendingMediaItemKey;
  navigation: MediaSectionViewAllNavigationProp;
  initialMediaItems: Types.SimplifiedMedia[];
  isMovie: boolean;
};

const useMediaSectionViewAll = ({
  trendingMediaItemKey,
  initialMediaItems,
  navigation,
  isMovie,
}: UseMediaSectionViewAllProps) => {
  const [mediaItems, setMediaItems] = useState<Types.SimplifiedMedia[]>(
    initialMediaItems,
  );
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { currentISO6391Language } = useGetCurrentISO6391Language();
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
        ? TRANSLATIONS.HOME_MOVIES_PAGINATION_ERROR
        : TRANSLATIONS.HOME_TV_SHOWS_PAGINATION_ERROR;

      setError(t(i18nErrorRef));

      setHasPaginationError(true);
    },
    variables: {
      language: currentISO6391Language,
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
      const nextRoute = isMovie ? Routes.Movie.DETAILS : Routes.TVShow.DETAILS;

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
