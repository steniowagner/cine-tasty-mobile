import { LocalStackRoute } from 'types';

export type Routes = 'SEARCH' | 'FAMOUS_DETAIL' | 'MEDIA_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  SEARCH: {
    id: 'SEARCH',
  },
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
  MEDIA_DETAIL: {
    id: 'MEDIA_DETAIL',
  },
};

export default LOCAL_ROUTES;
