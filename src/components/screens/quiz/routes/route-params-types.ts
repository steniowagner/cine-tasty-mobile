import { QuestionDifficulty, QuestionCategory, QuestionType } from 'types/schema';

export type QuizStackParams = {
  QUIZ: undefined;
  SETUP_QUESTIONS: undefined;
  QUESTIONS: {
    difficulty: QuestionDifficulty;
    category: QuestionCategory;
    numberOfQuestions: number;
    type: QuestionType;
  };
};
