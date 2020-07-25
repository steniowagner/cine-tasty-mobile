import {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { ApolloQueryResult } from 'apollo-client';

import debounce from 'utils/debounce';

const PAGINATION_DELAY = 500;

const initialPagination: Pagination = {
  isPaginating: false,
  hasMore: true,
  page: 1,
};

type State = {
  restartPagination: () => void;
  isPaginating: boolean;
  exec: () => void;
};

type Pagination = {
  isPaginating: boolean;
  hasMore: boolean;
  page: number;
};

type Props<TData, TVariables> = {
  execQuery: (variables: TVariables) => Promise<ApolloQueryResult<TData>>;
  onGetData: (data: TData) => boolean;
  variables?: TVariables;
  onError: () => void;
};

const useQueryWithPagination = <TData, TVariables>({
  variables = {} as TVariables,
  onGetData,
  execQuery,
  onError,
}: Props<TData, TVariables>): State => {
  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  const onPaginateQuery = useCallback(async (pageSelected: number) => {
    try {
      const queryVariables = {
        ...variables,
        page: pageSelected,
      };

      const { data } = await execQuery(queryVariables);

      const hasMore = onGetData(data);

      setPagination((previousPagination: Pagination) => ({
        ...previousPagination,
        isPaginating: false,
        hasMore,
      }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('useQueryWithPagination/onPaginateQuery: ', err);

      onError();

      setPagination((previousPagination: Pagination) => ({
        page: previousPagination.page - 1,
        isPaginating: false,
        hasMore: true,
      }));
    }
  }, []);

  const debouncedPaginateSearch = useRef(
    debounce((pageSelected: number) => {
      onPaginateQuery(pageSelected);
    }, PAGINATION_DELAY),
  ).current;

  useEffect(() => {
    if (pagination.isPaginating) {
      debouncedPaginateSearch(pagination.page);
    }
  }, [pagination]);

  const exec = useCallback(() => {
    if (!pagination.hasMore) {
      return;
    }

    setPagination((previousPagination: Pagination) => {
      if (previousPagination.isPaginating) {
        return previousPagination;
      }

      return {
        ...previousPagination,
        page: previousPagination.page + 1,
        isPaginating: true,
      };
    });
  }, [pagination]);

  const restartPagination = useCallback(() => {
    setPagination(initialPagination);
  }, []);

  return {
    isPaginating: pagination.isPaginating,
    restartPagination,
    exec,
  };
};

export default useQueryWithPagination;
