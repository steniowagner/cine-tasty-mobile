import { LocalStackRoute } from 'types';

export type Routes = 'QUIZ' | 'SETUP_QUESTIONS' | 'QUESTIONS';

const LOCAL_ROUTES: Record<Routes, LocalStackRoute<Routes>> = {
  QUIZ: {
    id: 'QUIZ',
  },
  SETUP_QUESTIONS: {
    id: 'SETUP_QUESTIONS',
  },
  QUESTIONS: {
    id: 'QUESTIONS',
  },
};

export default LOCAL_ROUTES;
