export const cast = Array(3).fill({}).map((_, index) => ({
  voteAverage: index,
  profilePath: `profilePath-${index}`,
  voteCount: index,
  name: `name-${index}`,
  id: index,
  __typename: 'CastItem',
}));

export const crew = Array(3).fill({}).map((_, index) => ({
  voteAverage: index,
  profilePath: `profilePath-${index}`,
  voteCount: index,
  name: `name-${index}`,
  id: `${index}`,
  __typename: 'CrewItem',
}));

export const similarMovies = Array(3).fill({}).map((_, index) => ({
  __typename: 'BaseMovie',
  voteAverage: index,
  posterPath: `posterPath-${index}`,
  voteCount: index,
  genreIds: Array(3).fill({}).map((__, genreIndex) => `genre-${genreIndex}`),
  title: `title-${index}`,
  id: index,
}));

export const similarTVShows = Array(3).fill({}).map((_, index) => ({
  __typename: 'BaseTVShow',
  voteAverage: index,
  posterPath: `posterPath-${index}`,
  voteCount: index,
  genreIds: Array(3).fill({}).map((__, genreIndex) => `genre-${genreIndex}`),
  name: `name-${index}`,
  id: index,
}));

export const reviews = Array(3).fill({}).map((_, index) => ({
  __typename: 'Review',
  author: `author-${index}`,
  content: `content-${index}`,
  id: `${index}`,
}));

export const createdBy = Array(3).fill({}).map((_, index) => ({
  id: `${index}`,
  creditId: `credit-${index}`,
  name: `name-${index}`,
  gender: index,
  profilePath: `profilePath-${index}`,
}));
