import { NewsFilterLanguage } from 'types';

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

type Tabs = 'home' | 'famous' | 'quiz' | 'news';

type ErrorType =
  | 'network'
  | 'loadMoreNewsError'
  | 'reloadNewsError'
  | 'paginateFamousError'
  | 'searchFamousError';

type ErrorDescription = {
  description: string;
  suggestion: string;
  title: string;
};

export interface Locale {
  errors: Record<ErrorType, Record<keyof ErrorDescription, string> | string>;
  tabs: Record<Tabs, string>;
  time: Record<Time, string>;
  home: {
    learMoreButtonText: string;
    tvShows: string;
    movies: string;
    search: {
      movie: {
        queryByTextError: string;
        paginationError: string;
        placeholder: string;
      };
    };
    trendingMovies: {
      error: string;
      nowPlaying: string;
      popular: string;
      topRated: string;
      upcoming: string;
    };
    trendingTvShows: {
      error: string;
      onTheAir: string;
      popular: string;
      topRated: string;
    };
  };
  news: {
    languages: Record<NewsFilterLanguage, string>;
    i18nQueryByPaginationErrorRef: string;
    i18EntryQueryErrorRef: string;
    selectFilterMessage: string;
    filterMessage: string;
    emptyList: {
      description: string;
      suggestion: string;
      title: string;
    };
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
    categoryTv: string;
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
  };
  famous: {
    i18nQueryByPaginationErrorRef: string;
    i18nQueryByTextErrorRef: string;
    i18EntryQueryErrorRef: string;
    searchBarPlaceholder: string;
  };
  search: {
    recent: string;
  };
  famousDetail: {
    errorDescription: string;
    errorSuggestion: string;
    errorTitle: string;
    castMovies: string;
    biography: string;
    readLess: string;
    readMore: string;
    castTV: string;
    images: string;
  };
  months: string[];
}
