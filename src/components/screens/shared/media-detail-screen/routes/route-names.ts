import { LocalStackRoute } from 'types';

export type Routes = 'MEDIA_DETAIL';

export const SCREEN_ID = 'MEDIA_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  MEDIA_DETAIL: {
    id: 'MEDIA_DETAIL',
  },
};

export default LOCAL_ROUTES;
