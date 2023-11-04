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
    advice: {
      description: 'No pudimos encontrar ninguna noticia para este idioma.ma',
      suggestion: '¿Quizás probar con otro idioma?',
      title: 'Oops...',
    },
  },
  quiz: {
    welcome: 'Bienvenido al Quiz Cine-Tasty!',
    decription:
      '¿Quieres poner a prueba tus conocimientos sobre el mundo del cine?\n\nPuede elegir el tipo (verdadero / falso o multirrespuesta), la categoría (Películas o Tv) y cuántas preguntas desea responder.',
    challenge: '¿Puedes puntuar al 100%?',
    chooseQuestions: 'ELEGIR PREGUNTAS',
    startButton: 'INICIAR QUIZ',
    difficulty: 'Dificultad',
    category: 'Categoría',
    type: 'Tipo',
    numberOfQuestions: 'Numero de preguntas',
    setDifficulty: 'Dificultad de las preguntas',
    setCategory: 'Categoría de las preguntas',
    setType: 'Tipo de preguntas',
    modalSelectText: 'Seleccione',
    categoryMixed: 'Mezclado',
    categoryMovie: 'Películas',
    categoryTV: 'Tv',
    difficultyEasy: 'Fácil',
    difficultyMedium: 'Medio',
    difficultyHard: 'Duro',
    difficultyMixed: 'Mezclado',
    typeMultiple: 'Múltiple',
    typeBoolean: 'Verdadero/Falso',
    typeMixed: 'Mezclado',
    playAgain: 'Juega de nuevo',
    playAgainDescription: '¿Quieres volver a jugar el Quiz?',
    answer: 'Respuesta',
    yourAnswer: 'Tu respuesta',
    scores: 'Has anotado',
    no: 'No',
    yes: 'Sí',
    noQuestionsAdviseTitle: 'Guau!',
    noQuestionsAdviseDescription:
      'Parece que hoy no tenemos suficientes preguntas para tu gusto',
    noQuestionsAdviseSuggestion: 'Intenta cambiar los parámetros de búsqueda',
    next: 'SIGUIENTE',
    true: 'Cierto',
    false: 'Falso',
    setupQuiz: 'Configurar Quiz',
  },
  error: {
    description: 'Algo salió mal',
    suggestion: 'Por favor, inténtelo de nuevo más tarde',
    title: 'Oops...',
  },
  famous: {
    search: {
      searchBarPlaceholder: 'Buscar un actor o actriz',
      errors: {
        pagination: 'No se pudo buscar más famosos',
        entry: 'No se pudo buscar famosos',
      },
    },
    errors: {
      pagination: 'No se pudo cargar más famosos',
      entry: 'No se pudo cargar esta famosos',
    },
  },
  recentSearches: 'Reciente',
};
