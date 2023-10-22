import { Locale } from './Locale';

export const en: Locale = {
  tabs: {
    home: 'Home',
    famous: 'Famous',
    quiz: 'Quiz',
    news: 'News',
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
    filterLanguagesModal: {
      ctaTitle: 'SELECT',
      title: 'Choose a language to filter the news',
    },
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
    errors: {
      pagination: "Couldn't load more news",
      entry: "Couldn't load the news",
    },
    advice: {
      description: 'We could not find any news for this language',
      suggestion: 'Perhaps try with another language?',
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
    categoryMixed: 'Mixed',
    categoryMovie: 'Movies',
    categoryTV: 'Tv',
    difficultyEasy: 'Easy',
    difficultyMedium: 'Medium',
    difficultyHard: 'Hard',
    difficultyMixed: 'Mixed',
    typeMultiple: 'Multiple',
    typeBoolean: 'True/False',
    typeMixed: 'Mixed',
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
};
