import { GraphQLError } from 'graphql';

import {GET_TRENDING_TV_SHOWS} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

const trendingTVShowsItems = Array(10)
.fill({})
.map((_, index) => ({
  genreIds: Array(index + 1)
    .fill('')
    .map((__, genreIndex) => `GENRE-${genreIndex}`),
  posterPath: `/POSTER_PATH-${index}`,
  title: `TV_SHOW_TITLE-${index}`,
  __typename: 'BaseTVShow',
  voteAverage: index,
  voteCount: index,
  id: index,
}));

const trendingTvShows = {
  onTheAir: {
    totalResults: 1,
    totalPages: 1,
    hasMore: true,
    items: trendingTVShowsItems as SchemaTypes.TrendingOnTheAirTVShows_trendingTvShows_onTheAir_items[],
    __typename: 'TrendingTVShowsQueryResult',
  },
  airingToday: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItems as SchemaTypes.TrendingAiringTodayTVShows_trendingTvShows_airingToday_items[],
    __typename: 'TrendingTVShowsQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItems as SchemaTypes.TrendingPopularTVShows_trendingTvShows_popular_items[],
    __typename: 'TrendingTVShowsQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItems as SchemaTypes.TrendingTopRatedTVShows_trendingTvShows_topRated_items[],
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


  export const makeQuerySuccessResolver = () => {
    const baseResolver = homeTrendingTVShowsResolvers();
    return [{
      ...baseResolver.request,
      ...baseResolver.result,
    }];
   };
  
   export const makeQueryWithGraphQLErrorResolver = () => {
    const baseResolver = homeTrendingTVShowsResolvers();
    return [{
      ...baseResolver.request,
      ...baseResolver.responseWithGraphQLError,
    }];
   };
  
   export const makeQueryWithNetworkErrorResolver = () => {
    const baseResolver = homeTrendingTVShowsResolvers();
    return [{
      ...baseResolver.request,
      ...baseResolver.responseWithNetworkError,
    }];
   };
  
   export const makeQueryWithGraphQLErrorAndRefetchWithGraphQLErrorResolver = () => {
    const baseResolver = homeTrendingTVShowsResolvers();
    return [{
      ...baseResolver.request,
      ...baseResolver.responseWithGraphQLError,
    }, {
      ...baseResolver.request,
      ...baseResolver.responseWithGraphQLError,
    }];
   };
  
   export const makeQueryWithGraphQLErrorAndRefetchWithSuccessResolver = () => {
    const baseResolver = homeTrendingTVShowsResolvers();
    return [{
      ...baseResolver.request,
      ...baseResolver.responseWithGraphQLError,
    }, {
      ...baseResolver.request,
      ...baseResolver.result,
    }];
   };
  
   export const makeQueryWithGraphQLErrorAndRefetchWithNetworkErrorResolver = () => {
    const baseResolver = homeTrendingTVShowsResolvers();
    return [{
      ...baseResolver.request,
      ...baseResolver.responseWithGraphQLError,
    }, {
      ...baseResolver.request,
      ...baseResolver.responseWithNetworkError,
    }];
   };
  
   export const makeQueryWithNetworkErrorAndRefetchWithSuccessResolver = () => {
    const baseResolver = homeTrendingTVShowsResolvers();
    return [{
      ...baseResolver.request,
      ...baseResolver.responseWithNetworkError,
    }, {
      ...baseResolver.request,
      ...baseResolver.result,
    }];
   };
  
   export const makeQueryWithNetworkErrorAndRefetchWithGraphQLErrorResolver = () => {
    const baseResolver = homeTrendingTVShowsResolvers();
    return [{
      ...baseResolver.request,
      ...baseResolver.responseWithNetworkError,
    }, {
      ...baseResolver.request,
      ...baseResolver.responseWithGraphQLError,
    }];
   };
  
   export const makeQueryWithNetworkErrorAndRefetchWithNetworkErrorResolver = () => {
    const baseResolver = homeTrendingTVShowsResolvers();
    return [{
      ...baseResolver.request,
      ...baseResolver.responseWithNetworkError,
    }, {
      ...baseResolver.request,
      ...baseResolver.responseWithNetworkError,
    }];
   };