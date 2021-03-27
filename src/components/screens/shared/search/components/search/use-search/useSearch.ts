import {
  useCallback, useState, useEffect, useMemo,
} from 'react';

import { getQuery } from '@graphql/queries';

import {
  PaginatedQueryResult, CineTastyQuery, SearchResult, SearchItem,
} from 'types';
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
  shouldShowEmptyListAdvise: boolean;
  shouldShowRecentSearches: boolean;
  hasPaginationError: boolean;
  t: (text: string) => string;
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
  queryId: CineTastyQuery;
};

const useSearch = ({
  i18nQueryByPaginationErrorRef,
  i18nQueryByTextErrorRef,
  searchType,
  queryId,
}: Props): State => {
  const [queryResult, setQueryResult] = useState<PaginatedQueryResult>(
    INITIAL_QUERY_RESULT,
  );
  const [isSearchResultEmpty, setIsSearchResultEmpty] = useState<boolean>(false);
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [queryString, setQueryString] = useState<string>('');

  const query = useMemo(() => getQuery(queryId), [queryId]);

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
      setIsSearchResultEmpty(false);

      const { search: data } = await onSearchByQuery(queryString);

      restartPaginatedSearch();

      if (!data.items.length) {
        setIsSearchResultEmpty(true);
      }

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
    shouldShowRecentSearches:
      !queryString && !isLoading && !errorMessage && !queryResult.items.length,
    shouldShowEmptyListAdvise:
      isSearchResultEmpty && !isLoading && !errorMessage && !!queryString,
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
