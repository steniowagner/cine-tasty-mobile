import {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { ApolloQueryResult } from 'apollo-client';

import { SearchInput, SearchType } from 'types/schema';
import debounce from 'utils/debounce';

const SEARCH_DELAY = 250;

const initialPagination: Pagination = {
  isPaginating: false,
  page: 1,
};

type State = {
  restartPaginatedSearch: () => void;
  onPaginateSearch: () => void;
  isPaginating: boolean;
};

type DebouncedPaginationProps = {
  queryStringTyped: string;
  pageSelected: number;
};

type Pagination = {
  isPaginating: boolean;
  page: number;
};

type TVariables = {
  input: SearchInput;
};

type Props<TData> = {
  search: (variables: TVariables) => Promise<ApolloQueryResult<TData>>;
  concatPaginatedItems: (data: TData) => void;
  searchType: SearchType;
  queryString: string;
};

const usePaginatedSearch = <TData>({
  concatPaginatedItems,
  queryString,
  searchType,
  search,
}: Props<TData>): State => {
  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  const onPaginateSearch = useCallback(() => {
    setPagination((previousPagination: Pagination) => {
      if (previousPagination.isPaginating) {
        return previousPagination;
      }

      return {
        page: previousPagination.page + 1,
        isPaginating: true,
      };
    });
  }, [pagination]);

  const onSearchByPagination = useCallback(
    async ({ queryStringTyped, pageSelected }: DebouncedPaginationProps) => {
      const variables = {
        input: { page: pageSelected, query: queryStringTyped, type: searchType },
      };

      const { data } = await search(variables);

      if (!data) {
        return;
      }

      setPagination((previousPagination: Pagination) => ({
        ...previousPagination,
        isPaginating: false,
      }));

      concatPaginatedItems(data);
    },
    [],
  );

  const debouncedPaginateSearch = useRef(
    debounce(({ queryStringTyped, pageSelected }: DebouncedPaginationProps) => {
      onSearchByPagination({ queryStringTyped, pageSelected });
    }, SEARCH_DELAY),
  ).current;

  useEffect(() => {
    if (pagination.isPaginating) {
      debouncedPaginateSearch({
        queryStringTyped: queryString,
        pageSelected: pagination.page,
      });
    }
  }, [pagination]);

  const restartPaginatedSearch = useCallback(() => {
    setPagination(initialPagination);
  }, []);

  return {
    isPaginating: pagination.isPaginating,
    restartPaginatedSearch,
    onPaginateSearch,
  };
};

export default usePaginatedSearch;
