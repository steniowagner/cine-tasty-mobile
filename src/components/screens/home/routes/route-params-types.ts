import { SearchNavigationParams } from 'components/screens/shared/search/routes/route-params-types';
import { StackID as SEARCH_MODAL_ID } from 'components/screens/shared/search/routes/stack-routes';

import { SCREEN_ID as MOVIE_DETAIL_SCREEN_ID } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-names';
import { MovieDetailExternalParams } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-params-types';

import { SCREEN_ID as TV_SHOW_DETAIL_SCREEN_ID } from 'components/screens/shared/media-detail-screen/tv-show-detail/routes/route-names';
import { TVShowDetailExternalParams } from 'components/screens/shared/media-detail-screen/tv-show-detail/routes/route-params-types';

import {
  SCREEN_ID as MEDIA_SECTION_VIEW_ALL_SCREEN_ID,
  ExternalProps as MediaSectionViewAllProps,
} from '../components/media-section-view-all/MediaSectionViewAll';

export type HomeStackParams = {
  [MEDIA_SECTION_VIEW_ALL_SCREEN_ID]: MediaSectionViewAllProps;
  [TV_SHOW_DETAIL_SCREEN_ID]: TVShowDetailExternalParams;
  [MOVIE_DETAIL_SCREEN_ID]: MovieDetailExternalParams;
  [SEARCH_MODAL_ID]: SearchNavigationParams;
  HOME: undefined;
};
