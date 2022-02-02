import {useEffect, useCallback} from 'react';
import {
  OperationVariables,
  QueryLazyOptions,
  LazyQueryResult,
} from '@apollo/client';

type ExecFunction<TResult> = (
  options?: QueryLazyOptions<OperationVariables>,
) => Promise<LazyQueryResult<TResult, OperationVariables>>;

type UsePaginatedQueryProps<TResult, TVariables> = {
  variables?: Omit<TVariables, 'page'>;
  exec: ExecFunction<TResult>;
  fireWhenMounted?: boolean;
};

const useEntryQuery = <TResult, TVariables>(
  props: UsePaginatedQueryProps<TResult, TVariables>,
) => {
  const handleExecEntryQuery = useCallback(
    async () => props.exec({variables: {...props.variables, page: 1}}),
    [props.variables, props.exec],
  );

  useEffect(() => {
    if (props.fireWhenMounted) {
      handleExecEntryQuery();
    }
  }, [props.fireWhenMounted]);
};

export default useEntryQuery;
