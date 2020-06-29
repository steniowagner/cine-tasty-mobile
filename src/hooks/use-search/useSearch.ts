import { useCallback, useState, useEffect } from 'react';
import { DocumentNode } from 'graphql';

import { SearchType } from 'types/schema';

import useSearchByQuery from './useSearchByQuery';

type State<TDataItems> = {
  onTypeSearchQuery: (value: string) => void;
  isLoading: boolean;
  items: TDataItems[];
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

export const useSearch = <TDataResult extends BaseSearchResult<TDataItems>, TDataItems>({
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

  const { onTypeSearchQuery, onSearchByQuery } = useSearchByQuery<TDataResult>({
    onSetQueryString,
    queryString,
    searchType,
    query,
  });

  const handleOnSearchByQuery = useCallback(async () => {
    const { search } = await onSearchByQuery();

    setQueryResult({
      hasMore: search.hasMore,
      items: search.items,
    });

    setIsLoading(false);
  }, [queryString]);

  useEffect(() => {
    if (queryString) {
      setIsLoading(true);

      handleOnSearchByQuery();
    }
  }, [queryString]);

  return {
    items: queryResult.items,
    onTypeSearchQuery,
    isLoading,
  };
};
