import { LocalStackRoute } from 'types';

export type Routes = 'FAMOUS' | 'FAMOUS_DETAIL' | 'MOVIE_DETAIL' | 'REVIEWS';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  FAMOUS: {
    id: 'FAMOUS',
  },
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
  MOVIE_DETAIL: {
    id: 'MOVIE_DETAIL',
  },
  REVIEWS: {
    id: 'REVIEWS',
  },
};

export default LOCAL_ROUTES;
