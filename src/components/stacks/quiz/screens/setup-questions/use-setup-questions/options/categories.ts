import { QuizQuestionCategory } from '@schema-types';
import { Translations } from '@/i18n/tags';

export const categories = [
  {
    value: QuizQuestionCategory.MIXED,
    translationTag: Translations.Quiz.QUIZ_CATEGORY_MIXED,
  },
  {
    value: QuizQuestionCategory.MOVIE,
    translationTag: Translations.Quiz.QUIZ_CATEGORY_MOVIE,
  },
  {
    value: QuizQuestionCategory.TV,
    translationTag: Translations.Quiz.QUIZ_CATEGORY_TV,
  },
];
