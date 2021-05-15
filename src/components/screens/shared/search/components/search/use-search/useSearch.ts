import {
  useCallback, useState, useEffect, useMemo,
} from 'react';

import { useTranslation } from 'react-i18next';
import { getQuery } from '@graphql/queries';

import useImperativeQuery from '@utils/useImperativeQuery';
import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import usePaginatedSearch from './usePaginatedSearch';
import useSearchByQuery from './useSearchByQuery';

const INITIAL_QUERY_RESULT = {
  hasMore: true,
  items: [],
};

type UseSearchProps = {
  i18nQueryByPaginationErrorRef: string;
  searchType: SchemaTypes.SearchType;
  i18nQueryByTextErrorRef: string;
  queryId: Types.CineTastyQuery;
};

const useSearch = (props: UseSearchProps) => {
  const [queryResult, setQueryResult] = useState<Types.PaginatedQueryResult>(
    INITIAL_QUERY_RESULT,
  );
  const [isSearchResultEmpty, setIsSearchResultEmpty] = useState<boolean>(false);
  const [hasPaginationError, setHasPaginationError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [queryString, setQueryString] = useState<string>('');

  const query = useMemo(() => getQuery(props.queryId), [props.queryId]);

  const search = useImperativeQuery<Types.SearchResult>(query);

  const { t } = useTranslation();

  const searchByQuery = useSearchByQuery({
    searchType: props.searchType,
    setQueryString,
    search,
  });

  const concatPaginatedItems = useCallback(
    (data: Types.SearchResult) => {
      setQueryResult((previousQueryResult) => ({
        items: [...previousQueryResult.items, ...data.search.items],
        hasMore: data.search.hasMore,
      }));
    },
    [queryResult],
  );

  const onPaginationError = useCallback(() => {
    setErrorMessage(props.i18nQueryByPaginationErrorRef);
    setHasPaginationError(true);
  }, []);

  const paginatedSearch = usePaginatedSearch({
    searchType: props.searchType,
    onError: onPaginationError,
    concatPaginatedItems,
    queryString,
    search,
  });

  const handleOnSearchByQuery = useCallback(async () => {
    try {
      setIsSearchResultEmpty(false);

      const { search: data } = await searchByQuery.onSearchByQuery(queryString);

      paginatedSearch.restartPaginatedSearch();

      if (!data.items.length) {
        setIsSearchResultEmpty(true);
      }

      setQueryResult({
        hasMore: data.hasMore,
        items: data.items,
      });
    } catch (error) {
      setErrorMessage(props.i18nQueryByTextErrorRef);
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
      paginatedSearch.onPaginateSearch();
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

  const shouldShowRecentSearches = useMemo(
    () => !queryString
      && !searchByQuery.isLoading
      && !errorMessage
      && !queryResult.items.length,
    [queryString, searchByQuery.isLoading, errorMessage, queryResult.items],
  );

  const shouldShowEmptyListAdvise = useMemo(
    () => isSearchResultEmpty && !searchByQuery.isLoading && !errorMessage && !!queryString,
    [isSearchResultEmpty, searchByQuery.isLoading, errorMessage, queryString],
  );

  return {
    onTypeSearchQuery: searchByQuery.onTypeSearchQuery,
    isPaginating: paginatedSearch.isPaginating,
    onEndReached: handleOnPaginatedSearch,
    isLoading: searchByQuery.isLoading,
    shouldShowEmptyListAdvise,
    shouldShowRecentSearches,
    onPressFooterReloadButton,
    onPressHeaderReloadButton,
    items: queryResult.items,
    hasPaginationError,
    errorMessage,
    t,
  };
};

export default useSearch;
