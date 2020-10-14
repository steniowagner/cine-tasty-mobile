import { LocalStackRoute } from 'types';

export type Routes = 'MOVIE_DETAIL';

export const SCREEN_ID = 'MOVIE_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  MOVIE_DETAIL: {
    id: 'MOVIE_DETAIL',
  },
};

export default LOCAL_ROUTES;
