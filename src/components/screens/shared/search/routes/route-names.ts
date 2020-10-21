import { LocalStackRoute } from 'types';

export type Routes =
  | 'SEARCH'
  | 'FAMOUS_DETAIL'
  | 'MOVIE_DETAIL'
  | 'REVIEWS'
  | 'TV_SHOW_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  SEARCH: {
    id: 'SEARCH',
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
};

export default LOCAL_ROUTES;
