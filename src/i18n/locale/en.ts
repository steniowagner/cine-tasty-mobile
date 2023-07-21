import {Locale} from './Locale';

const en: Locale = {
  softwareEngineer: 'Software Engineer',
  languageWarning: {
    quiz: {
      positiveAction: 'Yes',
      negativeAction: 'No',
      title: 'Oops, just one thing...',
      description:
        'All the quiz questions are in english, do you want to play the game anyway?',
    },
    media: {
      positiveAction: 'OK',
      title: 'Just one thing...',
      description:
        "This app is not responsible for the translations of this overview text, and it's maybe not available for your language.",
    },
    famous: {
      positiveAction: 'OK',
      title: 'Just one thing...',
      description:
        "This app is not responsible for the translations of this biography text, and it's maybe not available for your language.",
    },
  },
  onboarding: {
    next: 'NEXT',
    start: 'START',
    cinema: {
      description: 'Discover which are the latest cinema and tv-shows titles',
      title: 'Cinema/TV',
    },
    famous: {
      description:
        'See who are the actors and actresses that are in the trends today',
      title: 'Famous',
    },
    quiz: {
      description:
        'Test your cinema knowledge with exciting and challenging questions',
      title: 'Quiz',
    },
    news: {
      description:
        'Stay up to date with the latest news of the movies/tv world',
      title: 'News',
    },
  },
  select: 'SELECT',
  theme: {
    dark: 'Dark',
    light: 'Light',
    system: 'Follow System Preferences',
  },
  about:
    "Hey!\n\nI'm Full-Stack Software Engineer that loves apply his knowledge to solve problems, create amazing products and impact lives!",
  imageQualities: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    veryHigh: 'Very High',
  },
  languages: {
    en: 'English',
    es: 'Spanish',
    ptBR: 'Portuguese',
  },
  errors: {
    paginateFamousError: "Couldn't load more Famous",
    searchFamousError: "Couldn't search for this person",
    reloadNewsError: "Couldn't reload the news",
    loadMoreNewsError: "Couldn't load more news",
    network: {
      description: 'Something went wrong',
      suggestion: 'Please try again later',
      title: 'Oops...',
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
    i18nQueryByPaginationErrorRef: "Couldn't load more news",
    i18EntryQueryErrorRef: "Couldn't load the news",
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
      finnish: 'Finnish',
      spanish: 'Spanish',
    },
    filterMessage: 'Choose a language to filter the news',
    selectFilterMessage: 'SELECT',
    emptyList: {
      description: 'We could not find any news for this language',
      suggestion: 'Please try again later',
      title: 'Oops...',
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
    category_mixed: 'Mixed',
    category_movie: 'Movies',
    category_tv: 'Tv',
    difficulty_easy: 'Easy',
    difficulty_medium: 'Medium',
    difficulty_hard: 'Hard',
    difficulty_mixed: 'Mixed',
    type_multiple: 'Multiple',
    type_boolean: 'True/False',
    type_mixed: 'Mixed',
    playAgain: 'Play Again',
    playAgainDescription: 'Do you want to play the Quiz again?',
    answer: 'Answer',
    yourAnswer: 'Your answer',
    scores: 'You scored',
    no: 'No',
    yes: 'Yes',
    noQuestionsAdviseTitle: 'Wow!',
    noQuestionsAdviseDescription:
      "Seems like we don't have enough questions for your taste today",
    noQuestionsAdviseSuggestion: 'Try to change the search parameters',
    next: 'NEXT',
    true: 'True',
    false: 'False',
  },
  famous: {
    searchBarPlaceholder: 'Search for an Actor or Actress...',
    i18nQueryByPaginationErrorRef: "Couldn't load more famous",
    i18nQueryByTextErrorRef: "Couldn't for this famous",
    i18EntryQueryErrorRef: "Couldn't load the famous",
  },
  search: {
    recent: 'Recent',
    emptyList: {
      description: 'Nothing found :/',
      suggestion: 'Try to change your search',
      title: 'Oops...',
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
    errorDescription: 'Something went wrong',
    errorSuggestion: 'Please try again later',
    errorTitle: 'Oops...',
  },
  home: {
    learMoreButtonText: 'LEARN MORE',
    tvShows: 'TV Shows',
    viewAll: 'View All',
    movies: 'Movies',
    trendingMovies: {
      error: "Couldn't load the Movies",
      nowPlaying: 'Now Playing',
      nowPlayingViewAllTitle: 'Movies playing now',
      popular: 'Popular',
      popularViewAllTitle: 'Popular Movies',
      topRated: 'Top Rated',
      topRatedViewAllTitle: 'Top rated Movies',
      upcoming: 'Upcoming',
      upcomingViewAllTitle: 'Upcoming Movies',
    },
    settings: {
      openSource: 'Open-source',
      language: 'Language',
      about: 'About',
      imagesQuality: 'Images Quality',
      theme: 'Theme',
      sections: {
        openSource: {
          libraries: {
            description: 'List of all libraries that was used by this project',
            title: 'Support libraries',
          },
          github: {
            description: "Public repository with the project's source-code",
            title: 'GitHub',
          },
          tmdb: {
            description: 'Movies and TV Shows datasource',
            title: 'TheMovieDB',
          },
          opentrivia: {
            description: 'Quiz datasource',
            title: 'OpenTriviaDB',
          },
          newsapi: {
            description: 'News datasource',
            title: 'News API',
          },
        },
      },
    },
    trendingTvShows: {
      error: "Couldn't load the TV Shows",
      onTheAirViewAllTitle: 'TV Shows on the Air',
      onTheAir: 'On the Air',
      popularViewAllTitle: 'Popular TV Shows',
      popular: 'Popular',
      topRatedViewAllTitle: 'Top Rated TV Shows',
      topRated: 'Top Rated',
      airingToday: 'Airing Today',
      airingTodayViewAllTitle: 'TV Shows Airing Today',
    },
    tvShowsPaginationError: "Couldn't load more TV-Shows",
    moviesPaginationError: "Couldn't load more Movies",
    search: {
      movie: {
        placeholder: 'Search for any Movie...',
        queryByTextError: "Couldn't find this Movie",
        paginationError: "Couldn't load more Movies",
      },
      tvShows: {
        placeholder: 'Search for any TV Show...',
        queryByTextError: "Couldn't find this TV-Show",
        paginationError: "Couldn't load more TV-Show",
      },
    },
  },
  mediaDetail: {
    errorDescription: 'Please try again later',
    errorSuggestion: 'Something went wrong',
    errorTitle: 'Oops...',
    votes: 'Votes',
    tvShow: {
      tvShow: 'TV-Show',
      back: 'Back',
      seasonEpisode: {
        readMoreSeasonOverview: 'Read More',
        episodes: 'Episodes',
        airDate: 'Aired in',
        season: 'Season',
      },
      errors: {
        description: 'Something went wrong',
        suggestion: 'Please try again later',
        title: 'Oops...',
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
