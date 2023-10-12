import { useCallback, useEffect, useState } from 'react';
import { DocumentNode } from 'graphql';

import { useAlertMessage } from '@providers';

import { useImperativeQuery } from '../use-imperative-query/use-imperative-query';
import { usePaginateQuery } from './use-paginate-query';

type ParsedQueryResult<TDataset> = {
  dataset: TDataset[];
  hasMore: boolean;
};

type Input = {
  input?: Object;
};

type ReceivedVariables<TVariables> = Omit<TVariables, 'page'> & Input;

type Page = { page: number };

type InputWithPaging = {
  input: Input & Page;
};

type Variables<TVariables> = Page | (Page & TVariables) | InputWithPaging;

type UsePaginationParams<TResult, TDataset, TVariables> = {
  onGetData: (result: TResult) => ParsedQueryResult<TDataset>;
  variables?: ReceivedVariables<TVariables>;
  initialDataset?: TDataset[];
  fetchPolicy?: string;
  entryError: string;
  paginationError: string;
  skipFirstRun: boolean;
  query: DocumentNode;
};

export const usePagination = <TResult, TDataset, TVariables>(
  params: UsePaginationParams<TResult, TDataset, TVariables>,
) => {
  const [dataset, setDataset] = useState<TDataset[]>(
    params.initialDataset || [],
  );
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');

  const alertMessage = useAlertMessage();

  const handleEntryQueryError = useCallback(() => {
    setError(params.entryError);
  }, [params.entryError]);

  const handleEntryQueryCompleted = useCallback(
    (queryResult: TResult) => {
      const result = params.onGetData(queryResult);
      setDataset(result.dataset);
      setHasMore(result.hasMore);
    },
    [params.onGetData],
  );

  const entryQuery = useImperativeQuery<TResult, Variables<TVariables>>({
    fetchPolicy: params.fetchPolicy,
    onCompleted: handleEntryQueryCompleted,
    onError: handleEntryQueryError,
    query: params.query,
  });

  const handlePaginateQueryCompleted = useCallback(
    (queryResult: TResult) => {
      const result = params.onGetData(queryResult);
      setDataset((previousDataset: TDataset[]) => [
        ...previousDataset,
        ...result.dataset,
      ]);
      setHasMore(result.hasMore);
    },
    [params.onGetData, dataset],
  );

  const getVariables = useCallback(
    (page: number) => {
      if (!params.variables) {
        return { page };
      }
      if (!params.variables.input) {
        return {
          ...params.variables,
          page,
        };
      }
      return {
        input: {
          ...params.variables.input,
          page,
        },
      };
    },
    [params.variables],
  );

  const paginateQuery = usePaginateQuery<TResult, Variables<TVariables>>({
    onCompleted: handlePaginateQueryCompleted,
    skipFirstRun: params.skipFirstRun,
    fetchPolicy: params.fetchPolicy,
    query: params.query,
    setError,
    getVariables,
    hasMore,
  });

  const resetState = useCallback(() => {
    paginateQuery.reset();
    setDataset([]);
    setHasMore(true);
    setError('');
  }, [paginateQuery.reset]);

  const handleExecEntryQuery = useCallback(async () => {
    resetState();
    await entryQuery.exec(getVariables(1));
  }, [resetState, entryQuery.exec, getVariables]);

  useEffect(() => {
    if (!params.skipFirstRun) {
      handleExecEntryQuery();
    }
  }, [params.skipFirstRun]);

  useEffect(() => {
    if (paginateQuery.hasError) {
      setError(params.paginationError);
    }
  }, [paginateQuery.hasError]);

  useEffect(() => {
    if (error) {
      alertMessage.show(error);
    }
  }, [error]);

  return {
    isLoading: entryQuery.isLoading,
    hasPaginationError: paginateQuery.hasError,
    isPaginating: paginateQuery.isPaginating,
    paginate: paginateQuery.paginate,
    retryEntryQuery: handleExecEntryQuery,
    resetState,
    dataset,
    error,
  };
};
