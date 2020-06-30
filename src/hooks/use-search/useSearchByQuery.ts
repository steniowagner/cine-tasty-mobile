import { useCallback, useRef } from 'react';
import { ApolloQueryResult } from 'apollo-client';

import { SearchInput, SearchType } from 'types/schema';
import debounce from 'utils/debounce';

const SEARCH_DELAY = 1000;

type State<TData> = {
  onTypeSearchQuery: (queryStringTyped: string) => void;
  onSearchByQuery: () => Promise<TData>;
};

type TVariables = {
  input: SearchInput;
};

type Props<TData> = {
  search: (variables: TVariables) => Promise<ApolloQueryResult<TData>>;
  onSetQueryString: (queryString: string) => void;
  searchType: SearchType;
  queryString: string;
};

const useSearchByQuery = <TData>({
  onSetQueryString,
  queryString,
  searchType,
  search,
}: Props<TData>): State<TData> => {
  const debouncedSetQueryString = useRef(
    debounce((queryStringTyped: string) => {
      onSetQueryString(queryStringTyped);
    }, SEARCH_DELAY),
  ).current;

  const onTypeSearchQuery = useCallback((queryStringTyped: string) => {
    if (queryStringTyped) {
      debouncedSetQueryString(queryStringTyped);
    }
  }, []);

  const onSearchByQuery = useCallback(async (): Promise<TData> => {
    const variables = {
      input: { page: 1, query: queryString, type: searchType },
    };

    const { data } = await search(variables);

    return data;
  }, [queryString]);

  return {
    onTypeSearchQuery,
    onSearchByQuery,
  };
};

export default useSearchByQuery;
