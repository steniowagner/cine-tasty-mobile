import { MODAL_ID as IMAGES_GALLERY_MODAL_ID } from 'components/screens/shared/images-gallery/routes/stack-routes';
import { ImagesGalleryParams } from 'components/screens/shared/images-gallery/routes/route-params-types';

import { SearchNavigationParams } from 'components/screens/search/routes/route-params-types';
import { StackID as SEARCH_MODAL_ID } from 'components/screens/search/routes/stack-routes';

export type FamousStackParams = {
  [IMAGES_GALLERY_MODAL_ID]: ImagesGalleryParams;
  [SEARCH_MODAL_ID]: SearchNavigationParams;
  FAMOUS: {
    headerTitle: string;
  };
};
