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
  t: (text: string) => string;
  hasPaginationError: boolean;
  onEndReached: () => void;
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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [queryString, setQueryString] = useState<string>('');

  const search = useImperativeQuery<SearchResult>(query);

  const { t } = useTranslation();

  const { onTypeSearchQuery, onSearchByQuery, isLoading } = useSearchByQuery({
    setQueryString,
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

  const onPaginationError = useCallback(() => {
    setErrorMessage(i18nQueryByPaginationErrorRef);
    setHasPaginationError(true);
  }, []);

  const { restartPaginatedSearch, onPaginateSearch, isPaginating } = usePaginatedSearch({
    onError: onPaginationError,
    concatPaginatedItems,
    queryString,
    searchType,
    search,
  });

  const handleOnSearchByQuery = useCallback(async () => {
    try {
      const { search: data } = await onSearchByQuery(queryString);

      restartPaginatedSearch();

      setQueryResult({
        hasMore: data.hasMore,
        items: data.items,
      });
    } catch (error) {
      setErrorMessage(i18nQueryByTextErrorRef);
    }
  }, [queryString]);

  const onPressHeaderReloadButton = useCallback(async (): Promise<void> => {
    setErrorMessage('');

    await handleOnSearchByQuery();
  }, [queryString]);

  const onPressFooterReloadButton = useCallback(() => {
    setHasPaginationError(false);

    setErrorMessage('');

    if (queryResult.hasMore && queryResult.items.length > 0) {
      onPaginateSearch();
    }
  }, [hasPaginationError, queryResult]);

  const handleOnPaginatedSearch = useCallback(() => {
    if (queryResult.hasMore && !hasPaginationError) {
      onPressFooterReloadButton();
    }
  }, [hasPaginationError, queryResult]);

  useEffect(() => {
    setHasPaginationError(false);

    setQueryResult(INITIAL_QUERY_RESULT);

    if (queryString) {
      handleOnSearchByQuery();
    }
  }, [queryString]);

  return {
    onEndReached: handleOnPaginatedSearch,
    onPressFooterReloadButton,
    onPressHeaderReloadButton,
    items: queryResult.items,
    hasPaginationError,
    onTypeSearchQuery,
    errorMessage,
    isPaginating,
    isLoading,
    t,
  };
};

export default useSearch;
