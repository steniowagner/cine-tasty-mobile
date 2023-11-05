import { DocumentNode } from '@apollo/client';

import { Icons } from '@/components/common';
import { Translations } from '@/i18n/tags';

import { SearchItem, SearchNavigationProp, SearchType } from '../types';
import { searchFamousConfig } from './search-famous-config';
import { searchMoviesConfig } from './search-movies-config';
import { searchTVShowsConfig } from './search-tv-shows-config';

type SearchConfig = {
  navigateToDetails: (
    searchItem: SearchItem,
    navigation: SearchNavigationProp,
  ) => void;
  searchPlaceholder: Translations.Tags;
  searchByTextError: Translations.Tags;
  paginationError: Translations.Tags;
  query: DocumentNode;
  iconImageLoading: Icons;
};

export const getSearchConfig = (searchType: SearchType) => {
  const searchTypeConfigMapping: Record<SearchType, SearchConfig> = {
    MOVIE: searchMoviesConfig(),
    TV: searchTVShowsConfig(),
    FAMOUS: searchFamousConfig(),
  };
  return searchTypeConfigMapping[searchType];
};
