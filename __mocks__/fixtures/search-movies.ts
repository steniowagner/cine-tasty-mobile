import {OperationVariables} from '@apollo/client';
import { GraphQLError } from 'graphql';

import {SEARCH_MOVIES} from '../../src/graphql/queries';
import * as SchemaTypes from '../../src/types/schema';
import { randomPositiveNumber } from '../utils';

export const searchMoviesResultItems = (size: number, page: number = 1) => Array(size)
  .fill({})
  .map((_, index) => ({
    posterPath: `page${page}-posterPath-${index}`,
    title: `page${page}-title-${index}-${page}`,
    id: (page * size) + index,
    __typename: 'BaseMovie',
  })) as SchemaTypes.SearchMovie_search_items_BaseMovie[];

const resolvers = (variables: OperationVariables, items: SchemaTypes.SearchMovie_search_items_BaseMovie[] = [], hasMore: boolean = false) => {
  const request = {
    request: {
      query: SEARCH_MOVIES,
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

type MakeResolverParams = {
  numberOfItems?: number;
  query?: string;
  page?: number;
}

export const makeEntryQuerySuccessResolver = (params: MakeResolverParams) => {
  const baseResolver = resolvers(
    {input: {language: 'EN', page: params.page || 1, query: params.query || '', type: SchemaTypes.SearchType.MOVIE.toString()}},
    searchMoviesResultItems(params.numberOfItems || randomPositiveNumber(10, 1)),
    true,
  );
  return [
    {
      ...baseResolver.request,
      ...baseResolver.result,
    },
  ];
};

export const makePaginationSuccessResolver = (params: MakeResolverParams & { paginationNumberOfItems?: number }) => {
  const entryQueryResolver = resolvers(
    {input: {language: 'EN', page: params.page || 1, query: params.query || '', type: SchemaTypes.SearchType.MOVIE.toString()}},
    searchMoviesResultItems(params.numberOfItems || randomPositiveNumber(10, 1)),
    true,
  );
  const paginationQueryResolver = resolvers(
    {input: {language: 'EN', page: 2, query: params.query || '', type: SchemaTypes.SearchType.MOVIE.toString()}},
    searchMoviesResultItems(params.paginationNumberOfItems || randomPositiveNumber(10, 1)),
    false,
  );
  return [
    {
      ...entryQueryResolver.request,
      ...entryQueryResolver.result,
    },
    {
      ...paginationQueryResolver.request,
      ...paginationQueryResolver.result,
    },
  ];
};

export const makeEntryNetowrkError = (params: MakeResolverParams) => {
  const baseResolver = resolvers(
    {input: {language: 'EN', page: params.page || 1, query: params.query || '', type: SchemaTypes.SearchType.MOVIE.toString()}},
    searchMoviesResultItems(params.numberOfItems || randomPositiveNumber(10, 1)),
    true,
  );
  return [
    {
      ...baseResolver.request,
      ...baseResolver.responseWithNetworkError,
    },
  ];
};

export const makeEntryGraphQLError = (params: MakeResolverParams) => {
  const baseResolver = resolvers(
    {input: {language: 'EN', page: params.page || 1, query: params.query || '', type: SchemaTypes.SearchType.MOVIE.toString()}},
    searchMoviesResultItems(params.numberOfItems || randomPositiveNumber(10, 1)),
    true,
  );
  return [
    {
      ...baseResolver.request,
      ...baseResolver.responseWithGraphQLError,
    },
  ];
};

export const makePaginationGraphQLError = (params: MakeResolverParams) => {
  const baseResolver = resolvers(
    {input: {language: 'EN', page: params.page || 1, query: params.query || '', type: SchemaTypes.SearchType.MOVIE.toString()}},
    searchMoviesResultItems(params.numberOfItems || randomPositiveNumber(10, 1)),
    true,
  );
  return [
    {
      ...baseResolver.request,
      ...baseResolver.result,
    },
    {
      ...baseResolver.request,
      ...baseResolver.responseWithGraphQLError,
    },
  ];
};

export const makePaginationNetworkError = (params: MakeResolverParams) => {
  const baseResolver = resolvers(
    {input: {language: 'EN', page: params.page || 1, query: params.query || '', type: SchemaTypes.SearchType.MOVIE.toString()}},
    searchMoviesResultItems(params.numberOfItems || randomPositiveNumber(10, 1)),
    true,
  );
  return [
    {
      ...baseResolver.request,
      ...baseResolver.result,
    },
    {
      ...baseResolver.request,
      ...baseResolver.responseWithNetworkError,
    },
  ];
};