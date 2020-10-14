export type MovieDetailExternalParams = {
  genreIds?: string[];
  voteAverage?: number;
  posterPath: string;
  voteCount?: number;
  title: string;
  id: number;
};

export type MovieDetailInternalternalParams = {
  MOVIE_DETAIL: MovieDetailExternalParams;
};
