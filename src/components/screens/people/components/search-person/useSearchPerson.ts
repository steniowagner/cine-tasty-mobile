import {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  SearchPerson_search_items_BasePerson as SearchPersonItems,
  SearchPersonVariables,
  SearchPerson,
  SearchType,
} from 'types/schema';
import debounce from 'utils/debounce';

const SEARCH_DELAY = 1000;

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

type State = {
  onTypeSearchQuery: (value: string) => void;
  items: SearchPersonItems[];
  isLoading: boolean;
};

const useSearchPerson = (): State => {
  const [query, setQuery] = useState<string>('');

  const [searchPerson, { loading, data }] = useLazyQuery<
    SearchPerson,
    SearchPersonVariables
  >(SEARCH_PERSON, {
    variables: { input: { page: 1, query, type: SearchType.PERSON } },
  });

  useEffect(() => {
    if (query) {
      searchPerson();
    }
  }, [query]);

  const debouncedSetQuery = useRef(
    debounce((queryTyped: string) => {
      setQuery(queryTyped);
    }, SEARCH_DELAY),
  ).current;

  const onTypeSearchQuery = useCallback((text: string) => {
    if (text) {
      debouncedSetQuery(text);
    }
  }, []);

  return {
    items: data && data.search && query ? (data.search.items as SearchPersonItems[]) : [],
    isLoading: loading,
    onTypeSearchQuery,
  };
};

export default useSearchPerson;
