import { LocalStackRoute } from 'types';

export type Routes = 'HOME' | 'FAMOUS_DETAIL' | 'MEDIA_DETAILS_VIEW_ALL' | 'MOVIE_DETAIL';

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
};

export default LOCAL_ROUTES;
