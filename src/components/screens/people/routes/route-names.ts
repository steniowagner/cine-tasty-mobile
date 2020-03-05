import { LocalStackRoute } from '../../../../types';

type Routes = 'PEOPLE';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute> = {
  PEOPLE: {
    title: 'People',
    id: 'PEOPLE',
  },
};

export default LOCAL_ROUTES;
