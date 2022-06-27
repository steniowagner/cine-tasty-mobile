import { GraphQLError } from 'graphql';

import {GET_TRENDING_TV_SHOWS} from '@graphql/queries';

export const trendingTVShowsItems = Array(10)
.fill({})
.map((_, index) => ({
  genreIds: Array(index + 1)
    .fill('')
    .map((__, genreIndex) => `GENRE-${genreIndex}`),
  posterPath: `/POSTER_PATH-${index}`,
  title: `TITLE-${index}`,
  __typename: 'BaseTVShow',
  voteAverage: index,
  voteCount: index,
  id: index,
}));

export const trendingTvShows = {
  onTheAir: {
    totalResults: 1,
    totalPages: 1,
    hasMore: true,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  airingToday: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
__typename: 'TrendingTVShows',
};

export const homeTrendingTVShowsResolvers = () => {
    const request = {
      request: {
        query: GET_TRENDING_TV_SHOWS,
        variables: {
          language: 'EN',
          page: 1,
        },
      },
    };
    const result = {
      result: {
        data: {
          trendingTvShows,
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
