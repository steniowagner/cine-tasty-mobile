import * as Types from '../../src/types';

export const tvShowViewAllInitialDataset: Types.SimplifiedMedia[] = Array(5)
  .fill({})
  .map((_, index) => ({
    __typename: 'BaseTVShow',
    voteAverage: 10 / index + 1,
    title: `Title ${index + 1}`,
    posterPath: `PosterPath ${index + 1}`,
    voteCount: 10 / index + 1,
    genreIds: [`Genre${index}`],
    id: index,
  }));

export const moviesViewAllInitialDataset: Types.SimplifiedMedia[] = Array(5)
  .fill({})
  .map((_, index) => ({
    __typename: 'BaseMovie',
    voteAverage: 10 / index + 1,
    title: `Title ${index + 1}`,
    posterPath: `PosterPath ${index + 1}`,
    voteCount: 10 / index + 1,
    genreIds: [`Genre${index}`],
    id: index,
  }));
