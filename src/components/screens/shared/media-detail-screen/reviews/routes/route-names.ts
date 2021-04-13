import * as Types from '@local-types';

export type Routes = 'REVIEWS';

export const SCREEN_ID = 'REVIEWS';

const LOCAL_ROUTES: Record<Routes, Types.LocalStackRoute<Routes>> = {
  REVIEWS: {
    id: 'REVIEWS',
  },
};

export default LOCAL_ROUTES;
