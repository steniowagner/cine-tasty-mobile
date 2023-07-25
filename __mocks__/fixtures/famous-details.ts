import {OperationVariables} from '@apollo/client';
import { GraphQLError } from 'graphql';

import {GET_FAMOUS_DETAIL} from '@graphql/queries';

import {randomPositiveNumber} from '../utils';

type SetupDataResponse = {
  withKnownForDepartment?: boolean;
  withImages?: boolean;
  withMoviesCast?: boolean;
  withTVCast?: boolean;
  withDeathDay?: boolean;
  withBiography?: boolean;
  emptyCastMovies?: boolean;
  emptyCastTV?: boolean;
}

const makeMovieCast = () => Array(randomPositiveNumber(10, 1)).fill({}).map((_, index) => ({
  voteAverage: randomPositiveNumber(10, 1),
  posterPath: `POSTER_PATH_${index}`,
  voteCount: randomPositiveNumber(10, 1),
  title: `TITLE_${index}`,
  id: `tv-show-${index}`,
  __typename: 'CastMovie',
}));

const makeTVShowCast = () => Array(randomPositiveNumber(10, 1)).fill({}).map((_, index) => ({
  voteAverage: randomPositiveNumber(10, 1),
  posterPath: `POSTER_PATH_${index}`,
  voteCount: randomPositiveNumber(10, 1),
  name: `NAME_${index}`,
  id: `movie-${index}`,
  __typename: 'CastTVShow',
}));

const makeImages = () => Array(randomPositiveNumber(10, 1)).fill({}).map((_, index) => `IMAGE_${index}`)

const makeFamous = (setupDataResponse: SetupDataResponse) => ({
  __typename: 'Person',
  knownForDepartment: setupDataResponse.withKnownForDepartment ? 'KNOWN_FOR_DEPARTMENT' : '',
  placeOfBirth: 'PLACE_OF_BIRTH',
  biography: setupDataResponse.withBiography ? 'BIOGRAPHY' : '',
  birthday: '1994-21-02',
  profilePath: 'PROFILE_PATH',
  deathday: setupDataResponse.withDeathDay ? '1994-21-02' : '',
  images: setupDataResponse.withImages ? makeImages() : [] ,
  moviesCast: setupDataResponse.withMoviesCast ? makeMovieCast() : [],
  tvCast: setupDataResponse.withTVCast ? makeTVShowCast() : [],
});

const famousDetailsResolvers = (variables: OperationVariables, setupDataResponse: SetupDataResponse) => {
  const request = {
    request: {
      query: GET_FAMOUS_DETAIL,
      variables,
    },
  };
  const result = {
    result: {
      data: {
        person: makeFamous(setupDataResponse),
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

export const makeSuccessResolver = (variables: OperationVariables, setupDataResponse: SetupDataResponse) => {
  const baseResolver = famousDetailsResolvers(variables, setupDataResponse);
  return [{
    ...baseResolver.request,
    ...baseResolver.result,
  }];
};

export const makeNetworkErrorResolver = (variables: OperationVariables, setupDataResponse: SetupDataResponse) => {
  const baseResolver = famousDetailsResolvers(variables, setupDataResponse);
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }];
};

export const makeGraphQLErrorResolver = (variables: OperationVariables, setupDataResponse: SetupDataResponse) => {
  const baseResolver = famousDetailsResolvers(variables, setupDataResponse);
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithGraphQLError,
  }];
};