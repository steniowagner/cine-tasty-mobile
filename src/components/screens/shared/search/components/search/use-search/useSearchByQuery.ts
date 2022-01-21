import {useCallback, useState, useRef} from 'react';
import {ApolloQueryResult} from 'apollo-client';

import {useGetCurrentISO6391Language} from '@hooks';
import * as SchemaTypes from '@schema-types';
import debounce from '@utils/debounce';
import * as Types from '@local-types';

export const SEARCH_BY_QUERY_DELAY = 1000;

type TVariables = {
  input: SchemaTypes.SearchInput;
};

type UseSearchByQueryProps = {
  search: (
    variables: TVariables,
  ) => Promise<ApolloQueryResult<Types.SearchResult>>;
  setQueryString: (queryString: string) => void;
  searchType: SchemaTypes.SearchType;
};

const useSearchByQuery = ({
  setQueryString,
  searchType,
  search,
}: UseSearchByQueryProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {currentISO6391Language} = useGetCurrentISO6391Language();

  const debouncedSetQueryString = useRef(
    debounce((queryStringTyped: string) => {
      setQueryString(queryStringTyped);
    }, SEARCH_BY_QUERY_DELAY),
  ).current;

  const onTypeSearchQuery = useCallback((queryStringTyped: string) => {
    debouncedSetQueryString(queryStringTyped);
  }, []);

  const onSearchByQuery = useCallback(
    async (query: string): Promise<Types.SearchResult> => {
      try {
        setIsLoading(true);

        const variables = {
          input: {
            query: query.trim(),
            type: searchType,
            page: 1,
          },
          language: currentISO6391Language,
        };

        const {data} = await search(variables);

        setIsLoading(false);

        return data;
      } catch (err) {
        setIsLoading(false);

        throw err;
      }
    },
    [],
  );

  return {
    onTypeSearchQuery,
    onSearchByQuery,
    isLoading,
  };
};

export default useSearchByQuery;
