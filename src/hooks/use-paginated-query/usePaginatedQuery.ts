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

export const usePaginatedQuery = <TData, TVariables>(props: Props<TData, TVariables>) => {
  const execQuery = useImperativeQuery<TData, TVariables & BaseVariables>(
    props.query,
    props.fetchPolicy,
  );

  const baseParams = useMemo(
    () => ({
      onGetData: (data: TData): boolean => props.onGetData(data),
      variables: props.variables,
      execQuery,
    }),
    [props.onGetData, props.variables, execQuery],
  );

  const {
    setHasMoreFromEntryQuery,
    exec: execPaginateQuery,
    restartPagination,
    isPaginating,
  } = useQueryWithPagination<TData, Omit<TVariables, 'page'>>({
    ...baseParams,
    onError: () => props.onPaginationQueryError(),
  });

  const { exec: execEntryQuery, isLoading } = useEntryQuery<
    TData,
    Omit<TVariables, 'page'>
  >({
    ...baseParams,
    setPaginationHasMore: setHasMoreFromEntryQuery,
    onError: () => props.onEntryQueryError(),
  });

  useEffect(() => {
    if (props.fireEntryQueryWhenMounted) {
      execEntryQuery();
    }
  }, []);

  const onReloadData = useCallback(async () => {
    restartPagination();

    await execEntryQuery(props.variables);
  }, [props.variables]);

  return {
    onPaginateQuery: execPaginateQuery,
    onReloadData,
    isPaginating,
    isLoading,
  };
};
