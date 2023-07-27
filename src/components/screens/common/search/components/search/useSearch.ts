import {useCallback, useState, useMemo} from 'react';

import {useTranslations, usePagination} from '@hooks';
import * as SchemaTypes from '@schema-types';
import {getQuery} from '@graphql/queries';
import * as Types from '@local-types';

import useSearchByQuery from './useSearchByQuery';

type SearchVariables = {
  input: Omit<SchemaTypes.SearchInput, 'page'>;
};

type UseSearchProps = {
  searchType: SchemaTypes.SearchType;
  queryId: Types.CineTastyQuery;
  searchByTextError: string;
  paginationError: string;
};

export const useSearch = (props: UseSearchProps) => {
  const [query, setQuery] = useState('');

  const translations = useTranslations();

  const handleOnGetData = useCallback(
    (result: Types.SearchResult) => ({
      hasMore: result?.search.hasMore || false,
      dataset: result?.search.items || [],
    }),
    [],
  );

  const variables = useMemo(
    () => ({
      input: {
        language: translations.language,
        type: props.searchType,
        query,
      },
    }),
    [translations.language, props.searchType, query],
  );

  const pagination = usePagination<
    Types.SearchResult,
    Types.SearchItem,
    SearchVariables
  >({
    entryQueryError: props.searchByTextError,
    paginationError: props.paginationError,
    skipCurrentVariableUpdate: !query,
    query: getQuery(props.queryId),
    onGetData: handleOnGetData,
    fetchPolicy: 'no-cache',
    skipFirstRun: true,
    variables,
  });

  const searchByQuery = useSearchByQuery({
    resetSearch: pagination.resetPaginationState,
    setQuery,
    query,
  });

  const shouldShowRecentSearches = useMemo(
    () =>
      !query &&
      !pagination.isLoading &&
      !pagination.error &&
      !pagination.dataset.length,
    [pagination.dataset, pagination.isLoading, pagination.error, query],
  );

  return {
    onTypeSearchQuery: searchByQuery.onTypeSearchQuery,
    hasPaginationError: pagination.hasPaginationError,
    onPressFooterReloadButton: pagination.paginate,
    onPressTopReloadButton: pagination.reset,
    isPaginating: pagination.isPaginating,
    onEndReached: pagination.paginate,
    isLoading: pagination.isLoading,
    dataset: pagination.dataset,
    shouldShowRecentSearches,
    error: pagination.error,
  };
};
