import {useCallback, useMemo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';

import {
  SearchNavigationProp,
  SearchRouteProp,
} from '../../../routes/route-params-types';
import {useSearch} from '../useSearch';

type MediaItem =
  | SchemaTypes.SearchMovie_search_items_BaseMovie
  | SchemaTypes.SearchTVShow_search_items_BaseTVShow;

export const useSearchMedia = () => {
  const navigation = useNavigation<SearchNavigationProp>();
  const route = useRoute<SearchRouteProp>();

  const search = useSearch<MediaItem>({
    searchByTextError: route.params.searchByTextError,
    paginationError: route.params.paginationError,
    searchType: route.params.searchType,
    queryId: route.params.queryId,
  });

  const handlePressClose = useCallback(() => {
    navigation.goBack();
  }, []);

  const handlePressItem = useCallback(
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
    [route.params.searchType],
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
    navigation,
  };
};
