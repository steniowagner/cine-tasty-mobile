import { DocumentNode } from 'graphql';

import { SCREEN_ID as MOVIE_DETAIL_SCREEN_ID } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-names';
import { MovieDetailExternalParams } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-params-types';

import { SCREEN_ID as TV_SHOW_DETAIL_SCREEN_ID } from 'components/screens/shared/media-detail-screen/tv-show-detail/routes/route-names';
import { TVShowDetailExternalParams } from 'components/screens/shared/media-detail-screen/tv-show-detail/routes/route-params-types';

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
  [TV_SHOW_DETAIL_SCREEN_ID]: TVShowDetailExternalParams;
  [MOVIE_DETAIL_SCREEN_ID]: MovieDetailExternalParams;
  [FAMOUS_DETAIL_ID]: FamousDetailParams;
  SEARCH: SearchNavigationParams;
};
