import {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { ApolloQueryResult } from 'apollo-client';

import debounce from '@utils/debounce';

export const PAGINATION_DELAY = 1000;

const initialPagination: Pagination = {
  isPaginating: false,
  hasMore: true,
  page: 1,
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

const useQueryWithPagination = <TData, TVariables>(props: Props<TData, TVariables>) => {
  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  const onPaginateQuery = useCallback(
    async (pageSelected: number, variablesUpdated: TVariables) => {
      try {
        const queryVariables = {
          ...variablesUpdated,
          page: pageSelected,
        };

        const { data } = await props.execQuery(queryVariables);

        const hasMore = props.onGetData(data);

        setPagination((previousPagination: Pagination) => ({
          ...previousPagination,
          isPaginating: false,
          hasMore,
        }));
      } catch (err) {
        // eslint-disable-next-line no-console
        props.onError();

        setPagination((previousPagination: Pagination) => ({
          page: previousPagination.page - 1,
          isPaginating: false,
          hasMore: true,
        }));
      }
    },
    [],
  );

  const debouncedPaginateSearch = useRef(
    debounce((pageSelected: number, variablesUpdated: TVariables) => {
      onPaginateQuery(pageSelected, variablesUpdated);
    }, PAGINATION_DELAY),
  ).current;

  useEffect(() => {
    if (pagination.isPaginating) {
      const variables = props.variables || ({} as TVariables);
      debouncedPaginateSearch(pagination.page, variables);
    }
  }, [pagination]);

  const exec = useCallback(() => {
    if (!pagination.hasMore || pagination.isPaginating) {
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

  const setHasMoreFromEntryQuery = useCallback((hasMore: boolean) => {
    setPagination({
      ...initialPagination,
      hasMore,
    });
  }, []);

  return {
    isPaginating: pagination.isPaginating,
    setHasMoreFromEntryQuery,
    restartPagination,
    exec,
  };
};

export default useQueryWithPagination;
