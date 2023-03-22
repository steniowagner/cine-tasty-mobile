import {OperationVariables} from '@apollo/client';
import { GraphQLError } from 'graphql';

import {TV_SHOW_SEASONS_DETAIL} from '@graphql/queries';

export const tvShowsDetailsResolvers = (variables: OperationVariables, episodesLength: number) => {
  const request = {
    request: {
      query: TV_SHOW_SEASONS_DETAIL,
      variables,
    },
  };
  const episodes = Array(episodesLength).fill({}).map((_, index) => ({ name: `NAME-${index}`, id: index}))
  const result = {
    result: {
      data: {
        tvShowSeason: {
            posterPath: 'POSTER_PATH',
            overview: 'OVERVIEW',
            id: variables.id,
            episodes,
        },
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

export const makeQuerySuccessResolver = (variables: OperationVariables, episodesLength: number) => {
  const baseResolver = tvShowsDetailsResolvers(variables, episodesLength);
  return [{
    ...baseResolver.request,
    ...baseResolver.result,
  }];
};

export const makeQueryNetworkErrorResolver = (variables: OperationVariables, episodesLength: number) => {
  const baseResolver = tvShowsDetailsResolvers(variables, episodesLength);
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }];
};

export const makeQueryGraphQLErrorResolver = (variables: OperationVariables, episodesLength: number) => {
  const baseResolver = tvShowsDetailsResolvers(variables, episodesLength);
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }];
};