import { LocalStackRoute } from 'types';

export type Routes =
  | 'FAMOUS'
  | 'FAMOUS_DETAIL'
  | 'MOVIE_DETAIL'
  | 'REVIEWS'
  | 'TV_SHOW_DETAIL'
  | 'TV_SHOW_SEASONS';

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
  TV_SHOW_DETAIL: {
    id: 'TV_SHOW_DETAIL',
  },
  TV_SHOW_SEASONS: {
    id: 'TV_SHOW_SEASONS',
  },
};

export default LOCAL_ROUTES;
