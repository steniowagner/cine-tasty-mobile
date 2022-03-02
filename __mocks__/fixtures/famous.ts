import {OperationVariables} from '@apollo/client';
import { GraphQLError } from 'graphql';

import {GET_FAMOUS} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

export const famousList = (size: number, page: number = 1) => Array(size)
  .fill({})
  .map((_, index) => ({
    profilePath: `page${page}-profilePath-${index}`,
    name: `page${page}-name-${index}-${page}`,
    id: (page * size) + index,
    __typename: 'BasePerson',
  })) as SchemaTypes.GetFamous_people_items[];

export const famousResolvers = (variables: OperationVariables, items: SchemaTypes.GetFamous_people_items[] = [], hasMore: boolean = false) => {
  const request = {
    request: {
      query: GET_FAMOUS,
      variables,
    },
  };

  const result = {
    result: {
      data: {
        people: {
          hasMore,
          items,
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
