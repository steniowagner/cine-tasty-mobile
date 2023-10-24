import { Translations } from '@/i18n/tags';
import {
  QuizQuestionCategory,
  QuizQuestionDifficulty,
  QuizQuestionType,
} from '@schema-types';

export type OptionValue =
  | QuizQuestionCategory
  | QuizQuestionDifficulty
  | QuizQuestionType;

export type SetupQuestionOption = {
  translationTag: Translations.Quiz;
  value: OptionValue;
};
