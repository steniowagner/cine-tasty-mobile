import {useCallback, useMemo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

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

export const useSearchMedia = () => {
  const navigation = useNavigation<SearchMediaNavigationProp>();
  const route = useRoute<SearchMediaRouteProp>();
  const recentSearches = useRecentSearches({
    searchType: route.params.searchType,
  });
  const search = useSearch<MediaItem>({
    searchByTextError: route.params.searchByTextError,
    paginationError: route.params.paginationError,
    searchType: route.params.searchType,
    queryId: route.params.queryId,
  });

  const handlePressClose = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleNavigateToMediaDetails = useCallback(
    (item: MediaItem) => {
      const mediaRoute =
        route.params.searchType === SchemaTypes.SearchType.MOVIE
          ? Routes.Home.MOVIE_DETAILS
          : Routes.Home.TV_SHOW_DETAILS;
      navigation.navigate(mediaRoute, {
        posterPath: item.posterPath,
        title: item.title,
        id: item.id,
      });
    },
    [route.params.searchType, navigation.navigate],
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
    placeholder: route.params.placeholder,
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
    searchType: route.params.searchType,
    onPressRecentSearchedItem: handlePressRecentSearchedItem,
    navigation,
  };
};
