import { Locale } from './Locale';

const sv: Locale = {
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
  },
  famous: {
    searchBarPlaceholder: 'Search for an Actor or Actress...',
    i18nQueryByPaginationErrorRef: 'i18nQueryByPaginationErrorRef',
    i18nQueryByTextErrorRef: 'i18nQueryByTextErrorRef',
    i18EntryQueryErrorRef: 'i18EntryQueryErrorRef',
  },
  search: {
    recent: 'Recent',
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
    learMoreButtonText: 'learMoreButtonText',
  },
};

export default sv;
