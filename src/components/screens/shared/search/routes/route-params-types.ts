import { SCREEN_ID as MOVIE_DETAIL_SCREEN_ID } from '@components/screens/shared/media-detail-screen/movie-detail/routes/route-names';
import { MovieDetailExternalParams } from '@components/screens/shared/media-detail-screen/movie-detail/routes/route-params-types';

import { SCREEN_ID as TV_SHOW_DETAIL_SCREEN_ID } from '@components/screens/shared/media-detail-screen/tv-show-detail/routes/route-names';
import { TVShowDetailExternalParams } from '@components/screens/shared/media-detail-screen/tv-show-detail/routes/route-params-types';

import { SCREEN_ID as FAMOUS_DETAIL_ID } from '@components/screens/shared/famous-detail/routes/route-names';
import { ExternalFamousDetailParams } from '@components/screens/shared/famous-detail/routes/route-params-types';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

export type SearchNavigationParams = {
  i18nQueryByPaginationErrorRef: string;
  i18nSearchBarPlaceholderRef: string;
  i18nQueryByTextErrorRef: string;
  searchType: SchemaTypes.SearchType;
  queryId: Types.CineTastyQuery;
};

export type SearchStackParams = {
  [TV_SHOW_DETAIL_SCREEN_ID]: TVShowDetailExternalParams;
  [MOVIE_DETAIL_SCREEN_ID]: MovieDetailExternalParams;
  [FAMOUS_DETAIL_ID]: ExternalFamousDetailParams;
  SEARCH: SearchNavigationParams;
};
