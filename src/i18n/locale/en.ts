import { Locale } from './Locale';

const en: Locale = {
  errors: {
    reloadNewsError: "Couldn't reload the news",
    loadMoreNewsError: "Couldn't load more news",
    network: {
      description: 'description',
      suggestion: 'suggestion',
      title: 'title',
    },
  },
  tabs: {
    discover: 'Discover',
    news: 'News',
    people: 'People',
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
  language: {
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
  newsFilterChooseLanguage: 'Choose a language to filter the News',
};

export default en;
