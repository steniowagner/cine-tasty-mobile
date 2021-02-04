import { Locale } from './Locale';

const en: Locale = {
  languages: {
    en: 'ptPT-English',
    es: 'ptPT-Spanish',
    ptBR: 'ptPT-Brazilian Portuguese',
    ptPT: 'ptPT-Portuguese',
    sv: 'ptPT-Swendish',
  },
  errors: {
    paginateFamousError: "Couldn't load more Famous",
    searchFamousError: "Couldn't search for this person",
    reloadNewsError: "Couldn't reload the news",
    loadMoreNewsError: "Couldn't load more news",
    network: {
      description: 'description',
      suggestion: 'suggestion',
      title: 'title',
    },
  },
  tabs: {
    home: 'Home',
    news: 'News',
    famous: 'Famous',
    quiz: 'Quiz',
  },
  time: {
    year: '{{ value }}yr ago',
    year_plural: '{{ value }}yr ago',
    month: '{{ value }}mth ago',
    month_plural: '{{ value }}mth ago',
    day: '{{ value }}d ago',
    day_plural: '{{ value }}d ago',
    hour: '{{ value }}h ago',
    hour_plural: '{{ value }}h ago',
    minute: '{{ value }}m ago',
    minute_plural: '{{ value }}m ago',
    second: '{{ value }}s ago',
    second_plural: '{{ value }}s ago',
  },
  news: {
    i18nQueryByPaginationErrorRef: 'i18nQueryByPaginationErrorRef',
    i18EntryQueryErrorRef: 'i18EntryQueryErrorRef',
    languages: {
      english: 'English',
      arabic: 'Arabic',
      mandarim: 'Mandarim',
      dutch: 'Dutch',
      french: 'French',
      german: 'German',
      hebrew: 'Hebrew',
      italian: 'Italian',
      norwegian: 'Norwegian',
      portuguese: 'Portuguese',
      russian: 'Russian',
      sami: 'Sami',
      spanish: 'Spanish',
    },
    filterMessage: 'Choose a language to filter the News',
    selectFilterMessage: 'SELECT',
    emptyList: {
      description: 'description',
      suggestion: 'suggestion',
      title: 'title',
    },
  },
  quiz: {
    welcome: 'Welcome to the Cine-Tasty Quiz!',
    decription:
      'Want to test your knowledge about the world of cinema?\n\nYou can choose the type (true/false or multi-choice), category (Movies or Tv) and how many questions you want to answer.',
    challenge: 'Can you score 100%?',
    chooseQuestions: 'CHOOSE QUESTIONS',
    startButton: 'START QUIZ',
    difficulty: 'Difficulty',
    category: 'Category',
    type: 'Type',
    numberOfQuestions: 'Number of Questions',
    setDifficulty: 'Difficulty of the questions',
    setCategory: 'Category of the questions',
    setType: 'Type of questions',
    modalSelectText: 'select',
    categoryMixed: 'Mixed',
    categoryMovie: 'Movies',
    categoryTv: 'Tv',
    difficultyEasy: 'Easy',
    difficultyMedium: 'Medium',
    difficultyHard: 'Hard',
    difficultyMixed: 'Mixed',
    typeMultiple: 'Multiple',
    typeBoolean: 'Boolean',
    typeMixed: 'Mixed',
    playAgain: 'Play Again',
    playAgainDescription: 'Do you want to play the Quiz again?',
    answer: 'Answer',
    yourAnswer: 'Your Answer',
    scores: 'You scored',
    no: 'No',
    yes: 'Yes',
    noQuestionsAdviseTitle: 'Wow!',
    noQuestionsAdviseDescription:
      "Seems like we don't have enough questions for your taste today.",
    noQuestionsAdviseSuggestion: 'Try to change the search parameters.',
    next: 'NEXT',
    true: 'True',
    false: 'False',
  },
  famous: {
    searchBarPlaceholder: 'Search for an Actor or Actress...',
    i18nQueryByPaginationErrorRef: 'i18nQueryByPaginationErrorRef',
    i18nQueryByTextErrorRef: 'i18nQueryByTextErrorRef',
    i18EntryQueryErrorRef: 'i18EntryQueryErrorRef',
  },
  search: {
    recent: 'Recent',
    emptyList: {
      description: 'emptyList -- description',
      suggestion: 'emptyList -- suggestion',
      title: 'emptyList -- title',
    },
  },
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  famousDetail: {
    readLess: 'Read less',
    readMore: 'Read more',
    biography: 'Biography',
    images: 'Images',
    castMovies: 'Cast (Movies)',
    castTV: 'Cast (TV Shows)',
    errorDescription: 'errorDescription',
    errorSuggestion: 'errorSuggestion',
    errorTitle: 'errorTitle',
  },
  home: {
    learMoreButtonText: 'LEARN MORE',
    settings: 'Settings',
    tvShows: 'TV Shows',
    viewAll: 'View All',
    movies: 'Movies',
    trendingMovies: {
      error: 'trendingMoviesError',
      nowPlaying: 'Now Playing',
      nowPlayingViewAllTitle: 'nowPlayingViewAllTitle',
      popular: 'Popular',
      popularViewAllTitle: 'popularViewAllTitle',
      topRated: 'Top Rated',
      topRatedViewAllTitle: 'topRatedViewAllTitle',
      upcoming: 'Upcoming',
      upcomingViewAllTitle: 'upcomingViewAllTitle',
    },
    settingsSections: {
      language: {
        sectionDescription: 'languageDescription',
        sectionTitle: 'languageTitle',
        headerTitle: 'Language',
      },
      imageQualityDescription: 'imageQualityDescription',
      imageQualityTitle: 'imageQualityTitle',
      profileDescription: 'profileDescription',
      profileTitle: 'profileTitle',
      openSourceDescription: 'openSourceDescription',
      openSourceTitle: 'openSourceTitle',
    },
    trendingTvShows: {
      error: 'trendingTVShowsError',
      onTheAirViewAllTitle: 'onTheAirViewAllTitle',
      onTheAir: 'On the Air',
      popularViewAllTitle: 'popularViewAllTitle',
      popular: 'Popular',
      topRatedViewAllTitle: 'topRatedViewAllTitle',
      topRated: 'Top Rated',
      airingToday: 'Airing Today',
      airingTodayViewAllTitle: 'airingTodayViewAllTitle',
    },
    tvShowsPaginationError: 'tvShowsPaginationError',
    moviesPaginationError: 'moviesPaginationError',
    search: {
      movie: {
        queryByTextError: 'movie-queryByTextError',
        paginationError: 'movie-paginationError',
        placeholder: 'movies-placeholder',
      },
      tvShows: {
        queryByTextError: 'tv-shows-queryByTextError',
        paginationError: 'tv-shows-paginationError',
        placeholder: 'tv-shows-placeholder',
      },
    },
  },
  mediaDetail: {
    errorDescription: 'errorDescription',
    errorSuggestion: 'errorSuggestion',
    errorTitle: 'errorTitle',
    votes: 'Votes',
    tvShow: {
      tvShow: 'TV-Show',
      seasonEpisode: {
        readMoreSeasonOverview: 'Read More',
        episodes: 'Episodes',
        airDate: 'Aired in',
        season: 'Season',
      },
      errors: {
        description: 'description',
        suggestion: 'suggestion',
        title: 'title',
      },
    },
    movie: {
      movie: 'Movie',
    },
    sections: {
      productionCompanies: 'Production companies',
      productionCountries: 'Production countries',
      spokenLanguages: 'Spoken languages',
      originalTitle: 'Original title',
      releaseDate: 'Release date',
      budget: 'Budget',
      revenue: 'Revenue',
      overview: 'Overview',
      reviews: 'Reviews',
      details: 'Details',
      videos: 'Videos',
      cast: 'Cast',
      crew: 'Crew',
      images: 'Images',
      similar: 'Similar',
      numberOfEpisodes: 'Number of Episodes',
      numberOfSeasons: 'Number of Seasons',
      firstAirDate: 'First Air Date',
      lastAirDate: 'Last Air Date',
      originalLanguage: 'Original Language',
      episodeRunTime: 'Episode Runtime',
      originCountry: 'Origin Country',
      createdBy: 'Created By',
      seasons: 'See Seasons',
      networks: 'Networks',
    },
  },
};

export default en;
