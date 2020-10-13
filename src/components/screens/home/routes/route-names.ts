import { LocalStackRoute } from 'types';

export type Routes = 'HOME' | 'FAMOUS_DETAIL' | 'MEDIA_DETAILS_VIEW_ALL' | 'MEDIA_DETAIL';

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
  MEDIA_DETAIL: {
    id: 'MEDIA_DETAIL',
  },
};

export default LOCAL_ROUTES;
