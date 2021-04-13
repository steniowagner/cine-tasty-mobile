import * as Types from '@local-types';

export type Routes = 'FAMOUS_DETAIL' | 'MOVIE_DETAIL' | 'TV_SHOW_DETAIL';

export const SCREEN_ID = 'FAMOUS_DETAIL';

const LOCAL_ROUTES: Record<Routes, Types.LocalStackRoute<Routes>> = {
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
  MOVIE_DETAIL: {
    id: 'MOVIE_DETAIL',
  },
  TV_SHOW_DETAIL: {
    id: 'TV_SHOW_DETAIL',
  },
};

export default LOCAL_ROUTES;
