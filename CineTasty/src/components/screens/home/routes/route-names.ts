import { LocalStackRoute } from 'types';

export type Routes =
  | 'HOME'
  | 'FAMOUS_DETAIL'
  | 'MEDIA_DETAILS_VIEW_ALL'
  | 'MOVIE_DETAIL'
  | 'TV_SHOW_DETAIL'
  | 'REVIEWS'
  | 'TV_SHOW_SEASONS'
  | 'SETTINGS'
  | 'LANGUAGE'
  | 'OPEN_SOURCE'
  | 'ABOUT'
  | 'IMAGES_QUALITY'
  | 'THEME';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  HOME: {
    id: 'HOME',
  },
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
  MEDIA_DETAILS_VIEW_ALL: {
    id: 'MEDIA_DETAILS_VIEW_ALL',
  },
  MOVIE_DETAIL: {
    id: 'MOVIE_DETAIL',
  },
  TV_SHOW_DETAIL: {
    id: 'TV_SHOW_DETAIL',
  },
  REVIEWS: {
    id: 'REVIEWS',
  },
  TV_SHOW_SEASONS: {
    id: 'TV_SHOW_SEASONS',
  },
  SETTINGS: {
    id: 'SETTINGS',
  },
  LANGUAGE: {
    id: 'LANGUAGE',
  },
  OPEN_SOURCE: {
    id: 'OPEN_SOURCE',
  },
  ABOUT: {
    id: 'ABOUT',
  },
  IMAGES_QUALITY: {
    id: 'IMAGES_QUALITY',
  },
  THEME: {
    id: 'THEME',
  },
};

export default LOCAL_ROUTES;
