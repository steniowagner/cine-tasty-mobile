import { LocalStackRoute } from 'types';

export type Routes = 'FAMOUS' | 'FAMOUS_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  FAMOUS: {
    id: 'FAMOUS',
  },
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
};

export default LOCAL_ROUTES;
