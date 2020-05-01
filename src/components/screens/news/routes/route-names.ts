import { LocalStackRoute } from 'types';

export type Routes = 'NEWS';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  NEWS: {
    id: 'NEWS',
  },
};

export default LOCAL_ROUTES;
