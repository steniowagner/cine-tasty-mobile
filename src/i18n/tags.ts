export namespace Translations {
  export enum Tabs {
    TABS = 'translations:tabs',
    TABS_HOME = 'translations:tabs:home',
    TABS_QUIZ = 'translations:tabs:quiz',
    TABS_NEWS = 'translations:tabs:news',
    TABS_FAMOUS = 'translations:tabs:famous',
  }

  export enum News {
    FILTER_LANGUAGES_CTA_TITLE = 'translations:news:filterLanguagesModal:ctaTitle',
    FILTER_LANGUAGES_TITLE = 'translations:news:filterLanguagesModal:title',
    LANGUAGES = 'translations:news:languages',
    PAGINATION_QUERY_ERROR = 'translations:news:errors:pagination',
    ENTRY_QUERY_ERROR = 'translations:news:errors:entry',
    EMPTY_LIST_ADVICE_DESCRIPTION = 'translations:news:advice:description',
    EMPTY_LIST_ADVICE_SUGGESTION = 'translations:news:advice:suggestion',
    EMPTY_LIST_ADVICE_TITLE = 'translations:news:advice:title',
  }

  export enum Time {
    TIME_YEAR_PLURAL = 'translations:time:year_plural',
    TIME_YEAR = 'translations:time:year',
    TIME_MONTH_PLURAL = 'translations:time:month_plural',
    TIME_MONTH = 'translations:time:month',
    TIME_DAY_PLURAL = 'translations:time:day_plural',
    TIME_DAY = 'translations:time:day',
    TIME_HOUR_PLURAL = 'translations:time:hour_plural',
    TIME_HOUR = 'translations:time:hour',
    TIME_MINUTE_PLURAL = 'translations:time:minute:plural',
    TIME_MINUTE = 'translations:time:minute',
    TIME_SECOND_PLURAL = 'translations:time:second_plural',
    TIME_SECOND = 'translations:time:second',
  }

  export enum Quiz {
    QUIZ = 'translations:quiz',
    QUIZ_WELCOME = 'translations:quiz:welcome',
    QUIZ_DESCRIPTION = 'translations:quiz:decription',
    QUIZ_CHALLENGE = 'translations:quiz:challenge',
    QUIZ_CHOOSE_QUESTIONS = 'translations:quiz:chooseQuestions',
    QUIZ_START_BUTTON = 'translations:quiz:startButton',
    QUIZ_CATEGORY = 'translations:quiz:category',
    QUIZ_CATEGORY_MIXED = 'translations:quiz:categoryMixed',
    QUIZ_CATEGORY_MOVIE = 'translations:quiz:categoryMovie',
    QUIZ_CATEGORY_TV = 'translations:quiz:categoryTV',
    QUIZ_TYPE = 'translations:quiz:type',
    QUIZ_TYPE_MULTIPLE = 'translations:quiz:typeMultiple',
    QUIZ_TYPE_BOOLEAN = 'translations:quiz:typeBoolean',
    QUIZ_TYPE_MIXED = 'translations:quiz:typeMixed',
    QUIZ_NUMBER_OF_QUESTIONS = 'translations:quiz:numberOfQuestions',
    QUIZ_SET_DIFFICULTY = 'translations:quiz:setDifficulty',
    QUIZ_SET_CATEGORY = 'translations:quiz:setCategory',
    QUIZ_SET_TYPE = 'translations:quiz:setType',
    QUIZ_MODAL_SELECT_TEXT = 'translations:quiz:modalSelectText',
    QUIZ_DIFFICULTY = 'translations:quiz:difficulty',
    QUIZ_DIFFICULTY_EASY = 'translations:quiz:difficultyEasy',
    QUIZ_DIFFICULTY_MEDIUM = 'translations:quiz:difficultyMedium',
    QUIZ_DIFFICULTY_HARD = 'translations:quiz:difficultyHard',
    QUIZ_DIFFICULTY_MIXED = 'translations:quiz:difficultyMixed',
    QUIZ_PLAY_AGAIN_DESCRIPTION = 'translations:quiz:playAgainDescription',
    QUIZ_PLAY_AGAIN = 'translations:quiz:playAgain',
    QUIZ_ANSWER = 'translations:quiz:answer',
    QUIZ_YOUR_ANSWER = 'translations:quiz:yourAnswer',
    QUIZ_SCORES = 'translations:quiz:scores',
    QUIZ_YES = 'translations:quiz:yes',
    QUIZ_NO = 'translations:quiz:no',
    QUIZ_NO_QUESTIONS_ADVISE_DESCRIPTION = 'translations:quiz:noQuestionsAdviseDescription',
    QUIZ_NO_QUESTIONS_ADVISE_SUGGESTION = 'translations:quiz:noQuestionsAdviseSuggestion',
    QUIZ_NO_QUESTIONS_ADVISE_TITLE = 'translations:quiz:noQuestionsAdviseTitle',
    QUIZ_NEXT = 'translations:quiz:next',
    QUIZ_TRUE = 'translations:quiz:true',
    QUIZ_FALSE = 'translations:quiz:false',
    QUIZ_SETUP = 'translations:quiz:setupQuiz',
  }

  export enum Error {
    ERROR_ADVICE_DESCRIPTION = 'translations:error:description',
    ERROR_ADVICE_SUGGESTION = 'translations:error:suggestion',
    ERROR_ADVICE_TITLE = 'translations:error:title',
  }

  export enum TrendingFamous {
    ENTRY_ERROR = 'translations:famous:errors:entry',
    PAGINATION_ERROR = 'translations:famous:errors:pagination',
  }

  export enum SearchFamous {
    SEARCHBAR = 'translations:famous:search:searchBarPlaceholder',
    PAGINATION_ERROR = 'translations:famous:search:errors:pagination',
    ENTRY_ERROR = 'translations:famous:search:errors:entry',
  }

  export enum Search {
    SEARCH_RECENT = 'translations:recentSearches',
  }

  export enum Miscellaneous {
    MONTHS = 'translations:months',
    READ_LESS = 'translations:readLess',
    READ_MORE = 'translations:readMore',
    OVERVIEW = 'translations:overview',
  }

  export enum FamousDetails {
    BIOGRAPHY = 'translations:famousDetails:biography',
    CAST_MOVIES = 'translations:famousDetails:castMovies',
    CAST_TV_SHOWS = 'translations:famousDetails:castTVShows',
    ERROR_ADVICE_DESCRIPTION = 'translations:famousDetails:error:description',
    ERROR_ADVICE_SUGGESTION = 'translations:famousDetails:error:suggestion',
    ERROR_ADVICE_TITLE = 'translations:famousDetails:error:title',
  }

  export enum MediaDetails {
    MEDIA_DETAILS_VOTES = 'translations:mediaDetails:votes',
    MEDIA_DETAILS_OVERVIEW = 'translations:mediaDetails:overview',
    MEDIA_DETAILS_VIDEOS = 'translations:mediaDetails:videos',
    MEDIA_DETAILS_SIMILAR = 'translations:mediaDetails:similar',
  }

  export enum TVShowDetails {
    TV_SHOW = 'translations:tvShow:tvShow',
    OVERVIEW = 'translations:tvShow:overview',
    SEASONS = 'translations:tvShow:seasons',
    ORIGINAL_TITLE = 'translations:tvShow:originalTitle',
    ORIGINAL_LANGUAGE = 'translations:tvShow:originalLanguage',
    NUMBER_OF_EPISODES = 'translations:tvShow:numberOfEpisodes',
    NUMBER_OF_SEASONS = 'translations:tvShow:numberOfSeasons',
    EPISODE_RUNTIME = 'translations:tvShow:episodeRuntime',
    ORIGINAL_COUNTRY = 'translations:tvShow:originalCountry',
    FIRST_AIR_DATE = 'translations:tvShow:firstAirDate',
    LAST_AIR_DATE = 'translations:tvShow:lastAirDate',
  }

  export type Tags =
    | Tabs
    | News
    | Time
    | Quiz
    | Error
    | TrendingFamous
    | Search
    | SearchFamous
    | Miscellaneous
    | FamousDetails
    | MediaDetails
    | TVShowDetails;
}
