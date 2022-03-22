export const trendingMoviesItems = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((__, genreIndex) => `genre-${genreIndex}`),
    posterPath: `/posterPath-${index}`,
    title: `title-${index}`,
    __typename: 'BaseMovie',
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

export const trendingMovies = {
  nowPlaying: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  upcoming: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  __typename: 'TrendingMovies',
};

export const castMovies = (size: number) => Array(size).fill({}).map((_, index) => ({
  __typename: 'CastMovie',
  voteAverage: index,
  posterPath: `POSTER_PATH_${index}`,
  voteCount: index,
  title: `TITLE_${index}`,
  id: index,
}));
