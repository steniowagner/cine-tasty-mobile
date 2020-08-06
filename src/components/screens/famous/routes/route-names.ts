import { LocalStackRoute } from 'types';

export type Routes = 'FAMOUS';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  FAMOUS: {
    id: 'FAMOUS',
  },
};

export default LOCAL_ROUTES;
