import {OperationVariables} from '@apollo/client';
import { GraphQLError } from 'graphql';

import {GET_FAMOUS_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {randomPositiveNumber} from '../utils';

type SetupDataResponse = {
  withImages?: boolean;
  withMoviesCast?: boolean;
  withTVCast?: boolean;
  withDeathDay?: boolean;
  withBiography?: boolean;
  emptyCastMovies?: boolean;
  emptyCastTV?: boolean;
}

export const famousDetailsResolvers = (variables: OperationVariables, setupDataResponse: SetupDataResponse) => {
  const request = {
    request: {
      query: GET_FAMOUS_DETAIL,
      variables,
    },
  };
  const movieCast: SchemaTypes.GetFamousDetail_person_moviesCast[] = !setupDataResponse.emptyCastMovies ? Array(randomPositiveNumber(10, 1)).fill({}).map((_, index) => ({
    voteAverage: randomPositiveNumber(10, 1),
    posterPath: `POSTER_PATH_${index}`,
    voteCount: randomPositiveNumber(10, 1),
    title: `TITLE_${index}`,
    id: index,
    __typename: 'CastMovie',
  })) : [];
  const tvCast: SchemaTypes.GetFamousDetail_person_tvCast = !setupDataResponse.emptyCastTV ? Array(randomPositiveNumber(10, 1)).fill({}).map((_, index) => ({
    voteAverage: randomPositiveNumber(10, 1),
    posterPath: `POSTER_PATH_${index}`,
    voteCount: randomPositiveNumber(10, 1),
    name: `NAME_${index}`,
    id: index,
    __typename: 'CastTVShow',
  })) : [];
  const famous = {
    __typename: 'Person',
    knownForDepartment: 'KNOWN_FOR_DEPARTMENT',
    placeOfBirth: 'PLACE_OF_BIRTH',
    biography: setupDataResponse.withBiography ? 'BIOGRAPHY' : '',
    birthday: '1994-21-02',
    profilePath: 'PROFILE_PATH',
    deathday: setupDataResponse.withDeathDay && '1994-21-02',
    images: setupDataResponse.withImages && Array(randomPositiveNumber(10, 1)).fill({}).map((_, index) => `IMAGE_${index}`),
    moviesCast: setupDataResponse.withMoviesCast && movieCast,
    tvCast: setupDataResponse.withTVCast && tvCast,
  };
  const result = {
    result: {
      data: {
        person: famous,
      },
    },
  };
  const responseWithNetworkError = {
    ...request,
    error: new Error('A Network error occurred'),
  };
  const responseWithGraphQLError = {
    ...request,
    errors: [new GraphQLError('A GraphQL error occurred')],
  };
  return {
    responseWithGraphQLError,
    responseWithNetworkError,
    request,
    result,
  };
};
