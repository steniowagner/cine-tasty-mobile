import {useCallback, useRef} from 'react';

import debounce from '@utils/debounce';

export const SEARCH_BY_QUERY_DELAY = 1000;

type UseSearchByQueryProps = {
  setQuery: (queryString: string) => void;
};

const useSearchByQuery = (props: UseSearchByQueryProps) => {
  const debouncedSetQueryString = useRef(
    debounce((queryStringTyped: string) => {
      props.setQuery(queryStringTyped);
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
