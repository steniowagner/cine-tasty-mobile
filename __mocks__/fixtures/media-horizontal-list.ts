import * as SchemaTypes from '../../src/types/schema';

import { randomPositiveNumber } from '../utils';

export const makeMoviesHorizontalList = (length?: number) => Array(length || randomPositiveNumber(10, 1)).fill({}).map((_, index) => ({
    voteAverage: randomPositiveNumber(10, 1),
    posterPath: `POSTER_PATH_${index}`,
    voteCount: randomPositiveNumber(10, 1),
    title: `TITLE_${index}`,
    id: index,
    __typename: 'CastMovie',
    } as SchemaTypes.GetFamousDetail_person_moviesCast));
  
export const makeTVShowsHorizontalList = (length?: number) => Array(length || randomPositiveNumber(10, 1)).fill({}).map((_, index) => ({
    voteAverage: randomPositiveNumber(10, 1),
    posterPath: `POSTER_PATH_${index}`,
    voteCount: randomPositiveNumber(10, 1),
    name: `NAME_${index}`,
    id: index,
    __typename: 'CastTVShow',
  } as SchemaTypes.GetFamousDetail_person_tvCast));
