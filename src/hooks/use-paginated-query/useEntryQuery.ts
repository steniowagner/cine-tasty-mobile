import { useCallback, useState } from 'react';
import { ApolloQueryResult } from 'apollo-client';

type State<TVariables> = {
  exec: (variables?: TVariables) => Promise<void>;
  isLoading: boolean;
};

type Props<TData, TVariables> = {
  execQuery: (variables: TVariables) => Promise<ApolloQueryResult<TData>>;
  setPaginationHasMore: (hasMore: boolean) => void;
  onGetData: (data: TData) => boolean;
  variables?: TVariables;
  onError: () => void;
};

const useEntryQuery = <TData, TVariables>({
  variables = {} as TVariables,
  setPaginationHasMore,
  onGetData,
  execQuery,
  onError,
}: Props<TData, TVariables>): State<TVariables> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const exec = useCallback(
    async (updatedVariables: TVariables = variables) => {
      try {
        console.log('exec-variables: ', variables);
        setIsLoading(true);

        const { data } = await execQuery({ ...updatedVariables, page: 1 });

        setIsLoading(false);

        const hasMore = onGetData(data);

        setPaginationHasMore(hasMore);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('usePaginatedQuery/useEntryQuery: ', err);
        setIsLoading(false);

        onError();
      }
    },
    [onGetData, onError],
  );

  return {
    isLoading,
    exec,
  };
};

export default useEntryQuery;
