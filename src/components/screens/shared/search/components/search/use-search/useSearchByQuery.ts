import { useCallback, useState, useRef } from 'react';
import { ApolloQueryResult } from 'apollo-client';

import { SearchInput, SearchType } from 'types/schema';
import debounce from 'utils/debounce';
import { SearchResult } from 'types';

export const SEARCH_BY_QUERY_DELAY = 1000;

type State = {
  onTypeSearchQuery: (queryStringTyped: string) => void;
  onSearchByQuery: (query: string) => Promise<SearchResult>;
  isLoading: boolean;
};

type TVariables = {
  input: SearchInput;
};

type Props = {
  search: (variables: TVariables) => Promise<ApolloQueryResult<SearchResult>>;
  setQueryString: (queryString: string) => void;
  searchType: SearchType;
};

const useSearchByQuery = ({ setQueryString, searchType, search }: Props): State => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedSetQueryString = useRef(
    debounce((queryStringTyped: string) => {
      setQueryString(queryStringTyped);
    }, SEARCH_BY_QUERY_DELAY),
  ).current;

  const onTypeSearchQuery = useCallback((queryStringTyped: string) => {
    debouncedSetQueryString(queryStringTyped);
  }, []);

  const onSearchByQuery = useCallback(async (query: string): Promise<SearchResult> => {
    try {
      setIsLoading(true);

      const variables = {
        input: { page: 1, query: query.trim(), type: searchType },
      };

      const { data } = await search(variables);

      setIsLoading(false);

      return data;
    } catch (err) {
      setIsLoading(false);

      throw err;
    }
  }, []);

  return {
    onTypeSearchQuery,
    onSearchByQuery,
    isLoading,
  };
};

export default useSearchByQuery;
