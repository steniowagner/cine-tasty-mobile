import { useCallback, useState, useEffect } from 'react';
import { DocumentNode } from 'graphql';

import { PaginatedQueryResult, SearchResult, SearchItem } from 'types';
import useImperativeQuery from 'utils/useImperativeQuery';
import { useTranslation } from 'react-i18next';
import { SearchType } from 'types/schema';

import usePaginatedSearch from './usePaginatedSearch';
import useSearchByQuery from './useSearchByQuery';

const INITIAL_QUERY_RESULT = {
  hasMore: true,
  items: [],
};

type State = {
  onTypeSearchQuery: (value: string) => void;
  onPressFooterReloadButton: () => void;
  onPressHeaderReloadButton: () => void;
  onPaginateSearch: () => void;
  t: (text: string) => string;
  hasPaginationError: boolean;
  hasSearchError: boolean;
  isPaginating: boolean;
  errorMessage: string;
  items: SearchItem[];
  isLoading: boolean;
};

type Props = {
  i18nQueryByPaginationErrorRef: string;
  i18nQueryByTextErrorRef: string;
  searchType: SearchType;
  query: DocumentNode;
};

const useSearch = ({
  i18nQueryByPaginationErrorRef,
  i18nQueryByTextErrorRef,
  searchType,
  query,
}: Props): State => {
  const [queryResult, setQueryResult] = useState<PaginatedQueryResult>(
    INITIAL_QUERY_RESULT,
  );
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [hasSearchError, setHasSearchError] = useState<boolean>(false);
  const [queryString, setQueryString] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const search = useImperativeQuery<SearchResult>(query);

  const { t } = useTranslation();

  const { onTypeSearchQuery, onSearchByQuery } = useSearchByQuery({
    setQueryString,
    queryString,
    searchType,
    search,
  });

  const concatPaginatedItems = useCallback(
    (data: SearchResult) => {
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

  const getErrorMessage = useCallback(() => {
    if (hasSearchError) {
      return t(i18nQueryByTextErrorRef);
    }

    if (hasPaginationError) {
      return t(i18nQueryByPaginationErrorRef);
    }

    return '';
  }, [hasSearchError, hasPaginationError]);

  const onPressHeaderReloadButton = useCallback(async (): Promise<void> => {
    if (hasSearchError) {
      setHasSearchError(false);
    }

    await handleOnSearchByQuery();
  }, []);

  return {
    onPressFooterReloadButton: () => setHasPaginationError(false),
    onPaginateSearch: handleOnPaginatedSearch,
    errorMessage: getErrorMessage(),
    onPressHeaderReloadButton,
    items: queryResult.items,
    hasPaginationError,
    onTypeSearchQuery,
    hasSearchError,
    isPaginating,
    isLoading,
    t,
  };
};

export default useSearch;
