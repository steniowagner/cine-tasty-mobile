import {useCallback, useState} from 'react';
import {
  ApolloQueryResult,
  useApolloClient,
  DocumentNode,
  ApolloError,
  FetchPolicy,
} from '@apollo/client';

type UseImperativeQueryProps<TResult> = {
  onCompleted?: (result: ApolloQueryResult<TResult>) => void;
  onError?: (error: ApolloError | Error) => void;
  fetchPolicy?: FetchPolicy;
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
  props: UseImperativeQueryProps<TResult>,
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
      if (!props.onCompleted) {
        return;
      }
      props.onCompleted(result);
    },
    [props.onCompleted],
  );

  const handleOnError = useCallback(
    (error: ApolloError | Error) => {
      setQueryErrorState();
      if (!props.onError) {
        return;
      }
      props.onError(error);
    },
    [props.onError],
  );

  const exec = useCallback(
    async (variables: TVariables) => {
      try {
        setQueryLoadingState();
        await apolloClient
          .query<TResult>({
            fetchPolicy: props.fetchPolicy,
            query: props.query,
            variables,
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
      props.fetchPolicy,
      handleOnComplete,
      handleOnError,
      props.query,
    ],
  );

  return {
    isLoading: queryState.loading,
    hasError: queryState.error,
    exec,
  };
};
