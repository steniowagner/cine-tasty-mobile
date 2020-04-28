import { LocalStackRoute } from 'types';

type Routes = 'QUIZ' | 'SETUP_QUESTIONS';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  QUIZ: {
    id: 'QUIZ',
  },
  SETUP_QUESTIONS: {
    id: 'SETUP_QUESTIONS',
  },
};

export default LOCAL_ROUTES;
