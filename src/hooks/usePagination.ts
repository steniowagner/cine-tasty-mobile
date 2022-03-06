import {useState, useCallback, useEffect} from 'react';
import {ApolloQueryResult, DocumentNode, FetchPolicy} from '@apollo/client';

import {useAlertMessage} from '@providers';

import usePaginateQuery from './usePaginateQuery';
import useEntryQuery from './useEntryQuery';

type GetQueryResult<TDataset> = {
  dataset: TDataset[];
  hasMore: boolean;
};

type Input = {
  input?: Object;
};

type ReceivedVariables<TVariables> = Omit<TVariables, 'page'> & Input;

type Page = {page: number};

type InputWithPaging = {
  input: Input & Page;
};

type UsedVariables<TVariables> = Page | (Page & TVariables) | InputWithPaging;

type UsePaginationProps<TResult, TDataset, TVariables> = {
  onGetData: (result: TResult) => GetQueryResult<TDataset>;
  variables?: ReceivedVariables<TVariables>;
  fetchPolicy?: FetchPolicy;
  fireWhenMounted?: boolean;
  entryQueryError: string;
  paginationError: string;
  query: DocumentNode;
};

export const usePagination = <TResult, TDataset, TVariables>(
  props: UsePaginationProps<TResult, TDataset, TVariables>,
) => {
  const [dataset, setDataset] = useState<TDataset[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');

  const alertMessage = useAlertMessage();

  const getVariables = useCallback(
    (page: number): UsedVariables<TVariables> => {
      if (!props.variables) {
        return {page};
      }
      if (!props.variables.input) {
        return {
          ...props.variables,
          page,
        };
      }
      return {
        input: {
          ...props.variables.input,
          page,
        },
      };
    },
    [props.variables],
  );

  const beforeExecQuery = useCallback(() => {
    setError('');
  }, []);

  const handleOnCompletePaginatedQuery = useCallback(
    (queryResult: ApolloQueryResult<TResult>) => {
      const result = props.onGetData(queryResult.data);
      setDataset((previousDataset: TDataset[]) => [
        ...previousDataset,
        ...result.dataset,
      ]);
      setHasMore(result.hasMore);
    },
    [props.onGetData, dataset],
  );

  const handleOnCompleteEntryQuery = useCallback(
    (queryResult: ApolloQueryResult<TResult>) => {
      const result = props.onGetData(queryResult.data);
      setDataset(result.dataset);
      setHasMore(result.hasMore);
    },
    [props.onGetData, dataset],
  );

  const entryQuery = useEntryQuery<TResult, UsedVariables<TVariables>>({
    onComplete: handleOnCompleteEntryQuery,
    fetchPolicy: props.fetchPolicy,
    query: props.query,
    beforeExecQuery,
    getVariables,
  });

  const paginateQuery = usePaginateQuery<TResult, UsedVariables<TVariables>>({
    initialPage: props.fireWhenMounted ? 1 : 2,
    onComplete: handleOnCompletePaginatedQuery,
    fetchPolicy: props.fetchPolicy,
    query: props.query,
    beforeExecQuery,
    getVariables,
    hasMore,
  });

  const reset = useCallback(async () => {
    try {
      paginateQuery.reset();
      setDataset([]);
      setHasMore(true);
      setError('');
      await entryQuery.exec();
    } catch (err) {
      setError(props.entryQueryError);
    }
  }, [props.entryQueryError, paginateQuery.reset, props.variables]);

  useEffect(() => {
    if (entryQuery.isLoading || paginateQuery.isPaginating) {
      return;
    }
    reset();
  }, [props.variables]);

  useEffect(() => {
    if (!props.fireWhenMounted) {
      return;
    }
    entryQuery.exec();
  }, [props.fireWhenMounted]);

  useEffect(() => {
    if (!entryQuery.hasError) {
      return;
    }
    setError(props.entryQueryError);
  }, [entryQuery.hasError]);

  useEffect(() => {
    if (!paginateQuery.hasError) {
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
    isLoading: entryQuery.isLoading,
    paginate: paginateQuery.exec,
    dataset,
    reset,
    error,
  };
};
