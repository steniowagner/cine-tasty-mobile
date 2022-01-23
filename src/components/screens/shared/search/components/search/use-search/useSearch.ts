import {useCallback, useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import {useLazyQuery} from '@apollo/client';
import {getQuery} from '@graphql/queries';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import usePaginatedSearch from './usePaginatedSearch';
import useSearchByQuery from './useSearchByQuery';

type UseSearchProps = {
  i18nQueryByPaginationErrorRef: string;
  searchType: SchemaTypes.SearchType;
  i18nQueryByTextErrorRef: string;
  queryId: Types.CineTastyQuery;
};

const useSearch = ({
  i18nQueryByPaginationErrorRef,
  i18nQueryByTextErrorRef,
  searchType,
  queryId,
}: UseSearchProps) => {
  const [isSearchResultEmpty, setIsSearchResultEmpty] = useState(false);
  const [hasPaginationError, setHasPaginationError] = useState(false);
  const [items, setItems] = useState<Types.SearchItem[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [queryString, setQueryString] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const {t} = useTranslation();

  const handleSearchByPaginationResult = useCallback(
    (result: Types.SearchResult) => {
      setItems((previousItems: Types.SearchItem[]) => [
        ...previousItems,
        ...result.search.items,
      ]);
      setHasMore(result.search.hasMore);
    },
    [],
  );

  const onSearchByQueryCompleted = useCallback(
    (result: Types.SearchResult) => {
      if (!!items.length || !queryString) {
        return;
      }

      setHasMore(result.search.hasMore);
      setItems(result.search.items);

      if (!result.search.items.length) {
        setIsSearchResultEmpty(true);
      }
    },
    [queryString, items],
  );

  const [searchByQuery, {loading, fetchMore: searchByPagination}] =
    useLazyQuery<Types.SearchResult>(getQuery(queryId), {
      onCompleted: onSearchByQueryCompleted,
    });

  const {onTypeSearchQuery, onSearchByQuery} = useSearchByQuery({
    setQueryString,
    searchType,
    searchByQuery,
  });

  const {restartPaginatedSearch, onPaginateSearch, isPaginating} =
    usePaginatedSearch({
      onSearchByPaginationResult: handleSearchByPaginationResult,
      i18nQueryByPaginationErrorRef,
      setHasPaginationError,
      searchByPagination,
      setErrorMessage,
      queryString,
      searchType,
    });

  const handlSearchByQuery = useCallback(async () => {
    try {
      setIsSearchResultEmpty(false);
      setItems([]);
      await onSearchByQuery(queryString);
      restartPaginatedSearch();
    } catch (error) {
      setErrorMessage(t(i18nQueryByTextErrorRef));
    }
  }, [
    i18nQueryByTextErrorRef,
    restartPaginatedSearch,
    onSearchByQuery,
    queryString,
    t,
  ]);

  useEffect(() => {
    setHasPaginationError(false);
    setHasMore(true);
    setItems([]);

    if (queryString) {
      handlSearchByQuery();
    }
  }, [handlSearchByQuery, queryString]);

  const onPressHeaderReloadButton = useCallback(async (): Promise<void> => {
    setErrorMessage('');
    await handlSearchByQuery();
  }, [handlSearchByQuery]);

  const handlePagination = useCallback(() => {
    setHasPaginationError(false);
    setErrorMessage('');

    if (hasMore && items.length > 0) {
      onPaginateSearch();
    }
  }, [onPaginateSearch, hasMore, items]);

  const onEndReached = useCallback(() => {
    if (hasMore && !hasPaginationError) {
      handlePagination();
    }
  }, [hasPaginationError, handlePagination, hasMore]);

  return {
    shouldShowRecentSearches:
      !queryString && !loading && !errorMessage && !items.length,
    shouldShowEmptyListAdvise:
      isSearchResultEmpty && !loading && !errorMessage && !!queryString,
    onEndReached,
    onPressFooterReloadButton: handlePagination,
    onPressHeaderReloadButton,
    isLoading: loading,
    hasPaginationError,
    onTypeSearchQuery,
    items: items,
    isPaginating,
    errorMessage,
    t,
  };
};

export default useSearch;
