import {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { ApolloQueryResult } from 'apollo-client';

import { SearchInput, SearchType } from 'types/schema';
import debounce from 'utils/debounce';
import { SearchResult } from 'types';

export const PAGINATION_SEARCH_DELAY = 500;

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

type Props = {
  search: (variables: TVariables) => Promise<ApolloQueryResult<SearchResult>>;
  concatPaginatedItems: (data: SearchResult) => void;
  searchType: SearchType;
  onError: () => void;
  queryString: string;
};

const usePaginatedSearch = ({
  concatPaginatedItems,
  queryString,
  searchType,
  onError,
  search,
}: Props): State => {
  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  const onSearchByPagination = useCallback(
    async ({ queryStringTyped, pageSelected }: DebouncedPaginationProps) => {
      try {
        const variables = {
          input: { page: pageSelected, query: queryStringTyped, type: searchType },
        };
        const { data } = await search(variables);

        setPagination((previousPagination: Pagination) => ({
          ...previousPagination,
          isPaginating: false,
        }));

        if (!data) {
          return;
        }

        concatPaginatedItems(data);
      } catch (err) {
        setPagination((previousPagination: Pagination) => ({
          page: previousPagination.page - 1,
          isPaginating: false,
        }));

        onError();
      }
    },
    [],
  );

  const debouncedPaginateSearch = useRef(
    debounce(({ queryStringTyped, pageSelected }: DebouncedPaginationProps) => {
      onSearchByPagination({ queryStringTyped, pageSelected });
    }, PAGINATION_SEARCH_DELAY),
  ).current;

  useEffect(() => {
    if (pagination.isPaginating) {
      debouncedPaginateSearch({
        queryStringTyped: queryString,
        pageSelected: pagination.page,
      });
    }
  }, [pagination]);

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
  }, []);

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
