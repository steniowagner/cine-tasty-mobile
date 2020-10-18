import { LocalStackRoute } from 'types';

export type Routes = 'REVIEWS';

export const SCREEN_ID = 'REVIEWS';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  REVIEWS: {
    id: 'REVIEWS',
  },
};

export default LOCAL_ROUTES;
