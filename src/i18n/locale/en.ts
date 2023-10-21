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
};
