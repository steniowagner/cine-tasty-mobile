import { MODAL_ID as IMAGES_GALLERY_MODAL_ID } from 'components/screens/shared/images-gallery/routes/stack-routes';
import { ImagesGalleryParams } from 'components/screens/shared/images-gallery/routes/route-params-types';

import { SCREEN_ID as FAMOUS_DETAIL_ID } from 'components/screens/shared/famous-detail/routes/route-names';
import { ExternalFamousDetailParams } from 'components/screens/shared/famous-detail/routes/route-params-types';

import { SearchNavigationParams } from 'components/screens/shared/search/routes/route-params-types';
import { StackID as SEARCH_MODAL_ID } from 'components/screens/shared/search/routes/stack-routes';

import { SCREEN_ID as MOVIE_DETAIL_STACK_ID } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-names';
import { MovieDetailExternalParams } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-params-types';

export type FamousStackParams = {
  [MOVIE_DETAIL_STACK_ID]: MovieDetailExternalParams;
  [IMAGES_GALLERY_MODAL_ID]: ImagesGalleryParams;
  [FAMOUS_DETAIL_ID]: ExternalFamousDetailParams;
  [SEARCH_MODAL_ID]: SearchNavigationParams;
  FAMOUS: {
    headerTitle: string;
  };
};
