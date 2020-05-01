import { LocalStackRoute } from 'types';

export type Routes = 'SETTINGS';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  SETTINGS: {
    id: 'SETTINGS',
  },
};

export default LOCAL_ROUTES;
