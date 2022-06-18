import {useState, useEffect, useCallback} from 'react';
import {ApolloQueryResult} from '@apollo/client';
import {DocumentNode} from '@apollo/client';
import {FetchPolicy} from 'apollo-client';

import {useImperativeQuery} from '@hooks';

type UsePaginateQueryProps<TResult, TVariables> = {
  onCompleted: (result: ApolloQueryResult<TResult>) => void;
  getVariables: (page: number) => TVariables;
  beforeExecQuery: () => void;
  fetchPolicy: FetchPolicy;
  skipFirstRun: boolean;
  query: DocumentNode;
  hasMore: boolean;
};

type Pagination = {
  isPaginating: boolean;
  page: number;
};

const usePaginateQuery = <TResult, TVariables>(
  props: UsePaginateQueryProps<TResult, TVariables>,
) => {
  const [pagination, setPagination] = useState<Pagination>({
    page: props.skipFirstRun ? 0 : 1,
    isPaginating: false,
  });

  const imperativeQuery = useImperativeQuery<TResult, TVariables>({
    fetchPolicy: props.fetchPolicy,
    onCompleted: props.onCompleted,
    query: props.query,
  });

  const reset = useCallback(() => {
    setPagination({
      isPaginating: false,
      page: 1,
    });
  }, []);

  const handleExecPaginatedQuery = useCallback(async () => {
    props.beforeExecQuery();
    const variables = props.getVariables(pagination.page);
    await imperativeQuery.exec(variables);
    setPagination((previousPagination: Pagination) => ({
      ...previousPagination,
      isPaginating: false,
    }));
  }, [props.beforeExecQuery, props.getVariables, pagination.page]);

  const exec = useCallback(() => {
    const isLoading = imperativeQuery.isLoading || pagination.isPaginating;
    if (isLoading || !props.hasMore) {
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
  }, [imperativeQuery.isLoading, props.hasMore, pagination]);

  useEffect(() => {
    if (!pagination.isPaginating) {
      return;
    }
    handleExecPaginatedQuery();
  }, [pagination.isPaginating]);

  return {
    isPaginating: imperativeQuery.isLoading,
    hasError: imperativeQuery.hasError,
    reset,
    exec,
  };
};

export default usePaginateQuery;
