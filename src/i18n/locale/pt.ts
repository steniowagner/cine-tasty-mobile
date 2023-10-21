import { Locale } from './Locale';

export const pt: Locale = {
  tabs: {
    home: 'Home',
    famous: 'Famosos',
    quiz: 'Quiz',
    news: 'Notícias',
  },
  time: {
    year: '{{ value }}anos atrás',
    year_plural: '{{ value }}anos atrás',
    month: '{{ value }}meses atrás',
    month_plural: '{{ value }}meses atrás',
    day: '{{ value }}d atrás',
    day_plural: '{{ value }}d atrás',
    hour: '{{ value }}h atrás',
    hour_plural: '{{ value }}h atrás',
    minute: '{{ value }}m atrás',
    minute_plural: '{{ value }}m atrás',
    second: '{{ value }}s atrás',
    second_plural: '{{ value }}s atrás',
  },
  news: {
    filterLanguagesModal: {
      ctaTitle: 'SELECIONAR',
      title: 'Escolha um idioma para filtrar as notícias',
    },
    languages: {
      english: 'Inglês',
      arabic: 'Árabe',
      mandarim: 'Mandarim',
      dutch: 'Holandês',
      french: 'Francês',
      german: 'Alemão',
      hebrew: 'Hebreu',
      italian: 'Italiano',
      norwegian: 'Norueguês',
      portuguese: 'Português',
      russian: 'Russo',
      finnish: 'Finlandês',
      spanish: 'Espanhol',
    },
    errors: {
      pagination: 'Não foi possível carregar mais notícias',
      entry: 'Não foi possível carregar as notícias',
    },
    advice: {
      description: 'Não encontramos nenhuma notícia com este idioma',
      suggestion: 'Talvez com um outro idioma?',
      title: 'Oops...',
    },
  },
};
