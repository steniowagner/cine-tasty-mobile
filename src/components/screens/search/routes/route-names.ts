import { LocalStackRoute } from 'types';

export type Routes = 'SEARCH';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  SEARCH: {
    id: 'SEARCH',
  },
};

export default LOCAL_ROUTES;
