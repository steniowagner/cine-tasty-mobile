import { GraphQLError } from 'graphql';

import {GET_TRENDING_MOVIES} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

const trendingMoviesItems = Array(10)
.fill({})
.map((_, index) => ({
  genreIds: Array(index + 1)
    .fill('')
    .map((__, genreIndex) => `GENRE-${genreIndex}`),
  posterPath: `/POSTER_PATH-${index}`,
  title: `MOVIE_TITLE-${index}`,
  __typename: 'BaseMovie',
  voteAverage: index,
  voteCount: index,
  id: index,
}));

const trendingMovies = {
nowPlaying: {
  totalResults: 1,
  totalPages: 1,
  hasMore: true,
  items: trendingMoviesItems as SchemaTypes.TrendingNowPlayingMovies_trendingMovies_nowPlaying_items[],
  __typename: 'TrendingMoviesQueryResult',
},
popular: {
  totalResults: 1,
  totalPages: 1,
  hasMore: false,
  items: trendingMoviesItems as SchemaTypes.TrendingPopularMovies_trendingMovies_popular_items[],
  __typename: 'TrendingMoviesQueryResult',
},
topRated: {
  totalResults: 1,
  totalPages: 1,
  hasMore: false,
  items: trendingMoviesItems as SchemaTypes.TrendingTopRatedMovies_trendingMovies_topRated_items[],
  __typename: 'TrendingMoviesQueryResult',
},
upcoming: {
  totalResults: 1,
  totalPages: 1,
  hasMore: false,
  items: trendingMoviesItems as SchemaTypes.TrendingUpcomingMovies_trendingMovies_upcoming_items[],
  __typename: 'TrendingMoviesQueryResult',
},
__typename: 'TrendingMovies',
};

export const homeTrendingMoviesResolvers = () => {
    const request = {
      request: {
        query: GET_TRENDING_MOVIES,
        variables: {
          language: 'EN',
          page: 1,
        },
      },
    };

    const result = {
      result: {
        data: {
            trendingMovies,
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

 export const makeQuerySuccessResolver = () => {
  const baseResolver = homeTrendingMoviesResolvers();
  return [{
    ...baseResolver.request,
    ...baseResolver.result,
  }];
 };

 export const makeQueryWithGraphQLErrorResolver = () => {
  const baseResolver = homeTrendingMoviesResolvers();
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithGraphQLError,
  }];
 };

 export const makeQueryWithNetworkErrorResolver = () => {
  const baseResolver = homeTrendingMoviesResolvers();
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }];
 };

 export const makeQueryWithGraphQLErrorAndRefetchWithGraphQLErrorResolver = () => {
  const baseResolver = homeTrendingMoviesResolvers();
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithGraphQLError,
  }, {
    ...baseResolver.request,
    ...baseResolver.responseWithGraphQLError,
  }];
 };

 export const makeQueryWithGraphQLErrorAndRefetchWithSuccessResolver = () => {
  const baseResolver = homeTrendingMoviesResolvers();
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithGraphQLError,
  }, {
    ...baseResolver.request,
    ...baseResolver.result,
  }];
 };

 export const makeQueryWithGraphQLErrorAndRefetchWithNetworkErrorResolver = () => {
  const baseResolver = homeTrendingMoviesResolvers();
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithGraphQLError,
  }, {
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }];
 };

 export const makeQueryWithNetworkErrorAndRefetchWithSuccessResolver = () => {
  const baseResolver = homeTrendingMoviesResolvers();
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }, {
    ...baseResolver.request,
    ...baseResolver.result,
  }];
 };

 export const makeQueryWithNetworkErrorAndRefetchWithGraphQLErrorResolver = () => {
  const baseResolver = homeTrendingMoviesResolvers();
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }, {
    ...baseResolver.request,
    ...baseResolver.responseWithGraphQLError,
  }];
 };

 export const makeQueryWithNetworkErrorAndRefetchWithNetworkErrorResolver = () => {
  const baseResolver = homeTrendingMoviesResolvers();
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }, {
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }];
 };