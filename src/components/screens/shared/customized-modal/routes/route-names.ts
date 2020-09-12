import { LocalStackRoute } from 'types';

export type Routes = 'CUSTOM_MODAL';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  CUSTOM_MODAL: {
    id: 'CUSTOM_MODAL',
  },
};

export default LOCAL_ROUTES;
