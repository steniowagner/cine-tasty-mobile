import {useCallback, useState, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';

import {useGetCurrentISO6391Language} from '@hooks';
import * as SchemaTypes from '@schema-types';
import debounce from '@utils/debounce';
import * as Types from '@local-types';
import {
  FetchMoreQueryOptions,
  OperationVariables,
  FetchMoreOptions,
} from '@apollo/client';

export const PAGINATION_SEARCH_DELAY = 500;

const INITIAL_PAGINATION = {
  isPaginating: false,
  page: 1,
};

type Pagination = {
  isPaginating: boolean;
  page: number;
};

type SearchByPagination = (
  options: FetchMoreQueryOptions<OperationVariables, Types.SearchResult> &
    FetchMoreOptions<Types.SearchResult, OperationVariables>,
) => Promise<{data: Types.SearchResult}>;

type UsePaginatedSearchProps = {
  onSearchByPaginationResult: (result: Types.SearchResult) => void;
  setHasPaginationError: (hasPaginationError: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
  searchByPagination: SearchByPagination;
  i18nQueryByPaginationErrorRef: string;
  searchType: SchemaTypes.SearchType;
  queryString: string;
};

const usePaginatedSearch = ({
  i18nQueryByPaginationErrorRef,
  onSearchByPaginationResult,
  setHasPaginationError,
  searchByPagination,
  setErrorMessage,
  queryString,
  searchType,
}: UsePaginatedSearchProps) => {
  const [pagination, setPagination] = useState<Pagination>(INITIAL_PAGINATION);
  const {currentISO6391Language} = useGetCurrentISO6391Language();
  const {t} = useTranslation();

  const onSearchByPagination = useCallback(
    async (query: string, page: number) => {
      try {
        const result = await searchByPagination({
          variables: {
            input: {
              language: currentISO6391Language,
              type: searchType,
              query,
              page,
            },
          },
        });
        onSearchByPaginationResult(result.data);
        setPagination((previousPagination: Pagination) => ({
          ...previousPagination,
          isPaginating: false,
        }));
      } catch (err) {
        setPagination((previousPagination: Pagination) => ({
          page: previousPagination.page - 1,
          isPaginating: false,
        }));
        setErrorMessage(t(i18nQueryByPaginationErrorRef));
        setHasPaginationError(true);
      }
    },
    [
      i18nQueryByPaginationErrorRef,
      onSearchByPaginationResult,
      currentISO6391Language,
      setHasPaginationError,
      searchByPagination,
      setErrorMessage,
      searchType,
      t,
    ],
  );

  const debouncedPaginateSearch = useRef(
    debounce((queryStringTyped: string, pageSelected: number) => {
      onSearchByPagination(queryStringTyped, pageSelected);
    }, PAGINATION_SEARCH_DELAY),
  ).current;

  useEffect(() => {
    if (pagination.isPaginating) {
      debouncedPaginateSearch(queryString, pagination.page);
    }
  }, [debouncedPaginateSearch, pagination, queryString]);

  const onPaginateSearch = useCallback(() => {
    if (pagination.isPaginating) {
      return;
    }

    setPagination({
      page: pagination.page + 1,
      isPaginating: true,
    });
  }, [pagination]);

  const restartPaginatedSearch = useCallback(() => {
    setPagination(INITIAL_PAGINATION);
  }, []);

  return {
    isPaginating: pagination.isPaginating,
    restartPaginatedSearch,
    onPaginateSearch,
  };
};

export default usePaginatedSearch;
