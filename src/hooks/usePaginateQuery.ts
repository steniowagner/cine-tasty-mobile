import {useState, useEffect, useCallback} from 'react';
import {
  FetchMoreQueryOptions,
  OperationVariables,
  ApolloQueryResult,
  FetchMoreOptions,
} from '@apollo/client';

type PaginateFunction<TResult> = (
  result: FetchMoreQueryOptions<OperationVariables, TResult> &
    FetchMoreOptions<TResult, OperationVariables>,
) => Promise<ApolloQueryResult<TResult>>;

type UsePaginateQueryProps<TResult, TVariables> = {
  onPaginatedQueryCompleted: (result: ApolloQueryResult<TResult>) => void;
  variables?: Omit<TVariables, 'page'>;
  paginate: PaginateFunction<TResult>;
  initialPage: number;
  hasMore: boolean;
};

const usePaginateQuery = <TResult, TVariables>(
  props: UsePaginateQueryProps<TResult, TVariables>,
) => {
  const [isPaginating, setIsPagianting] = useState(false);
  const [page, setPage] = useState(props.initialPage);
  const [hasError, setHasError] = useState(false);

  const handleResetPaginationState = useCallback(() => {
    setPage(props.initialPage);
    setIsPagianting(false);
    setHasError(false);
  }, [props.initialPage]);

  const handlePaginateQueryError = useCallback(() => {
    setHasError(true);
    setIsPagianting(false);
  }, [hasError]);

  const handleExecPaginatedQuery = useCallback(async () => {
    try {
      const result = await props.paginate({
        variables: {...props.variables, page},
      });
      setIsPagianting(false);
      props.onPaginatedQueryCompleted(result);
    } catch (err) {
      handlePaginateQueryError();
    }
  }, [props.onPaginatedQueryCompleted, props.variables, props.paginate, page]);

  useEffect(() => {
    if (isPaginating) {
      handleExecPaginatedQuery();
    }
  }, [handleExecPaginatedQuery, isPaginating]);

  const handlePaginate = useCallback(() => {
    if (isPaginating || !props.hasMore) {
      return;
    }
    setPage((previousPage: number) =>
      hasError ? previousPage : previousPage + 1,
    );
    setIsPagianting(true);
    setHasError(false);
  }, [isPaginating, props.hasMore]);

  return {
    reset: handleResetPaginationState,
    exec: handlePaginate,
    isPaginating,
    hasError,
  };
};

export default usePaginateQuery;
