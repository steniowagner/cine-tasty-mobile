import { Locale } from './Locale';

export const es: Locale = {
  tabs: {
    home: 'Home',
    famous: 'Famosos',
    quiz: 'Quiz',
    news: 'Noticias',
  },
  time: {
    year: 'hace {{ value }}año',
    year_plural: 'hace {{ value }}años',
    month: ' hace {{ value }}mes',
    month_plural: 'hace {{ value }}meses',
    day: 'hace {{ value }}dia',
    day_plural: 'hace {{ value }}dias',
    hour: 'hace {{ value }}h',
    hour_plural: 'hace {{ value }}hrs',
    minute: 'hace {{ value }}m',
    minute_plural: 'hace {{ value }}m',
    second: 'hace {{ value }}s',
    second_plural: 'hace {{ value }}s',
  },
  news: {
    filterLanguagesModal: {
      ctaTitle: 'SELECCIONAR',
      title: 'Elige un idioma para filtrar las noticias',
    },
    languages: {
      english: 'Inglés',
      arabic: 'Arábica',
      mandarim: 'Mandarín',
      dutch: 'Holandés',
      french: 'Francés',
      german: 'Alemán',
      hebrew: 'Hebreo',
      italian: 'Italiano',
      norwegian: 'Noruego',
      portuguese: 'Portugués',
      russian: 'Ruso',
      finnish: 'Finlandés',
      spanish: 'Español',
    },
    errors: {
      pagination: 'No se pudieron cargar más noticias',
      entry: 'No se pudieron cargar las noticias',
    },
  },
};
