import * as Types from '@local-types';

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

type OpenSourceSection = {
  description: string;
  title: string;
};

type Onboarding = {
  description: string;
  title: string;
};

type LanguageWarning = {
  positiveAction: string;
  negativeAction: string;
  title: string;
  description: string;
};

export type Locale = {
  errors: Record<ErrorType, Record<keyof ErrorDescription, string> | string>;
  select: string;
  softwareEngineer: string;
  about: string;
  languageWarning: {
    famous: Omit<LanguageWarning, 'negativeAction'>;
    media: Omit<LanguageWarning, 'negativeAction'>;
    quiz: LanguageWarning;
  };
  onboarding: {
    cinema: Onboarding;
    famous: Onboarding;
    quiz: Onboarding;
    news: Onboarding;
    next: string;
    start: string;
  };
  tabs: Record<Tabs, string>;
  time: Record<Time, string>;
  home: {
    learMoreButtonText: string;
    viewAll: string;
    tvShows: string;
    movies: string;
    search: {
      movie: {
        queryByTextError: string;
        paginationError: string;
        placeholder: string;
      };
      tvShows: {
        queryByTextError: string;
        paginationError: string;
        placeholder: string;
      };
    };
    settings: {
      imagesQuality: string;
      openSource: string;
      language: string;
      about: string;
      theme: string;
      sections: {
        openSource: {
          libraries: OpenSourceSection;
          github: OpenSourceSection;
          tmdb: OpenSourceSection;
          newsapi: OpenSourceSection;
          opentrivia: OpenSourceSection;
        };
        theme: {
          dark: string;
          light: string;
          system: string;
        };
        languages: Record<Types.Languages, string>;
        imageQualities: Record<Types.ImageQualities, string>;
      };
    };
    tvShowsPaginationError: string;
    moviesPaginationError: string;
    trendingMovies: {
      error: string;
      nowPlaying: string;
      nowPlayingViewAllTitle: string;
      popular: string;
      popularViewAllTitle: string;
      topRated: string;
      topRatedViewAllTitle: string;
      upcoming: string;
      upcomingViewAllTitle: string;
    };
    trendingTvShows: {
      error: string;
      onTheAir: string;
      onTheAirViewAllTitle: string;
      popular: string;
      popularViewAllTitle: string;
      topRated: string;
      topRatedViewAllTitle: string;
      airingToday: string;
      airingTodayViewAllTitle: string;
    };
  };
  news: {
    languages: Record<Types.NewsFilterLanguage, string>;
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
    category_mixed: string;
    category_movie: string;
    category_tv: string;
    difficulty_easy: string;
    difficulty_medium: string;
    difficulty_hard: string;
    difficulty_mixed: string;
    type_multiple: string;
    type_boolean: string;
    type_mixed: string;
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
  };
  famous: {
    searchPaginationError: string;
    searchByTextError: string;
    searchEntryQueryError: string;
    searchBarPlaceholder: string;
  };
  search: {
    recent: string;
    emptyList: {
      description: string;
      suggestion: string;
      title: string;
    };
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
  mediaDetail: {
    errorDescription: string;
    errorSuggestion: string;
    errorTitle: string;
    votes: string;
    tvShow: {
      tvShow: string;
      back: string;
      seasonEpisode: {
        readMoreSeasonOverview: string;
        episodes: string;
        airDate: string;
        season: string;
      };
      errors: {
        description: string;
        suggestion: string;
        title: string;
      };
    };
    movie: {
      movie: string;
    };
    sections: {
      productionCompanies: string;
      productionCountries: string;
      spokenLanguages: string;
      reviews: string;
      overview: string;
      details: string;
      videos: string;
      cast: string;
      crew: string;
      images: string;
      similar: string;
      originalTitle: string;
      releaseDate: string;
      budget: string;
      revenue: string;
      numberOfEpisodes: string;
      originalLanguage: string;
      numberOfSeasons: string;
      firstAirDate: string;
      lastAirDate: string;
      createdBy: string;
      seasons: string;
      episodeRunTime: string;
      originCountry: string;
      networks: string;
    };
  };
  months: string[];
};
