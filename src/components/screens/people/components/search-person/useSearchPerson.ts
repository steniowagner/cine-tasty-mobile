import { useState } from 'react';
import gql from 'graphql-tag';

import {
  SearchPerson_search_items_BasePerson as SearchPersonResultItems,
  SearchPerson_search_items as SearchPersonItems,
  SearchPerson,
  SearchType,
} from 'types/schema';
import { useSearch } from 'hooks';

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
  onTypeSearchQuery: (queryString: string) => void;
  items: SearchPersonResultItems[];
  onPaginateSearch: () => void;
  isPaginating: boolean;
  isLoading: boolean;
};

const useSearchPerson = (): State => {
  const [queryString, setQueryString] = useState<string>('');

  const {
    onTypeSearchQuery,
    onPaginateSearch,
    isPaginating,
    isLoading,
    items,
  } = useSearch<SearchPerson, SearchPersonItems>({
    onSetQueryString: setQueryString,
    searchType: SearchType.PERSON,
    query: SEARCH_PERSON,
    queryString,
  });

  return {
    items: items as SearchPersonResultItems[],
    onPaginateSearch,
    onTypeSearchQuery,
    isPaginating,
    isLoading,
  };
};

export default useSearchPerson;
