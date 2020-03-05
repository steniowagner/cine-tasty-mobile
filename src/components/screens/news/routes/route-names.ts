import { LocalStackRoute } from '../../../../types';

type Routes = 'NEWS';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute> = {
  NEWS: {
    title: 'News',
    id: 'NEWS',
  },
};

export default LOCAL_ROUTES;
