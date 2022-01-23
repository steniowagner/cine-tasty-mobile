import {useCallback, useRef} from 'react';

import {useGetCurrentISO6391Language} from '@hooks';
import * as SchemaTypes from '@schema-types';
import debounce from '@utils/debounce';
import * as Types from '@local-types';

export const SEARCH_BY_QUERY_DELAY = 1000;

type UseSearchByQueryProps = {
  setQueryString: (queryString: string) => void;
  searchType: SchemaTypes.SearchType;
  search: Types.SearchFunction;
};

const useSearchByQuery = ({
  setQueryString,
  searchType,
  search,
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
      await search({
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
    [currentISO6391Language, search, searchType],
  );

  return {
    onTypeSearchQuery,
    onSearchByQuery,
  };
};

export default useSearchByQuery;
