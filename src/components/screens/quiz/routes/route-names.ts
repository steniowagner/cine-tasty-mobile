import * as Types from '@local-types';

export type Routes = 'QUIZ' | 'SETUP_QUESTIONS' | 'QUESTIONS' | 'RESULTS';

const LOCAL_ROUTES: Record<Routes, Types.LocalStackRoute<Routes>> = {
  QUIZ: {
    id: 'QUIZ',
  },
  SETUP_QUESTIONS: {
    id: 'SETUP_QUESTIONS',
  },
  QUESTIONS: {
    id: 'QUESTIONS',
  },
  RESULTS: {
    id: 'RESULTS',
  },
};

export default LOCAL_ROUTES;
