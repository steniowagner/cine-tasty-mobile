import { LocalStackRoute } from '../../../../types';

type Routes = 'QUIZ';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute> = {
  QUIZ: {
    title: 'Quiz',
    id: 'QUIZ',
  },
};

export default LOCAL_ROUTES;
