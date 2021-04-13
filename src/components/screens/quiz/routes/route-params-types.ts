/* eslint-disable camelcase */
import { MODAL_ID as CUSTOM_MODAL_ID } from '@components/screens/shared/customized-modal/routes/stack-routes';
import { CustomModalParams } from '@components/screens/shared/customized-modal/routes/route-params-types';
import * as SchemaTypes from '@schema-types';

export type QuizStackParams = {
  QUIZ: undefined;
  SETUP_QUESTIONS: undefined;
  QUESTIONS: {
    difficulty: SchemaTypes.QuestionDifficulty;
    category: SchemaTypes.QuestionCategory;
    numberOfQuestions: number;
    type: SchemaTypes.QuestionType;
  };
  RESULTS: {
    questions: SchemaTypes.GetQuizQuestions_quiz[];
    answers: string[];
  };
  [CUSTOM_MODAL_ID]: CustomModalParams;
};
