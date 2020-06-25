import { LocalStackRoute } from 'types';

export type Routes = 'PEOPLE' | 'SEARCH_PERSON';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  PEOPLE: {
    id: 'PEOPLE',
  },
  SEARCH_PERSON: {
    id: 'SEARCH_PERSON',
  },
};

export default LOCAL_ROUTES;
