import { useCallback, useState, useRef } from 'react';
import { ApolloQueryResult } from 'apollo-client';

import * as SchemaTypes from '@schema-types';
import debounce from '@utils/debounce';
import * as Types from '@local-types';

export const SEARCH_BY_QUERY_DELAY = 1000;

type TVariables = {
  input: SchemaTypes.SearchInput;
};

type UseSearchByQueryProps = {
  search: (variables: TVariables) => Promise<ApolloQueryResult<Types.SearchResult>>;
  setQueryString: (queryString: string) => void;
  searchType: SchemaTypes.SearchType;
};

const useSearchByQuery = ({
  setQueryString,
  searchType,
  search,
}: UseSearchByQueryProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedSetQueryString = useRef(
    debounce((queryStringTyped: string) => {
      setQueryString(queryStringTyped);
    }, SEARCH_BY_QUERY_DELAY),
  ).current;

  const onTypeSearchQuery = useCallback((queryStringTyped: string) => {
    debouncedSetQueryString(queryStringTyped);
  }, []);

  const onSearchByQuery = useCallback(async (query: string): Promise<
    Types.SearchResult
  > => {
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
