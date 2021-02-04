import { LocalStackRoute } from 'types';

export type Routes = 'MOVIE_DETAIL' | 'FAMOUS_DETAIL' | 'REVIEWS';

export const SCREEN_ID = 'MOVIE_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  MOVIE_DETAIL: {
    id: 'MOVIE_DETAIL',
  },
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
  REVIEWS: {
    id: 'REVIEWS',
  },
};

export default LOCAL_ROUTES;
