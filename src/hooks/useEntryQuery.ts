import {useCallback} from 'react';
import {DocumentNode} from '@apollo/client';
import {ApolloQueryResult, FetchPolicy} from '@apollo/client';

import useImperativeQuery from '@utils/useImperativeQuery';

type UseEntryQueryProps<TResult, TVariables> = {
  onComplete: (result: ApolloQueryResult<TResult>) => void;
  getVariables: (page: number) => TVariables;
  beforeExecQuery: () => void;
  fetchPolicy?: FetchPolicy;
  skipFirstRun: boolean;
  query: DocumentNode;
};

const useEntryQuery = <TResult, TVariables>(
  props: UseEntryQueryProps<TResult, TVariables>,
) => {
  const imperativeQuery = useImperativeQuery<TResult, TVariables>({
    skipFirstRun: props.skipFirstRun,
    fetchPolicy: props.fetchPolicy,
    query: props.query,
  });

  const exec = useCallback(async () => {
    props.beforeExecQuery();
    const variables = props.getVariables(1);
    const result = await imperativeQuery.exec(variables);
    if (!result || !result.data) {
      return;
    }
    props.onComplete(result);
  }, [props.beforeExecQuery, props.getVariables, props.onComplete]);

  return {
    isLoading: imperativeQuery.isLoading,
    hasError: imperativeQuery.hasError,
    exec,
  };
};

export default useEntryQuery;
