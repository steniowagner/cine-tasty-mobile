import { useCallback, useState, useEffect } from 'react';
import { DocumentNode } from 'graphql';

import useImperativeQuery from 'utils/useImperativeQuery';
import { SearchType } from 'types/schema';

import usePaginatedSearch from './usePaginatedSearch';
import useSearchByQuery from './useSearchByQuery';

type State<TDataItems> = {
  onTypeSearchQuery: (value: string) => void;
  onPaginateSearch: () => void;
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
  const [queryResult, setQueryResult] = useState<QueryResult<TDataItems>>({
    hasMore: true,
    items: [],
  });
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
    concatPaginatedItems,
    queryString,
    searchType,
    search,
  });

  const handleOnSearchByQuery = useCallback(async () => {
    const { search: data } = await onSearchByQuery();

    restartPaginatedSearch();

    setQueryResult({
      hasMore: data.hasMore,
      items: data.items,
    });

    setIsLoading(false);
  }, [queryString]);

  useEffect(() => {
    if (queryString) {
      setIsLoading(true);

      handleOnSearchByQuery();
    }
  }, [queryString]);

  const handleOnPaginatedSearch = useCallback(() => {
    if (queryResult.hasMore) {
      onPaginateSearch();
    }
  }, [queryString, queryResult]);

  return {
    onPaginateSearch: handleOnPaginatedSearch,
    items: queryResult.items,
    onTypeSearchQuery,
    isPaginating,
    isLoading,
  };
};
