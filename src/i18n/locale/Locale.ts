import { TabRouteIds } from '@/navigation/components/tab-navigator/tabs';
import { NewsFilterLanguage } from '@app-types';

type Time =
  | 'year'
  | 'year_plural'
  | 'month'
  | 'month_plural'
  | 'day'
  | 'day_plural'
  | 'hour'
  | 'hour_plural'
  | 'minute'
  | 'minute_plural'
  | 'second'
  | 'second_plural';

type Advice = {
  description: string;
  suggestion: string;
  title: string;
};

type Errors = {
  pagination: string;
  entry: string;
};

export type Locale = {
  tabs: Record<TabRouteIds, string>;
  time: Record<Time, string>;
  news: {
    filterLanguagesModal: {
      ctaTitle: string;
      title: string;
    };
    languages: Record<NewsFilterLanguage, string>;
    errors: Errors;
    advice: Advice;
  };
  quiz: {
    numberOfQuestions: string;
    chooseQuestions: string;
    modalSelectText: string;
    setDifficulty: string;
    setCategory: string;
    startButton: string;
    difficulty: string;
    decription: string;
    challenge: string;
    category: string;
    welcome: string;
    setType: string;
    type: string;
    categoryMixed: string;
    categoryMovie: string;
    categoryTV: string;
    difficultyEasy: string;
    difficultyMedium: string;
    difficultyHard: string;
    difficultyMixed: string;
    typeMultiple: string;
    typeBoolean: string;
    typeMixed: string;
    playAgain: string;
    playAgainDescription: string;
    answer: string;
    yourAnswer: string;
    scores: string;
    no: string;
    yes: string;
    noQuestionsAdviseTitle: string;
    noQuestionsAdviseDescription: string;
    noQuestionsAdviseSuggestion: string;
    next: string;
    true: string;
    false: string;
    setupQuiz: string;
  };
};
