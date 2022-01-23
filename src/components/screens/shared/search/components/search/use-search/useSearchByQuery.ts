import {useCallback, useRef} from 'react';
import {
  OperationVariables,
  QueryLazyOptions,
  LazyQueryResult,
} from '@apollo/client';

import {useGetCurrentISO6391Language} from '@hooks';
import * as SchemaTypes from '@schema-types';
import debounce from '@utils/debounce';
import * as Types from '@local-types';

export const SEARCH_BY_QUERY_DELAY = 1000;

type SearchByQuery = (
  variables: QueryLazyOptions<SchemaTypes.SearchMovieVariables>,
) => Promise<LazyQueryResult<Types.SearchResult, OperationVariables>>;

type UseSearchByQueryProps = {
  setQueryString: (queryString: string) => void;
  searchType: SchemaTypes.SearchType;
  searchByQuery: SearchByQuery;
};

const useSearchByQuery = ({
  setQueryString,
  searchByQuery,
  searchType,
}: UseSearchByQueryProps) => {
  const {currentISO6391Language} = useGetCurrentISO6391Language();

  const debouncedSetQueryString = useRef(
    debounce((queryStringTyped: string) => {
      setQueryString(queryStringTyped);
    }, SEARCH_BY_QUERY_DELAY),
  ).current;

  const onTypeSearchQuery = useCallback(
    (queryString: string) => {
      debouncedSetQueryString(queryString);
    },
    [debouncedSetQueryString],
  );

  const onSearchByQuery = useCallback(
    async (query: string) => {
      await searchByQuery({
        variables: {
          input: {
            language: currentISO6391Language,
            query: query.trim(),
            type: searchType,
            page: 1,
          },
        },
      });
    },
    [currentISO6391Language, searchByQuery, searchType],
  );

  return {
    onTypeSearchQuery,
    onSearchByQuery,
  };
};

export default useSearchByQuery;
