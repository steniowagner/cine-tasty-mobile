import { DocumentNode } from 'graphql';

import { SearchType } from 'types/schema';

export type SearchNavigationParams = {
  i18nQueryByPaginationErrorRef: string;
  i18nSearchBarPlaceholderRef: string;
  i18nQueryByTextErrorRef: string;
  searchType: SearchType;
  query: DocumentNode;
};

export type SearchStackParams = {
  SEARCH: SearchNavigationParams;
};
