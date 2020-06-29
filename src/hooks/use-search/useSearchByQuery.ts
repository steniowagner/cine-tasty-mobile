import { useCallback, useRef } from 'react';
import { DocumentNode } from 'graphql';

import useImperativeQuery from 'utils/useImperativeQuery';
import { SearchInput, SearchType } from 'types/schema';
import debounce from 'utils/debounce';

const SEARCH_DELAY = 1000;

type State<TData> = {
  onTypeSearchQuery: (queryStringTyped: string) => void;
  onSearchByQuery: () => Promise<TData>;
};

type Props = {
  onSetQueryString: (queryString: string) => void;
  searchType: SearchType;
  query: DocumentNode;
  queryString: string;
};

type TVariables = {
  input: SearchInput;
};

const useSearchByQuery = <TData>({
  onSetQueryString,
  queryString,
  searchType,
  query,
}: Props): State<TData> => {
  const search = useImperativeQuery<TData, TVariables>(query);

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
