export namespace Translations {
  export enum Tags {
    // NEWS
    NEWS_QUERY_BY_PAGINATION_ERROR = 'translations:news:i18nQueryByPaginationErrorRef',
    NEWS_ENTRY_QUERY_ERROR = 'translations:news:i18EntryQueryErrorRef',
    NEWS_LANGUAGES = 'translations:news:languages',
    NEWS_FILTER_MESSAGE = 'translations:news:filterMessage',
    NEWS_EMPTY_LIST_DESCRIPTION = 'translations:news:emptyList:description',
    NEWS_EMPTY_LIST_SUGGESTION = 'translations:news:emptyList:suggestion',
    NEWS_EMPTY_LIST_TITLE = 'translations:news:emptyList:title',

    // TIME
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

    // General
    SELECT = 'translations:select',

    // TABS
    TABS = 'translations:tabs',
    TABS_QUIZ = 'translations:tabs:quiz',
    TABS_NEWS = 'translations:tabs:news',
    TABS_FAMOUS = 'translations:tabs:famous',

    // FAMOUS
    FAMOUS_SEARCHBAR_PLACEHOLDER = 'translations:famous:searchBarPlaceholder',
    FAMOUS_QUERY_BY_PAGINATION_ERROR = 'translations:famous:searchPaginationError',
    FAMOUS_QUERY_BY_TEXT_ERROR = 'translations:famous:searchByTextError',
    FAMOUS_ENTRY_QUERY_ERROR = 'translations:famous:searchEntryQueryError',

    // QUIZ
    QUIZ = 'translations:quiz',
    QUIZ_WELCOME = 'translations:quiz:welcome',
    QUIZ_DESCRIPTION = 'translations:quiz:decription',
    QUIZ_CHALLENGE = 'translations:quiz:challenge',
    QUIZ_CHOOSE_QUESTIONS = 'translations:quiz:chooseQuestions',
    QUIZ_START_BUTTON = 'translations:quiz:startButton',
    QUIZ_CATEGORY = 'translations:quiz:category',
    QUIZ_CATEGORY_MIXED = 'translations:quiz:category_mixed',
    QUIZ_CATEGORY_MOVIE = 'translations:quiz:category_movie',
    QUIZ_CATEGORY_TV = 'translations:quiz:category_tv',
    QUIZ_TYPE = 'translations:quiz:type',
    QUIZ_TYPE_MULTIPLE = 'translations:quiz:type_multiple',
    QUIZ_TYPE_BOOLEAN = 'translations:quiz:type_noolean',
    QUIZ_TYPE_MIXED = 'translations:quiz:type_mixed',
    QUIZ_NUMBER_OF_QUESTIONS = 'translations:quiz:numberOfQuestions',
    QUIZ_SET_DIFFICULTY = 'translations:quiz:setDifficulty',
    QUIZ_SET_CATEGORY = 'translations:quiz:setCategory',
    QUIZ_SET_TYPE = 'translations:quiz:setType',
    QUIZ_MODAL_SELECT_TEXT = 'translations:quiz:modalSelectText',
    QUIZ_DIFFICULTY = 'translations:quiz:difficulty',
    QUIZ_DIFFICULTY_EASY = 'translations:quiz:difficulty_easy',
    QUIZ_DIFFICULTY_MEDIUM = 'translations:quiz:difficulty_medium',
    QUIZ_DIFFICULTY_HARD = 'translations:quiz:difficulty_hard',
    QUIZ_DIFFICULTY_MIXED = 'translations:quiz:difficulty_mixed',
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

    // LANGUAGE WARNING
    LANGUAGE_WARNING_QUIZ_POSITIVE_ACTION = 'translations:languageWarning:quiz:positiveAction',
    LANGUAGE_WARNING_QUIZ_NEGATIVE_ACTION = 'translations:languageWarning:quiz:negativeAction',
    LANGUAGE_WARNING_QUIZ_TITLE = 'translations:languageWarning:quiz:title',
    LANGUAGE_WARNING_QUIZ_DESCRIPTION = 'translations:languageWarning:quiz:description',

    // ERRORS
    ERRORS_NETWORK_ERROR_DESCRIPTION = 'translations:errors:network:description',
    ERRORS_NETWORK_ERROR_SUGGESTION = 'translations:errors:network:suggestion',
    ERRORS_NETWORK_ERROR_TITLE = 'translations:errors:network:title',

