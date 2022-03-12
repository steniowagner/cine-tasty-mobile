import {OperationVariables} from '@apollo/client';
import { GraphQLError } from 'graphql';

import {SEARCH_PERSON} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

export const famousList = (size: number, page: number = 1) => Array(size)
  .fill({})
  .map((_, index) => ({
    image: `page${page}-image-${index}`,
    title: `page${page}-title-${index}-${page}`,
    id: (page * size) + index,
    __typename: 'BasePerson',
  })) as SchemaTypes.SearchPerson_search_items_BasePerson[];

export const searchFamousResolvers = (variables: OperationVariables, items: SchemaTypes.SearchPerson_search_items[] = [], hasMore: boolean = false) => {
  const request = {
    request: {
      query: SEARCH_PERSON,
      variables,
    },
  };

  const result = {
    result: {
      data: {
        search: {
            totalResults: 100,
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
