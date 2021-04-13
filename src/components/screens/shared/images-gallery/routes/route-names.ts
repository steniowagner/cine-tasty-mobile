import * as Types from '@local-types';

export type Routes = 'IMAGES_GALLERY';

const LOCAL_ROUTES: Record<Routes, Types.LocalStackRoute<Routes>> = {
  IMAGES_GALLERY: {
    id: 'IMAGES_GALLERY',
  },
};

export default LOCAL_ROUTES;
