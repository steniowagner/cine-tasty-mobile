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

const useEntryQuery = <TData, TVariables>(
  props: Props<TData, TVariables>,
): State<TVariables> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const exec = useCallback(
    async (updatedVariables: TVariables = props.variables || ({} as TVariables)) => {
      try {
        setIsLoading(true);

        const { data } = await props.execQuery({ ...updatedVariables, page: 1 });

        setIsLoading(false);

        const hasMore = props.onGetData(data);

        props.setPaginationHasMore(hasMore);
      } catch (err) {
        // eslint-disable-next-line no-console
        setIsLoading(false);

        props.onError();
      }
    },
    [props.onGetData, props.onError],
  );

  return {
    isLoading,
    exec,
  };
};

export default useEntryQuery;
