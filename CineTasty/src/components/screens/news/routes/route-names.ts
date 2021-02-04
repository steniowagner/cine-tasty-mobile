import { LocalStackRoute } from 'types';

export type Routes = 'NEWS' | 'CUSTOM_MODAL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  NEWS: {
    id: 'NEWS',
  },
  CUSTOM_MODAL: {
    id: 'CUSTOM_MODAL',
  },
};

export default LOCAL_ROUTES;
