import { LocalStackRoute } from '../../../../types';

type Routes = 'NEWS';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute> = {
  NEWS: {
    id: 'NEWS',
  },
};

export default LOCAL_ROUTES;
