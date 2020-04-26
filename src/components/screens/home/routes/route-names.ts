import { LocalStackRoute } from 'types';

export type Routes = 'DISCOVER';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute> = {
  DISCOVER: {
    id: 'DISCOVER',
  },
};

export default LOCAL_ROUTES;
