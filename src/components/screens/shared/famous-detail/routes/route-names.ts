import { LocalStackRoute } from 'types';

export type Routes = 'FAMOUS_DETAIL' | 'MOVIE_DETAIL';

export const SCREEN_ID = 'FAMOUS_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
  MOVIE_DETAIL: {
    id: 'MOVIE_DETAIL',
  },
};

export default LOCAL_ROUTES;
