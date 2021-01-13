import { LocalStackRoute } from 'types';

export type Routes =
  | 'SETTINGS'
  | 'LANGUAGE'
  | 'OPEN_SOURCE'
  | 'ABOUT'
  | 'IMAGES_QUALITY'
  | 'THEME';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
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
