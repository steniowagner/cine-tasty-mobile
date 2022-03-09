import {useCallback} from 'react';
import {DocumentNode} from '@apollo/client';
import {ApolloQueryResult, FetchPolicy} from '@apollo/client';

import useImperativeQuery from '@utils/useImperativeQuery';

type UseEntryQueryProps<TResult, TVariables> = {
  onCompleted: (result: ApolloQueryResult<TResult>) => void;
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
    fetchPolicy: props.fetchPolicy,
    onCompleted: props.onCompleted,
    query: props.query,
  });

  const exec = useCallback(async () => {
    props.beforeExecQuery();
    const variables = props.getVariables(1);
    await imperativeQuery.exec(variables);
  }, [props.beforeExecQuery, props.getVariables, props.onCompleted]);

  return {
    isLoading: imperativeQuery.isLoading,
    hasError: imperativeQuery.hasError,
    exec,
  };
};

export default useEntryQuery;
