import { useEffect, useMemo, useCallback } from 'react';
import { FetchPolicy } from 'apollo-client';
import { DocumentNode } from 'graphql';

import useImperativeQuery from '@utils/useImperativeQuery';

import useQueryWithPagination from './useQueryWithPagination';
import useEntryQuery from './useEntryQuery';

type Props<TData, TVariables> = {
  variables?: Omit<TVariables, 'page'>;
  fireEntryQueryWhenMounted?: boolean;
  onGetData: (data: TData) => boolean;
  onPaginationQueryError: () => void;
  onEntryQueryError: () => void;
  fetchPolicy?: FetchPolicy;
  query: DocumentNode;
};

type BaseVariables = {
  page: number;
};

export const usePaginatedQuery = <TData, TVariables>({
  fireEntryQueryWhenMounted = true,
  onPaginationQueryError,
  onEntryQueryError,
  fetchPolicy,
  onGetData,
  variables,
  query,
}: Props<TData, TVariables>) => {
  const execQuery = useImperativeQuery<TData, TVariables & BaseVariables>(
    query,
    fetchPolicy,
  );

  const baseParams = useMemo(
    () => ({
      onGetData: (data: TData): boolean => onGetData(data),
      variables,
      execQuery,
    }),
    [onGetData, variables, execQuery],
  );

  const {
    setHasMoreFromEntryQuery,
    exec: execPaginateQuery,
    restartPagination,
    isPaginating,
  } = useQueryWithPagination<TData, Omit<TVariables, 'page'>>({
    ...baseParams,
    onError: () => onPaginationQueryError(),
  });

  const { exec: execEntryQuery, isLoading } = useEntryQuery<
    TData,
    Omit<TVariables, 'page'>
  >({
    ...baseParams,
    setPaginationHasMore: setHasMoreFromEntryQuery,
    onError: () => onEntryQueryError(),
  });

  useEffect(() => {
    if (fireEntryQueryWhenMounted) {
      execEntryQuery();
    }
  }, []);

  const onReloadData = useCallback(async () => {
    restartPagination();

    await execEntryQuery(variables);
  }, [variables]);

  return {
    onPaginateQuery: execPaginateQuery,
    onReloadData,
    isPaginating,
    isLoading,
  };
};
