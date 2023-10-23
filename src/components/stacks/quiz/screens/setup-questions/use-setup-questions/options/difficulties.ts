import { QuizQuestionDifficulty } from '@schema-types';
import { Translations } from '@/i18n/tags';

export const difficulties = [
  {
    value: QuizQuestionDifficulty.MIXED,
    translationTag: Translations.Quiz.QUIZ_DIFFICULTY_MIXED,
  },
  {
    value: QuizQuestionDifficulty.EASY,
    translationTag: Translations.Quiz.QUIZ_DIFFICULTY_EASY,
  },
  {
    value: QuizQuestionDifficulty.MEDIUM,
    translationTag: Translations.Quiz.QUIZ_DIFFICULTY_MEDIUM,
  },
  {
    value: QuizQuestionDifficulty.HARD,
    translationTag: Translations.Quiz.QUIZ_DIFFICULTY_HARD,
  },
];
