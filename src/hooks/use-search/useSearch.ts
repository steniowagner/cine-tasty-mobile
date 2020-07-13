import { useCallback, useState, useEffect } from 'react';
import { DocumentNode } from 'graphql';

import useImperativeQuery from 'utils/useImperativeQuery';
import { SearchType } from 'types/schema';

import usePaginatedSearch from './usePaginatedSearch';
import useSearchByQuery from './useSearchByQuery';

const INITIAL_QUERY_RESULT = {
  hasMore: true,
  items: [],
};

type State<TDataItems> = {
  onTypeSearchQuery: (value: string) => void;
  onReloadPagination: () => void;
  onPaginateSearch: () => void;
  hasPaginationError: boolean;
  hasSearchError: boolean;
  isPaginating: boolean;
  items: TDataItems[];
  isLoading: boolean;
};

type Props = {
  onSetQueryString: (queryString: string) => void;
  searchType: SearchType;
  query: DocumentNode;
  queryString: string;
};

type QueryResult<TDataItems> = {
  items: TDataItems[];
  hasMore: boolean;
};

type BaseSearchResult<TDataItems> = { search: QueryResult<TDataItems> };

export const useSearch = <TData extends BaseSearchResult<TDataItems>, TDataItems>({
  onSetQueryString,
  queryString,
  searchType,
  query,
}: Props): State<TDataItems> => {
  const [queryResult, setQueryResult] = useState<QueryResult<TDataItems>>(
    INITIAL_QUERY_RESULT,
  );
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [hasSearchError, setHasSearchError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const search = useImperativeQuery<TData>(query);

  const { onTypeSearchQuery, onSearchByQuery } = useSearchByQuery<TData>({
    onSetQueryString,
    queryString,
    searchType,
    search,
  });

  const concatPaginatedItems = useCallback(
    (data: TData) => {
      setQueryResult((previousQueryResult) => ({
        items: [...previousQueryResult.items, ...data.search.items],
        hasMore: data.search.hasMore,
      }));
    },
    [queryResult],
  );

  const { restartPaginatedSearch, onPaginateSearch, isPaginating } = usePaginatedSearch({
    setHasError: () => setHasPaginationError(true),
    concatPaginatedItems,
    queryString,
    searchType,
    search,
  });

  const handleOnSearchByQuery = useCallback(async () => {
    try {
      const { search: data } = await onSearchByQuery();

      restartPaginatedSearch();

      setQueryResult({
        hasMore: data.hasMore,
        items: data.items,
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      setHasSearchError(true);
    }
  }, [queryString]);

  useEffect(() => {
    if (hasSearchError) {
      setHasSearchError(false);
    }

    if (hasPaginationError) {
      setHasPaginationError(false);
    }

    setQueryResult(INITIAL_QUERY_RESULT);

    if (queryString) {
      setIsLoading(true);

      handleOnSearchByQuery();
    }
  }, [queryString]);

  const handleOnPaginatedSearch = useCallback(() => {
    if (queryResult.hasMore && !hasPaginationError) {
      onPaginateSearch();
    }
  }, [hasPaginationError, queryResult]);

  useEffect(() => {
    if (!hasPaginationError && queryResult.hasMore && queryResult.items.length > 0) {
      onPaginateSearch();
    }
  }, [hasPaginationError]);

  return {
    onReloadPagination: () => setHasPaginationError(false),
    onPaginateSearch: handleOnPaginatedSearch,
    items: queryResult.items,
    hasPaginationError,
    onTypeSearchQuery,
    hasSearchError,
    isPaginating,
    isLoading,
  };
};
