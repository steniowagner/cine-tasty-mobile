import { LocalStackRoute } from 'types';

export type Routes = 'HOME' | 'FAMOUS_DETAIL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  HOME: {
    id: 'HOME',
  },
  FAMOUS_DETAIL: {
    id: 'FAMOUS_DETAIL',
  },
};

export default LOCAL_ROUTES;
