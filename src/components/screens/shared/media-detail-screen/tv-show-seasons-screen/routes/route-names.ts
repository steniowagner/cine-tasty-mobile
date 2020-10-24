import { LocalStackRoute } from 'types';

export type Routes = 'TV_SHOW_SEASONS'

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  TV_SHOW_SEASONS: {
    id: 'TV_SHOW_SEASONS',
  },
};

export default LOCAL_ROUTES;
