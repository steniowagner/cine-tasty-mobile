import { gql } from '@apollo/client';

import { Translations } from '@/i18n/tags';
import { Icons } from '@/components/common';
import { Routes } from '@/navigation';

import { SearchItem, SearchNavigationProp } from '../types';

const SEARCH_FAMOUS_QUERY = gql`
  query SearchFamous($input: SearchInput!) {
    search: searchFamous(input: $input) {
      items {
        image: profilePath
        title: name
        id
      }
      hasMore
    }
  }
`;

export const searchFamousConfig = () => ({
  navigateToDetails: (
    searchItem: SearchItem,
    navigation: SearchNavigationProp,
  ) => {
    navigation.navigate(Routes.Famous.DETAILS, {
      profilePath: searchItem.image || '',
      name: searchItem.title || '-',
      id: searchItem.id || -1,
    });
  },
  searchPlaceholder: Translations.SearchFamous.SEARCHBAR,
  searchByTextError: Translations.SearchFamous.ENTRY_ERROR,
  paginationError: Translations.SearchFamous.PAGINATION_ERROR,
  query: SEARCH_FAMOUS_QUERY,
  iconImageLoading: 'account' as Icons,
});
