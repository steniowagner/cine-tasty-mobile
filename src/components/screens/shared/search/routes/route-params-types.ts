import { DocumentNode } from 'graphql';

import { SCREEN_ID as FAMOUS_DETAIL_ID } from 'components/screens/shared/famous-detail/routes/route-names';
import { FamousDetailParams } from 'components/screens/shared/famous-detail/routes/route-params-types';

import { SearchType } from 'types/schema';

export type SearchNavigationParams = {
  i18nQueryByPaginationErrorRef: string;
  i18nSearchBarPlaceholderRef: string;
  i18nQueryByTextErrorRef: string;
  searchType: SearchType;
  query: DocumentNode;
};

export type SearchStackParams = {
  [FAMOUS_DETAIL_ID]: FamousDetailParams;
  SEARCH: SearchNavigationParams;
};
