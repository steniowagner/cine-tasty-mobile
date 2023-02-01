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

export const makeEntryQuerySuccessResolver = (page: number, numberOfFamous: number) => {
  const baseResolver = famousResolvers(
    {page},
    famousList(numberOfFamous),
    true,
  );
  return [
    {
      ...baseResolver.request,
      ...baseResolver.result,
    },
  ];
};

export const makeEntryQueryNetworkResolver = (page: number, numberOfFamous: number) => {
  const baseResolver = famousResolvers(
    {page},
    famousList(numberOfFamous),
    true,
  );
  return [
    {
      ...baseResolver.request,
      ...baseResolver.responseWithNetworkError,
    },
  ];
};

export const makeEntryQueryGraphQLResolver = (page: number, numberOfFamous: number) => {
  const baseResolver = famousResolvers(
    {page},
    famousList(numberOfFamous),
    true,
  );
  return [
    {
      ...baseResolver.request,
      ...baseResolver.responseWithGraphQLError,
    },
  ];
};

export const makeEntryQueryWithNetworkErrorResolver = (page: number, numberOfFamous: number) => {
  const resolver = famousResolvers(
    {page},
    famousList(numberOfFamous),
    true,
  );
  return [
    {
      ...resolver.request,
      ...resolver.responseWithNetworkError,
    },
    {
      ...resolver.request,
      ...resolver.result,
    },
  ];
};

export const makeEntryQueryWithGraphQLErrorResolver = (page: number, numberOfFamous: number) => {
  const resolver = famousResolvers(
    {page},
    famousList(numberOfFamous),
    true,
  );
  return [
    {
      ...resolver.request,
      ...resolver.responseWithGraphQLError,
    },
    {
      ...resolver.request,
      ...resolver.result,
    },
  ];
};

export const makeRefetchQueryWithDoubleNetworkError = (page: number, numberOfFamous: number) => {
  const resolver = famousResolvers(
    {page},
    famousList(numberOfFamous),
    true,
  );
  return [
    {
      ...resolver.request,
      ...resolver.responseWithNetworkError,
    },
    {
      ...resolver.request,
      ...resolver.responseWithNetworkError,
    },
  ];
};

export const makeRefetchQueryWithDoubleGraphQLError = (page: number, numberOfFamous: number) => {
  const resolver = famousResolvers(
    {page},
    famousList(numberOfFamous),
    true,
  );
  return [
    {
      ...resolver.request,
      ...resolver.responseWithGraphQLError,
    },
    {
      ...resolver.request,
      ...resolver.responseWithGraphQLError,
    },
  ];
};

export const makeRefetchQueryWithNetworkAndGraphQLError = (page: number, numberOfFamous: number) => {
  const resolver = famousResolvers(
    {page},
    famousList(numberOfFamous),
    true,
  );
  return [
    {
      ...resolver.request,
      ...resolver.responseWithNetworkError,
    },
    {
      ...resolver.request,
      ...resolver.responseWithGraphQLError,
    },
  ];
};

export const makeRefetchQueryWitdGraphQLAndhNetworkError = (page: number, numberOfFamous: number) => {
  const resolver = famousResolvers(
    {page},
    famousList(numberOfFamous),
    true,
  );
  return [
    {
      ...resolver.request,
      ...resolver.responseWithGraphQLError,
    },
    {
      ...resolver.request,
      ...resolver.responseWithNetworkError,
    },
  ];
};


export const makePaginationSuccessQuery = (numberOfFamous: number, hasMoreAfterFirstPage: boolean = true) => {
  const firstQueryResolver = famousResolvers(
    {page: 1},
    famousList(numberOfFamous),
    hasMoreAfterFirstPage,
  );
  const secondQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  return [
    {
      ...firstQueryResolver.request,
      ...firstQueryResolver.result,
    },
    {
      ...secondQueryResolver.request,
      ...secondQueryResolver.result,
    },
  ];
};

export const makePaginationNetworkErrorQuery = (numberOfFamous: number, hasMoreAfterFirstPage: boolean = true) => {
  const firstQueryResolver = famousResolvers(
    {page: 1},
    famousList(numberOfFamous),
    hasMoreAfterFirstPage,
  );
  const secondQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  return [
    {
      ...firstQueryResolver.request,
      ...firstQueryResolver.result,
    },
    {
      ...secondQueryResolver.request,
      ...secondQueryResolver.responseWithNetworkError,
    },
  ];
};

