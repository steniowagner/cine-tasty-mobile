import { MODAL_ID as IMAGES_GALLERY_MODAL_ID } from 'components/screens/shared/images-gallery/routes/stack-routes';
import { ImagesGalleryParams } from 'components/screens/shared/images-gallery/routes/route-params-types';

import { SCREEN_ID as FAMOUS_DETAIL_ID } from 'components/screens/shared/famous-detail/routes/route-names';
import { FamousDetailParams } from 'components/screens/shared/famous-detail/routes/route-params-types';

import { SearchNavigationParams } from 'components/screens/shared/search/routes/route-params-types';
import { StackID as SEARCH_MODAL_ID } from 'components/screens/shared/search/routes/stack-routes';

import { SCREEN_ID as MEDIA_DETAIL_SCREEN_ID } from 'components/screens/shared/media-detail-screen/routes/route-names';
import { MediaDetailParams } from 'components/screens/shared/media-detail-screen/routes/route-params-types';

export type FamousStackParams = {
  [IMAGES_GALLERY_MODAL_ID]: ImagesGalleryParams;
  [MEDIA_DETAIL_SCREEN_ID]: MediaDetailParams;
  [SEARCH_MODAL_ID]: SearchNavigationParams;
  [FAMOUS_DETAIL_ID]: FamousDetailParams;
  FAMOUS: {
    headerTitle: string;
  };
};
