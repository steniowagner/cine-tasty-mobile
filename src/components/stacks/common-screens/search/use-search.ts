import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { usePagination, useTranslation } from '@/hooks';
import {
  SearchTVShows_search_items as SearchTVShowsResultItem,
  SearchFamous_search_items as SearchFamousResultItem,
  SearchMovies_search_items as SearchMoviesResultItem,
  SearchFamousVariables,
  SearchMoviesVariables,
  SearchTVShowsVariables,
} from '@schema-types';

import { useRecentSearches } from './components/recent-searches/use-recent-searches';
import { SearchItem, SearchNavigationProps as UseSearchParams } from './types';
import { getSearchConfig } from './search-config/search-config';
import { debounce } from './debounce';

export const SEARCH_BY_QUERY_DELAY = 1000;

type SearchVariables = Omit<
  SearchFamousVariables | SearchMoviesVariables | SearchTVShowsVariables,
  'page'
>;

type SearchResultItem =
  | SearchTVShowsResultItem
  | SearchFamousResultItem
  | SearchMoviesResultItem;

type SearchResult = {
  search: {
    items: SearchResultItem[];
    hasMore: boolean;
  };
};

export const useSearch = (params: UseSearchParams) => {
  const [query, setQuery] = useState('');

  const translation = useTranslation();
  const recentSearches = useRecentSearches({
    searchType: params.route.params.type,
  });

  const searchConfig = useMemo(
    () => getSearchConfig(params.route.params.type),
    [params.route.params.type],
  );

  const handleOnGetData = useCallback(
    (result: SearchResult) => ({
      hasMore: result.search.hasMore || false,
      dataset: result.search.items || [],
    }),
    [],
  );

  const variables = useMemo(
    () =>
      ({
        input: {
          language: translation.currentLanguage,
          query,
        },
      } as SearchVariables),
    [translation.currentLanguage, params.route.params, query],
  );

  const texts = useMemo(
    () => ({
      placeholder: translation.translate(searchConfig.searchPlaceholder),
      errors: {
        entry: translation.translate(searchConfig.searchByTextError),
        pagination: translation.translate(searchConfig.paginationError),
      },
    }),
    [translation.translate, searchConfig],
  );

  const pagination = usePagination<
    SearchResult,
    SearchResultItem,
    SearchVariables
  >({
    errorMessageIcon: 'alert-box',
    fetchPolicy: 'no-cache',
    entryError: texts.errors.entry,
    paginationError: texts.errors.pagination,
    query: searchConfig.query,
    onGetData: handleOnGetData,
    skipFirstRun: true,
    variables,
  });

  const handleSelectItem = useCallback(
    async (item: Partial<SearchItem>) => {
      await recentSearches.add(item);
      searchConfig.navigateToDetails(item, params.navigation);
    },
    [recentSearches.add, params.navigation],
  );

  const debouncedSetQueryString = useRef(
    debounce(async (queryTyped: string) => {
      if (!queryTyped && !query) {
        pagination.resetState();
      }
      setQuery(queryTyped.trim());
    }, SEARCH_BY_QUERY_DELAY),
  ).current;

  const handleTypeSearchQuery = useCallback(
    (queryString: string) => {
      debouncedSetQueryString(queryString);
    },
    [debouncedSetQueryString],
  );

  useEffect(() => {
    if (variables.input.query) {
      pagination.retryEntryQuery();
    }
  }, [variables]);

  return {
    shouldShowRecentSearches:
      !query &&
      !pagination.isLoading &&
      !pagination.error &&
      !pagination.dataset.length,
    onTypeSearchQuery: handleTypeSearchQuery,
    placeholder: texts.placeholder,
    onPressItem: handleSelectItem,
    isLoading: pagination.isLoading,
    items: pagination.dataset,
    onEndReached: pagination.paginate,
    iconImageLoading: searchConfig.iconImageLoading,
    isPaginating: pagination.isPaginating,
    hasPaginationError: pagination.hasPaginationError,
    onPressBottomReloadButton: pagination.retryPagination,
    onPressTopReloadButton: pagination.retryEntryQuery,
    shouldShowBottomReloadButton:
      !!pagination.dataset.length &&
      (pagination.hasPaginationError || pagination.isPaginating),
    shouldShowTopReloadButton:
      !pagination.dataset.length && !!pagination.error && !pagination.isLoading,
  };
};
