import { LocalStackRoute } from 'types';

export type Routes = 'PEOPLE';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  PEOPLE: {
    id: 'PEOPLE',
  },
};

export default LOCAL_ROUTES;