    // SEARCH
    SEARCH_RECENT = 'translations:search:recent',
    SEARCH_EMPTY_LIST_DESCRIPTION = 'translations:search:emptyList:description',
    SEARCH_EMPTY_LIST_SUGGESTION = 'translations:search:emptyList:suggestion',
    SEARCH_EMPTY_LIST_TITLE = 'translations:search:emptyList:title',

    // LANGUAGE WARNING
    LANGUAGE_WARNING_FAMOUS_POSITIVE_ACTION = 'translations:languageWarning:famous:positiveAction',
    LANGUAGE_WARNING_FAMOUS_TITLE = 'translations:languageWarning:famous:title',
    LANGUAGE_WARNING_FAMOUS_DESCRIPTION = 'translations:languageWarning:famous:description',

    // FAMOUS-DETAIL
    FAMOUS_DETAIL_BIOGRAPHY = 'translations:famousDetail:biography',
    FAMOUS_DETAIL_IMAGES = 'translations:famousDetail:images',
    FAMOUS_DETAIL_CAST_MOVIES = 'translations:famousDetail:castMovies',
    FAMOUS_DETAIL_CAST_TV = 'translations:famousDetail:castTV',
    FAMOUS_DETAIL_ERROR_DESCRIPTION = 'translations:famousDetail:errorDescription',
    FAMOUS_DETAIL_ERROR_SUGGESTION = 'translations:famousDetail:errorSuggestion',
    FAMOUS_DETAIL_ERROR_TITLE = 'translations:famousDetail:errorTitle',

    MONTHS = 'translations:months',

    HOME_VIEW_ALL = 'translations:home:viewAll',

    // MEDIA-DETAIL
    MEDIA_DETAIL_VOTES = 'translations:mediaDetail:votes',
    MEDIA_DETAIL_SECTIONS_OVERVIEW = 'translations:mediaDetail:sections:overview',
    MEDIA_DETAIL_SECTIONS_REVIEW = 'translations:mediaDetail:sections:reviews',
    MEDIA_DETAIL_SECTIONS_VIDEOS = 'translations:mediaDetail:sections:videos',
    MEDIA_DETAIL_ERROR_DESCRIPTION = 'translations:mediaDetail:errorDescription',
    MEDIA_DETAIL_ERROR_SUGGESTION = 'translations:mediaDetail:errorSuggestion',
    MEDIA_DETAIL_ERROR_TITLE = 'translations:mediaDetail:errorTitle',
    MEDIA_DETAIL_SECTIONS_SIMILAR = 'translations:mediaDetail:sections:similar',
    MEDIA_DETAIL_TV_SHOWS_TITLE = 'translations:mediaDetail:tvShow:tvShow',
    MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_READ_MORE_SEASON_OVERVIEW = 'translations:mediaDetail:tvShow:seasonEpisode:readMoreSeasonOverview',
    MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_EPISODE = 'translations:mediaDetail:tvShow:seasonEpisode:episodes',
    MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_AIR_DATE = 'translations:mediaDetail:tvShow:seasonEpisode:airDate',
    MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_SEASON = 'translations:mediaDetail:tvShow:seasonEpisode:season',
    MEDIA_DETAIL_TV_SHOWS_SEASON_BACK = 'translations:mediaDetail:tvShow:back',
    MEDIA_DETAIL_TV_SHOWS_ERRORS_DESCRIPTION = 'translations:mediaDetail:tvShow:errors:description',
    MEDIA_DETAIL_TV_SHOWS_ERRORS_SUGGESTION = 'translations:mediaDetail:tvShow:errors:suggestion',
    MEDIA_DETAIL_TV_SHOWS_ERRORS_TITLE = 'translations:mediaDetail:tvShow:errors:title',
    MEDIA_DETAIL_MOVIE_TITLE = 'translations:mediaDetail:movie:movie',
    MEDIA_DETAIL_SECTIONS_PRODUCTION_COMPANIES = 'translations:mediaDetail:sections:productionCompanies',
    MEDIA_DETAIL_SECTIONS_PRODUCTION_COUNTRIES = 'translations:mediaDetail:sections:productionCountries',
    MEDIA_DETAIL_SECTIONS_SPOKEN_LANGUAGES = 'translations:mediaDetail:sections:spokenLanguages',
    MEDIA_DETAIL_SECTIONS_ORIGINAL_TITLE = 'translations:mediaDetail:sections:originalTitle',
    MEDIA_DETAIL_SECTIONS_RELEASE_DATE = 'translations:mediaDetail:sections:releaseDate',
    MEDIA_DETAIL_SECTIONS_BUDGET = 'translations:mediaDetail:sections:budget',
    MEDIA_DETAIL_SECTIONS_REVENUE = 'translations:mediaDetail:sections:revenue',
    MEDIA_DETAIL_SECTIONS_DETAILS = 'translations:mediaDetail:sections:details',
    MEDIA_DETAIL_SECTIONS_CAST = 'translations:mediaDetail:sections:cast',
    MEDIA_DETAIL_SECTIONS_CREW = 'translations:mediaDetail:sections:crew',
    MEDIA_DETAIL_SECTIONS_IMAGES = 'translations:mediaDetail:sections:images',
    MEDIA_DETAIL_SECTIONS_NUMBER_OF_EPISODES = 'translations:mediaDetail:sections:numberOfEpisodes',
    MEDIA_DETAIL_SECTIONS_NUMBER_OF_SEASONS = 'translations:mediaDetail:sections:numberOfSeasons',
    MEDIA_DETAIL_SECTIONS_FIRST_AIR_DATE = 'translations:mediaDetail:sections:firstAirDate',
    MEDIA_DETAIL_SECTIONS_LAST_AIR_DATE = 'translations:mediaDetail:sections:lastAirDate',
    MEDIA_DETAIL_SECTIONS_ORIGINAL_LANGUAGE = 'translations:mediaDetail:sections:originalLanguage',
    MEDIA_DETAIL_SECTIONS_EPISODE_RUNTIME = 'translations:mediaDetail:sections:episodeRunTime',
    MEDIA_DETAIL_SECTIONS_ORIGINAL_COUNTRY = 'translations:mediaDetail:sections:originCountry',
    MEDIA_DETAIL_SECTIONS_CREATED_BY = 'translations:mediaDetail:sections:createdBy',
    MEDIA_DETAIL_SECTIONS_SEASONS = 'translations:mediaDetail:sections:seasons',
    MEDIA_DETAIL_SECTIONS_NETWORKS = 'translations:mediaDetail:sections:networks',

