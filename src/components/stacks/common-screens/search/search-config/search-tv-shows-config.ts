import { gql } from '@apollo/client';

import { Icons } from '@/components/common';
import { Translations } from '@/i18n/tags';
import { Routes } from '@/navigation';

import { SearchItem, SearchNavigationProp } from '../types';

const SEARCH_TV_SHOWS_QUERY = gql`
  query SearchTVShows($input: SearchInput!) {
    search: searchTVShows(input: $input) {
      hasMore
      items {
        image: posterPath
        title: name
        id
      }
    }
  }
`;

export const searchTVShowsConfig = () => ({
  navigateToDetails: (
    searchItem: SearchItem,
    navigation: SearchNavigationProp,
  ) => {
    navigation.navigate(Routes.Home.TV_SHOW_DETAILS);
  },
  searchPlaceholder: Translations.TrendingFamous.ENTRY_ERROR,
  searchByTextError: Translations.TrendingFamous.ENTRY_ERROR,
  paginationError: Translations.TrendingFamous.ENTRY_ERROR,
  query: SEARCH_TV_SHOWS_QUERY,
  iconImageLoading: 'video-vintage' as Icons,
});
