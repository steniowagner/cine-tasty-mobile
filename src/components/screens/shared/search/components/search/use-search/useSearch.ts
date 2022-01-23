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
  const [errorMessage, setErrorMessage] = useState('');
  const [queryString, setQueryString] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);

  const {t} = useTranslation();

  useEffect(() => {
    console.log('>>> items: ', items);
  }, [items]);

  const handleSearchByQueryResult = useCallback(
    (result: Types.SearchResult) => {
      setItems(result.search.items);

      if (!result.search.items.length) {
        setIsSearchResultEmpty(true);
      }
    },
    [],
  );

  const onSearchCompleted = useCallback(
    (result: Types.SearchResult) => {
      if (!items.length && !!queryString) {
        return handleSearchByQueryResult(result);
      }
    },
    [handleSearchByQueryResult, queryString, items],
  );

  const [search, {loading}] = useLazyQuery<Types.SearchResult>(
    getQuery(queryId),
    {
      onCompleted: onSearchCompleted,
    },
  );

  const {onTypeSearchQuery, onSearchByQuery} = useSearchByQuery({
    setQueryString,
    searchType,
    search,
  });

  const handlSearchByQuery = useCallback(async () => {
    try {
      setIsSearchResultEmpty(false);
      setItems([]);
      await onSearchByQuery(queryString);
      //restartPaginatedSearch();
    } catch (error) {
      setErrorMessage(t(i18nQueryByTextErrorRef));
    }
  }, [i18nQueryByTextErrorRef, onSearchByQuery, queryString, t]);

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

  return {
    shouldShowRecentSearches: false,
    // !queryString && !isLoading && !errorMessage && !queryResult.items.length,
    shouldShowEmptyListAdvise:
      isSearchResultEmpty && !loading && !errorMessage && !!queryString,
    onEndReached: () => {},
    onPressFooterReloadButton: () => {},
    onPressHeaderReloadButton,
    items: items,
    hasPaginationError,
    onTypeSearchQuery,
    errorMessage,
    isPaginating: false,
    isLoading: loading,
    t,
  };
};

export default useSearch;
