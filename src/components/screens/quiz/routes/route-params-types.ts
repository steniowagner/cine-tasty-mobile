import { MODAL_ID as CUSTOM_MODAL_ID } from 'components/screens/shared/customized-modal/routes/stack-routes';
import { CustomModalParams } from 'components/screens/shared/customized-modal/routes/route-params-types';

import {
  GetQuizQuestions_quiz as QuizQuestions,
  QuestionDifficulty,
  QuestionCategory,
  QuestionType,
} from 'types/schema';

export type QuizStackParams = {
  QUIZ: undefined;
  SETUP_QUESTIONS: undefined;
  QUESTIONS: {
    difficulty: QuestionDifficulty;
    category: QuestionCategory;
    numberOfQuestions: number;
    type: QuestionType;
  };
  RESULTS: {
    questions: QuizQuestions[];
    answers: string[];
  };
  [CUSTOM_MODAL_ID]: CustomModalParams;
};
