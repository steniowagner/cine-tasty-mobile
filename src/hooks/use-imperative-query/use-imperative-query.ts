import { useCallback, useState } from 'react';
import {
  ApolloQueryResult,
  useApolloClient,
  FetchPolicy,
} from '@apollo/client';
import { DocumentNode } from 'graphql';

type Result<TResult> = {
  data: TResult;
  loading: boolean;
};

type UseImperativeQueryParams<TResult> = {
  onCompleted?: (result: Result<TResult>) => void;
  onError?: (error: Error) => void;
  fetchPolicy?: string;
  query: DocumentNode;
};

type QueryState = {
  loading: boolean;
  error: boolean;
};

const INITIAL_QUERY_STATE = {
  loading: false,
  error: false,
};

export const useImperativeQuery = <TResult, TVariables>(
  params: UseImperativeQueryParams<TResult>,
) => {
  const [queryState, setQueryState] = useState<QueryState>(INITIAL_QUERY_STATE);

  const apolloClient = useApolloClient();

  const setQueryLoadingState = useCallback(() => {
    setQueryState({
      loading: true,
      error: false,
    });
  }, []);

  const setQueryErrorState = useCallback(() => {
    setQueryState({
      loading: false,
      error: true,
    });
  }, []);

  const handleOnComplete = useCallback(
    (result: ApolloQueryResult<TResult>) => {
      setQueryState(INITIAL_QUERY_STATE);
      if (!params.onCompleted) {
        return;
      }
      params.onCompleted(result);
    },
    [params.onCompleted],
  );

  const handleOnError = useCallback(
    (error: Error) => {
      setQueryErrorState();
      if (!params.onError) {
        return;
      }
      params.onError(error);
    },
    [params.onError],
  );

  const exec = useCallback(
    async (queryVariables: TVariables) => {
      setQueryLoadingState();
      try {
        await apolloClient
          .query<TResult>({
            fetchPolicy: params.fetchPolicy as FetchPolicy,
            query: params.query,
            variables: queryVariables as Record<string, unknown>,
          })
          .then(handleOnComplete)
          .catch(handleOnError);
      } catch (error) {
        setQueryErrorState();
      }
    },
    [
      setQueryLoadingState,
      setQueryErrorState,
      params.fetchPolicy,
      handleOnComplete,
      handleOnError,
      params.query,
    ],
  );

  return {
    isLoading: queryState.loading,
    hasError: queryState.error,
    exec,
  };
};
