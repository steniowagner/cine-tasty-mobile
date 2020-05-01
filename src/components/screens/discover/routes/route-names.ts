import { LocalStackRoute } from 'types';

export type Routes = 'DISCOVER';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  DISCOVER: {
    id: 'DISCOVER',
  },
};

export default LOCAL_ROUTES;
