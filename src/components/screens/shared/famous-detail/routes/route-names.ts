import { LocalStackRoute } from 'types';

export type Routes = 'FAMOUS_DETAIL' | 'MEDIA_DETAIL';

export const SCREEN_ID = 'FAMOUS_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
  MEDIA_DETAIL: {
    id: 'MEDIA_DETAIL',
  },
};

export default LOCAL_ROUTES;
