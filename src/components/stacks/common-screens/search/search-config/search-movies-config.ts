import { gql } from '@apollo/client';

import { Icons } from '@/components/common';
import { Translations } from '@/i18n/tags';
import { Routes } from '@/navigation';

import { SearchItem, SearchNavigationProp } from '../types';

const SEARCH_MOVIES_QUERY = gql`
  query SearchMovies($input: SearchInput!) {
    search: searchMovies(input: $input) {
      items {
        image: posterPath
        title
        id
      }
      hasMore
    }
  }
`;

export const searchMoviesConfig = () => ({
  navigateToDetails: (
    searchItem: SearchItem,
    navigation: SearchNavigationProp,
  ) => {
    navigation.navigate(Routes.Home.MOVIE_DETAILS);
  },
  searchPlaceholder: Translations.TrendingFamous.ENTRY_ERROR,
  searchByTextError: Translations.TrendingFamous.ENTRY_ERROR,
  paginationError: Translations.TrendingFamous.ENTRY_ERROR,
  query: SEARCH_MOVIES_QUERY,
  iconImageLoading: 'video-vintage' as Icons,
});
