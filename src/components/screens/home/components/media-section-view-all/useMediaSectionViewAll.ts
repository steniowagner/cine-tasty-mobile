import { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentNode } from 'graphql';

import * as SchemaTypes from '@schema-types';
import { getQuery } from '@graphql/queries';
import { usePaginatedQuery } from '@hooks';
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

const useMediaSectionViewAll = (props: UseMediaSectionViewAllProps) => {
  const [mediaItems, setMediaItems] = useState<Types.SimplifiedMedia[]>(
    props.initialMediaItems,
  );
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onGetData = useOnGetData({
    trendingMediaItemKey: props.trendingMediaItemKey,
    isMovie: props.isMovie,
  });

  const { t } = useTranslation();

  const properQuery = useMemo((): DocumentNode => {
    const queryId = props.isMovie
      ? getMovieProperQuery(props.trendingMediaItemKey)
      : getTVShowProperQuery(props.trendingMediaItemKey);

    return getQuery(queryId);
  }, [props.trendingMediaItemKey, props.isMovie]);

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
      const i18nErrorRef = props.isMovie
        ? TRANSLATIONS.HOME_MOVIES_PAGINATION_ERROR
        : TRANSLATIONS.HOME_TV_SHOWS_PAGINATION_ERROR;

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
      const nextRoute = props.isMovie ? Routes.Movie.DETAILS : Routes.TVShow.DETAILS;

      const params = {
        genreIds: item.genreIds || [],
        voteAverage: item.voteAverage,
        posterPath: item.posterPath,
        voteCount: item.voteCount,
        title: item.title,
        id: item.id,
      };

      props.navigation.navigate(nextRoute, params);
    },
    [props.isMovie],
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
