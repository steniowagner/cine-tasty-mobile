import {useCallback, useMemo} from 'react';

import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';

import {
  useRecentSearches,
  RecentSearchItem,
} from '../components/recent-searches/useRecentSearches';
import {
  SearchMediaNavigationProp,
  SearchMediaRouteProp,
} from './routes/route-params-types';
import {useSearch} from '../useSearch';

type MediaItem =
  | SchemaTypes.SearchMovie_search_items_BaseMovie
  | SchemaTypes.SearchTVShow_search_items_BaseTVShow;

export type UseSearchMediaProps = {
  navigation: SearchMediaNavigationProp;
  route: SearchMediaRouteProp;
};

export const useSearchMedia = (props: UseSearchMediaProps) => {
  const recentSearches = useRecentSearches({
    searchType: props.route.params.searchType,
  });
  const search = useSearch<MediaItem>({
    searchByTextError: props.route.params.searchByTextError,
    paginationError: props.route.params.paginationError,
    searchType: props.route.params.searchType,
    queryId: props.route.params.queryId,
  });

  const handlePressClose = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const handleNavigateToMediaDetails = useCallback(
    (item: MediaItem) => {
      const mediaRoute =
        props.route.params.searchType === SchemaTypes.SearchType.MOVIE
          ? Routes.Home.MOVIE_DETAILS
          : Routes.Home.TV_SHOW_DETAILS;
      props.navigation.navigate(mediaRoute, {
        posterPath: item.posterPath,
        title: item.title,
        id: item.id,
      });
    },
    [props.route.params.searchType, props.navigation.navigate],
  );

  const handlePressItem = useCallback(
    async (item: MediaItem) => {
      recentSearches.add({
        image: item.posterPath,
        title: item.title,
        id: item.id,
      });
      handleNavigateToMediaDetails(item);
    },
    [handleNavigateToMediaDetails, recentSearches.add],
  );

  const handlePressRecentSearchedItem = useCallback(
    (item: RecentSearchItem) => {
      handleNavigateToMediaDetails({
        posterPath: item.image,
        title: item.title,
        id: item.id,
      } as MediaItem);
    },
    [handleNavigateToMediaDetails],
  );

  const shouldShowBottomReloadButton = useMemo(
    () =>
      !!search.dataset.length &&
      (search.hasPaginationError || search.isPaginating),
    [search.dataset, search.hasPaginationError, search.isPaginating],
  );

  const shouldShowTopReloadButton = useMemo(
    () => !search.dataset.length && !!search.error && !search.isLoading,
    [search.dataset, search.error, search.isLoading],
  );

  return {
    onTypeSearchQuery: search.onTypeSearchQuery,
    onPressClose: handlePressClose,
    placeholder: props.route.params.placeholder,
    items: search.dataset,
    onPressItem: handlePressItem,
    onEndReached: search.onEndReached,
    isPaginating: search.isPaginating,
    shouldShowBottomReloadButton,
    hasPaginationError: search.hasPaginationError,
    onPressTopReloadButton: search.onPressTopReloadButton,
    onPressFooterReloadButton: search.onPressFooterReloadButton,
    shouldShowTopReloadButton,
    isResultsEmpty: search.isResultsEmpty,
    isLoading: search.isLoading,
    shouldShowRecentSearches: search.shouldShowRecentSearches,
    searchType: props.route.params.searchType,
    onPressRecentSearchedItem: handlePressRecentSearchedItem,
  };
};
