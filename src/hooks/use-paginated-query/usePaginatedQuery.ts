import { useEffect, useMemo, useCallback } from 'react';
import { FetchPolicy } from 'apollo-client';
import { DocumentNode } from 'graphql';

import useImperativeQuery from 'utils/useImperativeQuery';

import useQueryWithPagination from './useQueryWithPagination';
import useEntryQuery from './useEntryQuery';

type State = {
  onReloadData: () => Promise<void>;
  onPaginateQuery: () => void;
  isPaginating: boolean;
  isLoading: boolean;
};

type Props<TData, TVariables> = {
  onGetData: (data: TData) => boolean;
  onPaginationQueryError: () => void;
  onEntryQueryError: () => void;
  fetchPolicy?: FetchPolicy;
  variables?: TVariables;
  query: DocumentNode;
};

type BaseVariables = {
  page: number;
};

export const usePaginatedQuery = <TData, TVariables>({
  onPaginationQueryError,
  onEntryQueryError,
  fetchPolicy,
  onGetData,
  variables,
  query,
}: Props<TData, TVariables>): State => {
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

  const { exec: execEntryQuery, isLoading } = useEntryQuery<TData, TVariables>({
    ...baseParams,
    onError: () => onEntryQueryError(),
  });

  const {
    exec: execPaginateQuery,
    restartPagination,
    isPaginating,
  } = useQueryWithPagination<TData, TVariables>({
    ...baseParams,
    onError: () => onPaginationQueryError(),
  });

  useEffect(() => {
    execEntryQuery();
  }, []);

  const onReloadData = useCallback(async () => {
    restartPagination();

    await execEntryQuery();
  }, []);

  return {
    onPaginateQuery: execPaginateQuery,
    onReloadData,
    isPaginating,
    isLoading,
  };
};
