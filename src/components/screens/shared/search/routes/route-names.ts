import * as Types from '@local-types';

export type Routes =
  | 'SEARCH'
  | 'FAMOUS_DETAIL'
  | 'MOVIE_DETAIL'
  | 'REVIEWS'
  | 'TV_SHOW_DETAIL'
  | 'TV_SHOW_SEASONS';

const LOCAL_ROUTES: Record<Routes, Types.LocalStackRoute<Routes>> = {
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
  TV_SHOW_SEASONS: {
    id: 'TV_SHOW_SEASONS',
  },
};

export default LOCAL_ROUTES;