export const makePaginationGraphQLErrorQuery = (numberOfFamous: number, hasMoreAfterFirstPage: boolean = true) => {
  const firstQueryResolver = famousResolvers(
    {page: 1},
    famousList(numberOfFamous),
    hasMoreAfterFirstPage,
  );
  const secondQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  return [
    {
      ...firstQueryResolver.request,
      ...firstQueryResolver.result,
    },
    {
      ...secondQueryResolver.request,
      ...secondQueryResolver.responseWithGraphQLError,
    },
  ];
};

export const makePaginationNetworkErrorRefetchSuccess = (numberOfFamous: number, hasMoreAfterFirstPage: boolean = true) => {
  const firstQueryResolver = famousResolvers(
    {page: 1},
    famousList(numberOfFamous),
    hasMoreAfterFirstPage,
  );
  const secondQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  const thirdQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  return [
    {
      ...firstQueryResolver.request,
      ...firstQueryResolver.result,
    },
    {
      ...secondQueryResolver.request,
      ...secondQueryResolver.responseWithNetworkError,
    },
    {
      ...thirdQueryResolver.request,
      ...thirdQueryResolver.result,
    },
  ];
};

export const makePaginationNetworkErrorRefetchNetworkError = (numberOfFamous: number, hasMoreAfterFirstPage: boolean = true) => {
  const firstQueryResolver = famousResolvers(
    {page: 1},
    famousList(numberOfFamous),
    hasMoreAfterFirstPage,
  );
  const secondQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  const thirdQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  return [
    {
      ...firstQueryResolver.request,
      ...firstQueryResolver.result,
    },
    {
      ...secondQueryResolver.request,
      ...secondQueryResolver.responseWithNetworkError,
    },
    {
      ...thirdQueryResolver.request,
      ...thirdQueryResolver.responseWithGraphQLError,
    },
  ];
};

export const makePaginationNetworkErrorRefetchGraphQLError = (numberOfFamous: number, hasMoreAfterFirstPage: boolean = true) => {
  const firstQueryResolver = famousResolvers(
    {page: 1},
    famousList(numberOfFamous),
    hasMoreAfterFirstPage,
  );
  const secondQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  const thirdQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  return [
    {
      ...firstQueryResolver.request,
      ...firstQueryResolver.result,
    },
    {
      ...secondQueryResolver.request,
      ...secondQueryResolver.responseWithNetworkError,
    },
    {
      ...thirdQueryResolver.request,
      ...thirdQueryResolver.responseWithGraphQLError,
    },
  ];
};

export const makePaginationGraphQLRefetchSuccess = (numberOfFamous: number, hasMoreAfterFirstPage: boolean = true) => {
  const firstQueryResolver = famousResolvers(
    {page: 1},
    famousList(numberOfFamous),
    hasMoreAfterFirstPage,
  );
  const secondQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  const thirdQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  return [
    {
      ...firstQueryResolver.request,
      ...firstQueryResolver.result,
    },
    {
      ...secondQueryResolver.request,
      ...secondQueryResolver.responseWithGraphQLError,
    },
    {
      ...thirdQueryResolver.request,
      ...thirdQueryResolver.result,
    },
  ];
};

export const makePaginationGraphQLErrorRefetchGraphQLError = (numberOfFamous: number, hasMoreAfterFirstPage: boolean = true) => {
  const firstQueryResolver = famousResolvers(
    {page: 1},
    famousList(numberOfFamous),
    hasMoreAfterFirstPage,
  );
  const secondQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  const thirdQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  return [
    {
      ...firstQueryResolver.request,
      ...firstQueryResolver.result,
    },
    {
      ...secondQueryResolver.request,
      ...secondQueryResolver.responseWithGraphQLError,
    },
    {
      ...thirdQueryResolver.request,
      ...thirdQueryResolver.responseWithGraphQLError,
    },
  ];
};

export const makePaginationGraphQLErrorRefetchNetworkError = (numberOfFamous: number, hasMoreAfterFirstPage: boolean = true) => {
  const firstQueryResolver = famousResolvers(
    {page: 1},
    famousList(numberOfFamous),
    hasMoreAfterFirstPage,
  );
  const secondQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  const thirdQueryResolver = famousResolvers(
    {page: 2},
    famousList(numberOfFamous, 2),
    true,
  );
  return [
    {
      ...firstQueryResolver.request,
      ...firstQueryResolver.result,
    },
    {
      ...secondQueryResolver.request,
      ...secondQueryResolver.responseWithGraphQLError,
    },
    {
      ...thirdQueryResolver.request,
      ...thirdQueryResolver.responseWithNetworkError,
    },
  ];
};