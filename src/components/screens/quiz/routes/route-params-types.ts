import { QuestionDifficulty, QuestionCategory, QuestionType } from 'types/schema';
import { QuizResult } from 'types';

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
    results: QuizResult[];
  };
};
