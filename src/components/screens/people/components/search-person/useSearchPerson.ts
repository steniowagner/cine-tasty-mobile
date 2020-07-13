import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  onReloadPagination: () => void;
  onPaginateSearch: () => void;
  hasPaginationError: boolean;
  isPaginating: boolean;
  errorMessage: string;
  queryString: string;
  isLoading: boolean;
};

const useSearchPerson = (): State => {
  const [queryString, setQueryString] = useState<string>('');

  const { t } = useTranslation();

  const {
    hasPaginationError,
    onReloadPagination,
    onTypeSearchQuery,
    onPaginateSearch,
    hasSearchError,
    isPaginating,
    isLoading,
    items,
  } = useSearch<SearchPerson, SearchPersonItems>({
    onSetQueryString: setQueryString,
    searchType: SearchType.PERSON,
    query: SEARCH_PERSON,
    queryString,
  });

  const getErrorMessage = useCallback(() => {
    if (hasSearchError) {
      return t('translations:errors:searchPeopleError');
    }

    if (hasPaginationError) {
      return t('translations:errors:paginatePeopleError');
    }

    return '';
  }, [hasSearchError, hasPaginationError]);

  return {
    items: items as SearchPersonResultItems[],
    errorMessage: getErrorMessage(),
    onReloadPagination,
    hasPaginationError,
    onTypeSearchQuery,
    onPaginateSearch,
    isPaginating,
    queryString,
    isLoading,
  };
};

export default useSearchPerson;
