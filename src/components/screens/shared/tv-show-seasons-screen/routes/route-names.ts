import * as Types from '@local-types';

export type Routes = 'TV_SHOW_SEASONS';

const LOCAL_ROUTES: Record<Routes, Types.LocalStackRoute<Routes>> = {
  TV_SHOW_SEASONS: {
    id: 'TV_SHOW_SEASONS',
  },
};

export default LOCAL_ROUTES;
