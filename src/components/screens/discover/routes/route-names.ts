import { LocalStackRoute } from 'types';

export type Routes = 'DISCOVER' | 'FAMOUS_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  DISCOVER: {
    id: 'DISCOVER',
  },
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
};

export default LOCAL_ROUTES;