    // LANGUAGE WARNING
    LANGUAGE_WARNING_MEDIA_POSITIVE_ACTION = 'translations:languageWarning:media:positiveAction',
    LANGUAGE_WARNING_MEDIA_TITLE = 'translations:languageWarning:media:title',
    LANGUAGE_WARNING_MEDIA_DESCRIPTION = 'translations:languageWarning:media:description',

    // HOME
    HOME_LEARN_MORE = 'translations:home:learMoreButtonText',
    HOME_SETTINGS = 'translations:home:settings',
    HOME_TV_SHOWS = 'translations:home:tvShows',
    HOME_MOVIES = 'translations:home:movies',
    HOME_TRENDING_MOVIES_ERROR = 'translations:home:trendingMovies:error',
    HOME_TRENDING_MOVIES_NOW_PLAYING_VIEW_ALL = 'translations:home:trendingMovies:nowPlayingViewAllTitle',
    HOME_TRENDING_MOVIES_NOW_PLAYING = 'translations:home:trendingMovies:nowPlaying',
    HOME_TRENDING_MOVIES_POPULAR_VIEW_ALL = 'translations:home:trendingMovies:popularViewAllTitle',
    HOME_TRENDING_MOVIES_POPULAR = 'translations:home:trendingMovies:popular',
    HOME_TRENDING_MOVIES_TOP_RATED_VIEW_ALL = 'translations:home:trendingMovies:topRatedViewAllTitle',
    HOME_TRENDING_MOVIES_TOP_RATED = 'translations:home:trendingMovies:topRated',
    HOME_TRENDING_MOVIES_UPCOMING_VIEW_ALL = 'translations:home:trendingMovies:upcomingViewAllTitle',
    HOME_TRENDING_MOVIES_UPCOMING = 'translations:home:trendingMovies:upcoming',
    HOME_TRENDING_TV_SHOWS_ERROR = 'translations:home:trendingTvShows:error',
    HOME_TRENDING_TV_SHOWS_ON_THE_AIR_VIEW_ALL = 'translations:home:trendingTvShows:onTheAirViewAllTitle',
    HOME_TRENDING_TV_SHOWS_ON_THE_AIR = 'translations:home:trendingTvShows:onTheAir',
    HOME_TRENDING_TV_SHOWS_POPULAR_VIEW_ALL = 'translations:home:trendingTvShows:popularViewAllTitle',
    HOME_TRENDING_TV_SHOWS_POPULAR = 'translations:home:trendingTvShows:popular',
    HOME_TRENDING_TV_SHOWS_TOP_RATED_VIEW_ALL = 'translations:home:trendingTvShows:topRatedViewAllTitle',
    HOME_TRENDING_TV_SHOWS_TOP_RATED = 'translations:home:trendingTvShows:topRated',
    HOME_TRENDING_TV_SHOWS_AIRING_TODAY_VIEW_ALL = 'translations:home:trendingTvShows:airingTodayViewAllTitle',
    HOME_TRENDING_TV_SHOWS_AIRING_TODAY = 'translations:home:trendingTvShows:airingToday',
    HOME_TV_SHOWS_PAGINATION_ERROR = 'translations:home:tvShowsPaginationError',
    HOME_MOVIES_PAGINATION_ERROR = 'translations:home:moviesPaginationError',
    HOME_SEARCH_MOVIE_QUERY_BY_TEXT_ERROR = 'translations:home:search:movie:queryByTextError',
    HOME_SEARCH_MOVIE_PAGINATION_ERROR = 'translations:home:search:movie:paginationError',
    HOME_SEARCH_MOVIE_PLACEHOLDER = 'translations:home:search:movie:placeholder',
    HOME_SEARCH_TV_SHOW_QUERY_BY_TEXT_ERROR = 'translations:home:search:tvShows:queryByTextError',
    HOME_SEARCH_TV_SHOW_PAGINATION_ERROR = 'translations:home:search:tvShows:paginationError',
    HOME_SEARCH_TV_SHOW_PLACEHOLDER = 'translations:home:search:tvShows:placeholder',

