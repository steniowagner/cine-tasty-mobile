import {useState, useCallback, useEffect} from 'react';
import {
  ApolloQueryResult,
  useLazyQuery,
  DocumentNode,
  FetchPolicy,
} from '@apollo/client';

import {useAlertMessage} from '@providers';

import usePaginateQuery from './usePaginateQuery';
import useEntryQuery from './useEntryQuery';

type GetQueryResult<TDataset> = {
  dataset: TDataset[];
  hasMore: boolean;
};

type UsePaginatedQueryProps<TResult, TDataset, TVariables> = {
  onGetData: (result: TResult) => GetQueryResult<TDataset>;
  variables?: Omit<TVariables, 'page'>;
  fetchPolicy?: FetchPolicy;
  fireWhenMounted?: boolean;
  entryQueryError: string;
  paginationError: string;
  query: DocumentNode;
};

export const usePagination = <TResult, TDataset, TVariables>(
  props: UsePaginatedQueryProps<TResult, TDataset, TVariables>,
) => {
  const [isLoading, setIsLoading] = useState(props.fireWhenMounted);
  const [dataset, setDataset] = useState<TDataset[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');

  const alertMessage = useAlertMessage();

  const handleOnEntryQueryCompleted = useCallback(
    (queryResult: TResult) => {
      setIsLoading(false);
      const result = props.onGetData(queryResult);
      setDataset(result.dataset);
      setHasMore(result.hasMore);
    },
    [props.onGetData],
  );

  const handleOnEntryQueryError = useCallback(() => {
    setError(props.entryQueryError);
    setIsLoading(false);
  }, [props.entryQueryError]);

  const [execEntryQuery, {fetchMore: paginate, refetch}] =
    useLazyQuery<TResult>(props.query, {
      fetchPolicy: props.fetchPolicy || 'cache-first',
      onCompleted: handleOnEntryQueryCompleted,
      onError: handleOnEntryQueryError,
    });

  useEntryQuery({
    fireWhenMounted: props.fireWhenMounted,
    variables: props.variables,
    exec: execEntryQuery,
  });

  const handleOnPaginatedQueryCompleted = useCallback(
    (queryResult: ApolloQueryResult<TResult>) => {
      const result = props.onGetData(queryResult.data);
      setDataset((previousDataset: TDataset[]) => [
        ...previousDataset,
        ...result.dataset,
      ]);
      setHasMore(result.hasMore);
    },
    [props.onGetData],
  );

  const paginateQuery = usePaginateQuery({
    onPaginatedQueryCompleted: handleOnPaginatedQueryCompleted,
    initialPage: props.fireWhenMounted ? 1 : 2,
    variables: props.variables,
    paginate,
    hasMore,
  });

  const reset = useCallback(async () => {
    try {
      setDataset([]);
      setHasMore(true);
      setError('');
      setIsLoading(true);
      await refetch(props.variables);
    } catch (err) {
      setIsLoading(false);
      setError(props.entryQueryError);
    }
  }, [refetch, props.entryQueryError, props.variables]);

  useEffect(() => {
    if (isLoading || paginateQuery.isPaginating) {
      return;
    }
    reset();
  }, [props.variables]);

  useEffect(() => {
    if (!paginateQuery.hasError) {
      setError('');
      return;
    }
    setError(props.paginationError);
  }, [paginateQuery.hasError]);

  useEffect(() => {
    if (!error) {
      return;
    }
    alertMessage.show(error);
  }, [error]);

  return {
    hasPaginationError: paginateQuery.hasError,
    isPaginating: paginateQuery.isPaginating,
    paginate: paginateQuery.exec,
    isLoading,
    dataset,
    reset,
    error,
  };
};
