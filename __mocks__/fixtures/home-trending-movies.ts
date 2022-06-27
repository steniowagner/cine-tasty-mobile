import { GraphQLError } from 'graphql';

import {GET_TRENDING_MOVIES} from '@graphql/queries';

export const trendingMoviesItems = Array(10)
.fill({})
.map((_, index) => ({
  genreIds: Array(index + 1)
    .fill('')
    .map((__, genreIndex) => `GENRE-${genreIndex}`),
  posterPath: `/POSTER_PATH-${index}`,
  title: `TITLE-${index}`,
  __typename: 'BaseMovie',
  voteAverage: index,
  voteCount: index,
  id: index,
}));

export const trendingMovies = {
nowPlaying: {
  totalResults: 1,
  totalPages: 1,
  hasMore: true,
  items: trendingMoviesItems,
  __typename: 'TrendingMoviesQueryResult',
},
popular: {
  totalResults: 1,
  totalPages: 1,
  hasMore: false,
  items: trendingMoviesItems,
  __typename: 'TrendingMoviesQueryResult',
},
topRated: {
  totalResults: 1,
  totalPages: 1,
  hasMore: false,
  items: trendingMoviesItems,
  __typename: 'TrendingMoviesQueryResult',
},
upcoming: {
  totalResults: 1,
  totalPages: 1,
  hasMore: false,
  items: trendingMoviesItems,
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
