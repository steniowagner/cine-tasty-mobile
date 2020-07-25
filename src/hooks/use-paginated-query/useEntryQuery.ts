import { useCallback, useState } from 'react';
import { ApolloQueryResult } from 'apollo-client';

type State = {
  exec: () => Promise<void>;
  isLoading: boolean;
};

type Props<TData, TVariables> = {
  execQuery: (variables: TVariables) => Promise<ApolloQueryResult<TData>>;
  onGetData: (data: TData) => boolean;
  variables?: TVariables;
  onError: () => void;
};

const useEntryQuery = <TData, TVariables>({
  variables = {} as TVariables,
  onGetData,
  execQuery,
  onError,
}: Props<TData, TVariables>): State => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const exec = useCallback(async () => {
    try {
      const { data } = await execQuery({ ...variables, page: 1 });

      onGetData(data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('usePaginatedQuery/useEntryQuery: ', err);

      onError();
    } finally {
      setIsLoading(false);
    }
  }, [onGetData, onError]);

  return {
    isLoading,
    exec,
  };
};

export default useEntryQuery;
