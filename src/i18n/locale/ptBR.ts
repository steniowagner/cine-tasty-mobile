import {Locale} from './Locale';

const ptBR: Locale = {
  languageWarning: {
    quiz: {
      positiveAction: 'Sim',
      negativeAction: 'Não',
      title: 'Oops, só uma coisa...',
      description:
        'Todas as perguntas deste quiz estão em inglês, quer jogar mesmo assim?',
    },
    media: {
      positiveAction: 'OK',
      title: 'Só uma coisa...',
      description:
        'Este aplicativo não é responsável pelas traduções do texto da visão geral, e é possível que não esteja disponível para o seu idioma.',
    },
    famous: {
      positiveAction: 'OK',
      title: 'Só uma coisa...',
      description:
        'Este aplicativo não é responsável pelas traduções do texto da biografia, e é possível que não esteja disponível para o seu idioma.',
    },
  },
  onboarding: {
    start: 'COMEÇAR',
    next: 'PRÓXIMO',
    cinema: {
      description:
        'Descubra quais são os títulos mais recentes do cinema e das séries de TV',
      title: 'Cinema/TV',
    },
    famous: {
      description:
        'Veja quem são os atores e atrizes que estão nas tendências de hoje',
      title: 'Famosos',
    },
    quiz: {
      description:
        'Teste seus conhecimentos de cinema com perguntas desfiadoras e interessantes',
      title: 'Quiz',
    },
    news: {
      description:
        'Mantenha-se atualizado com as últimas notícias do mundo do cinema / séries de TV',
      title: 'News',
    },
  },
  softwareEngineer: 'Engenheiro de Software',
  select: 'SELECIONAR',
  theme: {
    dark: 'Escuro',
    light: 'Claro',
    system: 'Seguir as preferências do sistema',
  },
  about:
    'Olá!\n\nSou um Engeiro de Software e amo aplicar meu conhecimento para resolver problemas, criar produtos incríveis e impactar vidas!',
  openSource: {
    libraries: {
      description:
        'Lista de todas as bibliotecas que foram usados por este projeto',
      title: 'Bibliotecas de suporte',
    },
    github: {
      description: 'Repositório público contendo o código-fonte deste projeto',
      title: 'Repositório no GitHub',
    },
    tmdb: {
      description: 'Fonte dos dados de Filmes e Séries de TV',
      title: 'TheMovieDB',
    },
    opentrivia: {
      description: 'Fonte dos dados dos Quizes',
      title: 'OpenTriviaDB',
    },
    newsapi: {
      description: 'Fonte dos dados das Notícias',
      title: 'News API',
    },
  },
  imageQualities: {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    veryHigh: 'Muito Alta',
  },
  languages: {
    en: 'Inglês',
    es: 'Espanhol',
    ptBR: 'Português',
  },
  errors: {
    paginateFamousError: 'Não foi possível carregar mais famosos',
    searchFamousError: 'Não foi possível buscar por este famoso',
    reloadNewsError: 'Não foi possível recarregar as notícias',
    loadMoreNewsError: 'Não foi possível carregar mais notícias',
    network: {
      description: 'Algo deu errado',
      suggestion: 'Por favor, tente novamente',
      title: 'Oops...',
    },
  },
  tabs: {
    home: 'Home',
    news: 'Notícias',
    famous: 'Famosos',
    quiz: 'Quiz',
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
    i18nQueryByPaginationErrorRef: 'Não foi possível carregar mais notícias',
    i18EntryQueryErrorRef: 'Não foi possível carregar as notícias',
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
    filterMessage: 'Escolha uma linguagem para filtras as notícias',
    selectFilterMessage: 'SELECIONAR',
    emptyList: {
      description: 'Não encontramos nenhuma notícia com este idioma',
      suggestion: 'Por favor, tente outro idioma',
      title: 'Oops...',
    },
  },
  quiz: {
    welcome: 'Bem vindo ao Cine-Tasty Quiz!',
    decription:
      'Quer testar o seu conhecimento sobre o mundo do cinema?\n\nVocê pode escolher o tipo (verdadeiro/falso ou múltipla-escolha), categoria (Filmes ou Séries) e quantas perguntas você quer responder.',
    challenge: 'Consegue acertar 100%?',
    chooseQuestions: 'ESCOLHER PERGUNTAS',
    startButton: 'COMEÇAR QUIZ',
    difficulty: 'Dificuldade',
    category: 'Categoria',
    type: 'Tipo',
    numberOfQuestions: 'Número de perguntas',
    setDifficulty: 'Dificuldade das perguntas',
    setCategory: 'Categoria das perguntas',
    setType: 'Tipo das pergutnas',
    modalSelectText: 'Selecionar',
    category_mixed: 'Misturado',
    category_movie: 'Filmes',
    category_tv: 'Séries',
    difficulty_easy: 'Fácil',
    difficulty_medium: 'Médio',
    difficulty_hard: 'Difícil',
    difficulty_mixed: 'Misturado',
    type_multiple: 'Múltipla',
    type_boolean: 'Verdadeiro/Falso',
    type_mixed: 'Misturado',
    playAgain: 'Jogar novamente',
    playAgainDescription: 'Quer jogar o Quiz novamente?',
    answer: 'Resposta',
    yourAnswer: 'Sua resposta',
    scores: 'Você acertou',
    no: 'Não',
    yes: 'Sim',
    noQuestionsAdviseTitle: 'Uau!',
    noQuestionsAdviseDescription:
      'Parece que não temos perguntas o suficiente para o seu gosto hoje.',
    noQuestionsAdviseSuggestion: 'Tente mudar os parâmetros de busca',
    next: 'PRÓXIMA',
    true: 'Verdadeiro',
    false: 'Falso',
  },
  famous: {
    searchBarPlaceholder: 'Buscar por um Ator ou Atriz...',
    i18nQueryByPaginationErrorRef: 'Não foi possível carregar mais famosos',
    i18nQueryByTextErrorRef: 'Não foi possível carregar este famoso(a)',
    i18EntryQueryErrorRef: 'Não foi possível carregar os famosos',
  },
  search: {
    recent: 'Recentes',
    emptyList: {
      description: 'Nada encontrado :/',
      suggestion: 'Tente mudar sua busca',
      title: 'Oops...',
    },
  },
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  famousDetail: {
    readLess: 'Ler menos',
    readMore: 'Ler mais',
    biography: 'Biografia',
    images: 'Imagens',
    castMovies: 'Participação (Filmes)',
    castTV: 'Participação (Séries)',
    errorDescription: 'Algo deu errado',
    errorSuggestion: 'Por favor, tente novamente',
    errorTitle: 'Oops...',
  },
  home: {
    learMoreButtonText: 'VER MAIS',
    tvShows: 'Séries',
    viewAll: 'Ver todos',
    movies: 'Filmes',
    trendingMovies: {
      error: 'Não foi possível carregar os Filmes',
      nowPlaying: 'Lançamentos',
      nowPlayingViewAllTitle: 'Filmes Lançados',
      popular: 'Populares',
      popularViewAllTitle: 'Filmes Populares',
      topRated: 'Melhor avaliados',
      topRatedViewAllTitle: 'Filmes melhor avaliados',
      upcoming: 'Em Breve',
      upcomingViewAllTitle: 'Em Breve (filmes)',
    },
    settings: {
      openSource: 'Open-source',
      language: 'Idioma',
      about: 'Sobre',
      imagesQuality: 'Qualidade das Images',
      theme: 'Tema',
    },
    trendingTvShows: {
      error: 'Não foi possível carregar as Séries',
      onTheAirViewAllTitle: 'Séries no ar',
      onTheAir: 'No ar',
      popularViewAllTitle: 'Séries populares',
      popular: 'Populares',
      topRatedViewAllTitle: 'Séries melhor avaliadas',
      topRated: 'Melhor avaliadas',
      airingToday: 'Indo ao ar hoje',
      airingTodayViewAllTitle: 'Séries indo ao ar hoje',
    },
    tvShowsPaginationError: 'Não foi possível carregar mais Séries',
    moviesPaginationError: 'Não foi possível carregar mais Filmes',
    search: {
      movie: {
        placeholder: 'Busque por qualquer Filme...',
        queryByTextError: 'Não foi possível encontrar este Filme',
        paginationError: 'Não foi possível carregar mais filmes',
      },
      tvShows: {
        placeholder: 'Busque por qualquer Série...',
        queryByTextError: 'Não foi possível encontrar esta Série',
        paginationError: 'Não foi possível carregar mais Séries',
      },
    },
  },
  mediaDetail: {
    errorDescription: 'Por favor, tente novamente',
    errorSuggestion: 'Algo deu errado',
    errorTitle: 'Oops...',
    votes: 'Votos',
    tvShow: {
      tvShow: 'Séries',
      back: 'Voltar',
      seasonEpisode: {
        readMoreSeasonOverview: 'Ver mais',
        episodes: 'Episódios',
        airDate: 'Foi ao ar em',
        season: 'Temporada',
      },
      errors: {
        description: 'Algo deu errado',
        suggestion: 'Por favor, tente novamente',
        title: 'Oops...',
      },
    },
    movie: {
      movie: 'Filmes',
    },
    sections: {
      productionCompanies: 'Empresas produtoras',
      productionCountries: 'Países produtores',
      spokenLanguages: 'Idiomas falados',
      originalTitle: 'Título original',
      releaseDate: 'Data de lançamento',
      budget: 'Despesas',
      revenue: 'Receita',
      overview: 'Visão geral',
      reviews: 'Reviews',
      details: 'Detalhes',
      videos: 'Vídeos',
      cast: 'Elenco',
      crew: 'Equipe',
      images: 'Imagens',
      similar: 'Similares',
      numberOfEpisodes: 'Número de episódios',
      numberOfSeasons: 'Número de temporadas',
      firstAirDate: 'Primeira exibição',
      lastAirDate: 'Última exibição',
      originalLanguage: 'Idioma original',
      episodeRunTime: 'Tamanho do episódio',
      originCountry: 'País de origem',
      createdBy: 'Criado por',
      seasons: 'Ver temporadas',
      networks: 'Redes',
    },
  },
};

export default ptBR;
