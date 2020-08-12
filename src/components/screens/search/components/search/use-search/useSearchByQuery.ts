import { useCallback, useRef } from 'react';
import { ApolloQueryResult } from 'apollo-client';

import { SearchInput, SearchType } from 'types/schema';
import debounce from 'utils/debounce';
import { SearchResult } from 'types';

export const SEARCH_BY_QUERY_DELAY = 1000;

type State = {
  onTypeSearchQuery: (queryStringTyped: string) => void;
  onSearchByQuery: () => Promise<SearchResult>;
};

type TVariables = {
  input: SearchInput;
};

type Props = {
  search: (variables: TVariables) => Promise<ApolloQueryResult<SearchResult>>;
  setQueryString: (queryString: string) => void;
  searchType: SearchType;
  queryString: string;
};

const useSearchByQuery = ({
  setQueryString,
  queryString,
  searchType,
  search,
}: Props): State => {
  const debouncedSetQueryString = useRef(
    debounce((queryStringTyped: string) => {
      setQueryString(queryStringTyped);
    }, SEARCH_BY_QUERY_DELAY),
  ).current;

  const onTypeSearchQuery = useCallback((queryStringTyped: string) => {
    debouncedSetQueryString(queryStringTyped);
  }, []);

  const onSearchByQuery = useCallback(async (): Promise<SearchResult> => {
    const variables = {
      input: { page: 1, query: queryString.trim(), type: searchType },
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
