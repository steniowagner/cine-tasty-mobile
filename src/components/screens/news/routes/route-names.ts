import * as Types from '@local-types';

export type Routes = 'NEWS' | 'CUSTOM_MODAL';

const LOCAL_ROUTES: Record<Routes, Types.LocalStackRoute<Routes>> = {
  NEWS: {
    id: 'NEWS',
  },
  CUSTOM_MODAL: {
    id: 'CUSTOM_MODAL',
  },
};

export default LOCAL_ROUTES;
