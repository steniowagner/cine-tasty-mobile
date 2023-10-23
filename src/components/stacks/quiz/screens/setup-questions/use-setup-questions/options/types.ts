import { Translations } from '@/i18n/tags';
import { QuizQuestionType } from '@schema-types';

export const types = [
  {
    value: QuizQuestionType.MIXED,
    translationTag: Translations.Quiz.QUIZ_TYPE_MIXED,
  },
  {
    value: QuizQuestionType.MULTIPLE,
    translationTag: Translations.Quiz.QUIZ_TYPE_MULTIPLE,
  },
  {
    value: QuizQuestionType.BOOLEAN,
    translationTag: Translations.Quiz.QUIZ_TYPE_BOOLEAN,
  },
];
