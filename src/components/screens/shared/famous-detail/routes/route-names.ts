import { LocalStackRoute } from 'types';

export type Routes = 'FAMOUS_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
};

export default LOCAL_ROUTES;
