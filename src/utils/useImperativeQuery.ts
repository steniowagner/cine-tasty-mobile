import {useCallback, useState} from 'react';
import {DocumentNode, useQuery} from '@apollo/client';
import {FetchPolicy} from 'apollo-client';

type UseImperativeQueryProps = {
  fetchPolicy?: FetchPolicy;
  query: DocumentNode;
};

const useImperativeQuery = <TResult, TVariables>(
  props: UseImperativeQueryProps,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const query = useQuery<TResult, TVariables>(props.query, {
    fetchPolicy: props.fetchPolicy || 'cache-first',
  });

  const exec = useCallback(
    async (variables: TVariables) => {
      try {
        setIsLoading(true);
        setHasError(false);
        const result = await query.refetch(variables);
        setIsLoading(false);
        return result;
      } catch (err) {
        setHasError(true);
        setIsLoading(false);
      }
    },
    [query.refetch],
  );

  return {
    isLoading,
    hasError,
    exec,
  };
};

export default useImperativeQuery;
