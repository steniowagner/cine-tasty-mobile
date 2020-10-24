import { LocalStackRoute } from 'types';

export type Routes = 'TV_SHOW_DETAIL' | 'FAMOUS_DETAIL' | 'REVIEWS' | 'TV_SHOW_SEASONS';

export const SCREEN_ID = 'TV_SHOW_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  TV_SHOW_DETAIL: {
    id: 'TV_SHOW_DETAIL',
  },
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
  REVIEWS: {
    id: 'REVIEWS',
  },
  TV_SHOW_SEASONS: {
    id: 'TV_SHOW_SEASONS',
  },
};

export default LOCAL_ROUTES;
