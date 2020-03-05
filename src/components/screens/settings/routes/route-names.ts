import { LocalStackRoute } from '../../../../types';

type Routes = 'SETTINGS';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute> = {
  SETTINGS: {
    title: 'Settings',
    id: 'SETTINGS',
  },
};

export default LOCAL_ROUTES;
