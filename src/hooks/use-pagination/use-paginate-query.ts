import { useCallback, useEffect, useState } from 'react';
import { DocumentNode } from 'graphql';

import { useImperativeQuery } from '@hooks';

type UsePaginateQueryParams<TResult, TVariables> = {
  onCompleted: (result: TResult) => void;
  getVariables: (page: number) => TVariables;
  setError: (error: string) => void;
  fetchPolicy?: string;
  skipFirstRun: boolean;
  query: DocumentNode;
  hasMore: boolean;
};

type Pagination = {
  isPaginating: boolean;
  page: number;
};

export const usePaginateQuery = <TResult, TVariables>(
  params: UsePaginateQueryParams<TResult, TVariables>,
) => {
  const [pagination, setPagination] = useState<Pagination>({
    page: params.skipFirstRun ? 0 : 1,
    isPaginating: false,
  });

  const imperativeQuery = useImperativeQuery<TResult, TVariables>({
    fetchPolicy: params.fetchPolicy,
    onCompleted: params.onCompleted,
    query: params.query,
  });

  const reset = useCallback(() => {
    setPagination({
      isPaginating: false,
      page: 1,
    });
  }, []);

  const startPaginationProcess = useCallback(() => {
    const isLoading = imperativeQuery.isLoading || pagination.isPaginating;
    if (isLoading || !params.hasMore) {
      return;
    }
    setPagination((previousPagination: Pagination) => {
      const page = imperativeQuery.hasError
        ? previousPagination.page
        : previousPagination.page + 1;
      return {
        isPaginating: true,
        page,
      };
    });
  }, [
    imperativeQuery.isLoading,
    imperativeQuery.hasError,
    params.hasMore,
    pagination,
  ]);

  const paginate = useCallback(async () => {
    params.setError('');
    const variables = params.getVariables(pagination.page);
    await imperativeQuery.exec(variables);
    setPagination((previousPagination: Pagination) => ({
      ...previousPagination,
      isPaginating: false,
    }));
  }, [
    params.setError,
    params.getVariables,
    pagination.page,
    imperativeQuery.exec,
  ]);

  useEffect(() => {
    if (pagination.isPaginating) {
      paginate();
    }
  }, [pagination.isPaginating]);

  return {
    isPaginating: imperativeQuery.isLoading,
    hasError: imperativeQuery.hasError,
    paginate: startPaginationProcess,
    reset,
  };
};
