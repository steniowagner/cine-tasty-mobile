import {useCallback, useRef} from 'react';

import {debounce} from '@utils';

export const SEARCH_BY_QUERY_DELAY = 1000;

type UseSearchByQueryProps = {
  setQuery: (queryString: string) => void;
  resetSearch: () => void;
  query: string;
};

const useSearchByQuery = (props: UseSearchByQueryProps) => {
  const debouncedSetQueryString = useRef(
    debounce(async (queryStringTyped: string) => {
      if (!queryStringTyped && !props.query) {
        props.resetSearch();
      }
      props.setQuery(queryStringTyped.trim());
    }, SEARCH_BY_QUERY_DELAY),
  ).current;

  const handleTypeSearchQuery = useCallback(
    (queryString: string) => {
      debouncedSetQueryString(queryString);
    },
    [debouncedSetQueryString],
  );

  return {
    onTypeSearchQuery: handleTypeSearchQuery,
  };
};

export default useSearchByQuery;
