import { useCallback, useState, useEffect } from 'react';
import gql from 'graphql-tag';

import {
  SearchPerson_search_items_BasePerson as SearchPersonItems,
  SearchPerson,
  SearchType,
} from 'types/schema';

import { useSearchByQuery } from 'hooks';

const SEARCH_PERSON = gql`
  query SearchPerson($input: SearchInput!) {
    search(input: $input) {
      totalResults
      hasMore
      items {
        ... on BasePerson {
          profilePath
          name
          id
        }
      }
    }
  }
`;

const initialQueryResult: QueryResult = {
  hasMore: true,
  items: [],
};

type QueryResult = {
  items: SearchPersonItems[];
  hasMore: boolean;
};

type State = {
  onTypeSearchQuery: (value: string) => void;
  items: SearchPersonItems[];
  isLoading: boolean;
};

const useSearchPerson = (): State => {
  const [queryResult, setQueryResult] = useState<QueryResult>(initialQueryResult);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryString, setQueryString] = useState<string>('');

  const { onTypeSearchQuery, onSearchByQuery } = useSearchByQuery<SearchPerson>({
    onSetQueryString: setQueryString,
    searchType: SearchType.PERSON,
    query: SEARCH_PERSON,
    queryString,
  });

  const handleOnSearchByQuery = useCallback(async () => {
    const { search } = await onSearchByQuery();

    setQueryResult({
      items: search.items as SearchPersonItems[],
      hasMore: search.hasMore,
    });

    setIsLoading(false);
  }, [queryString]);

  useEffect(() => {
    if (queryString) {
      setIsLoading(true);

      handleOnSearchByQuery();
    }
  }, [queryString]);

  return {
    items: queryResult.items,
    onTypeSearchQuery,
    isLoading,
  };
};

export default useSearchPerson;