    // Settings
    SETTINGS_ABOUT = 'translations:home:settings:about',
    SETTINGS_IMAGES_QUALITY = 'translations:home:settings:imagesQuality',
    SETTINGS_OPEN_SOURCE = 'translations:home:settings:openSource',
    SETTINGS_LANGUAGE = 'translations:home:settings:language',
    SETTINGS_THEME = 'translations:home:settings:theme',

    // Settings/About
    SETTINGS_ABOUT_SOFTWARE_ENGINEER = 'translations:softwareEngineer',
    SETTINGS_ABOUT_ABOUT_ME = 'translations:about',

    // Settings/Open-source
    SETTINGS_OPEN_SOURCE_LIBRARIES_DESCRIPTION = 'translations:home:settings:sections:openSource:libraries:description',
    SETTINGS_OPEN_SOURCE_LIBRARIES_TITLE = 'translations:home:settings:sections:openSource:libraries:title',
    SETTINGS_OPEN_SOURCE_GITHUB_DESCRIPTION = 'translations:home:settings:sections:openSource:github:description',
    SETTINGS_OPEN_SOURCE_GITHUB_TITLE = 'translations:home:settings:sections:openSource:github:title',
    SETTINGS_OPEN_SOURCE_TMDB_DESCRIPTION = 'translations:home:settings:sections:openSource:tmdb:description',
    SETTINGS_OPEN_SOURCE_TMDB_TITLE = 'translations:home:settings:sections:openSource:tmdb:title',
    SETTINGS_OPEN_SOURCE_NEWS_API_DESCRIPTION = 'translations:home:settings:sections:openSource:newsapi:description',
    SETTINGS_OPEN_SOURCE_NEWS_API_TITLE = 'translations:home:settings:sections:openSource:newsapi:title',
    SETTINGS_OPEN_SOURCE_OPEN_TRIVIA_API_DESCRIPTION = 'translations:home:settings:sections:openSource:opentrivia:description',
    SETTINGS_OPEN_SOURCE_OPEN_TRIVIA_API_TITLE = 'translations:home:settings:sections:openSource:opentrivia:title',

    // Settings/Theme
    SETTINGS_THEME_SYSTEM_PREFERENCES = 'translations:home:settings:sections:theme:system',
    SETTINGS_THEME_LIGHT = 'translations:home:settings:sections:theme:light',
    SETTINGS_THEME_DARK = 'translations:home:settings:sections:theme:dark',

    // Settings/Languages
    SETTINGS_LANGUAGES = 'translations:home:settings:sections:languages',

    // Settings/Images-quality
    SETTINGS_IMAGES_QUALITIES = 'translations:home:settings:sections:imageQualities',

    READ_LESS = 'translations:readLess',
    READ_MORE = 'translations:readMore',
  }
}
// repetidos: READ_MORE, READ_LESS, MOVIE, TV
