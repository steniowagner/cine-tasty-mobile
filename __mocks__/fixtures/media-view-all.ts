import {OperationVariables} from '@apollo/client';
import {DocumentNode,GraphQLError} from 'graphql';

import {MediaTrendingItem, MovieTrendingItem, TVShowTrendingItem} from '@src/components/screens/home/components/media-section-view-all/components/on-get-data/types';
import * as Types from '@local-types';
import * as SchemaTypes from '@schema-types';

type MediaViewAllResolversParams = {
  variables: OperationVariables;
  items: MediaTrendingItem[];
  trendingKey: Types.TrendingMediaItemKey;
  isMovie: boolean;
  hasMore?: boolean;
  query: DocumentNode;
}

type MakeTrendingMoviesQueryResultParams = {
  trendingMoviesKey: Types.TrendingMoviesKeys;
  items: MovieTrendingItem[];
  hasMore: boolean;
}


type MakeTrendingTVShowsQueryResultParams = {
  trendingTVShowsKey: Types.TrendingTVShowsKeys;
  items: TVShowTrendingItem[];
  hasMore: boolean;
}

type MakePaginationSuccessQueryParams = {
  trendingKey: Types.TrendingMediaItemKey;
  query: DocumentNode;
  isMovie: boolean;
  numberOfItems: number
}

export const makeTVShowViewAllInitialDataset = (length: number, page: number): TVShowTrendingItem[] => Array(length)
  .fill({})
  .map((_, index) => ({
    __typename: 'BaseTVShow',
    voteAverage: 10 / index + 1,
    title: `Title-${index}-Page-${page}`,
    posterPath: `PosterPath-${index}`,
    voteCount: 10 / index + 1,
    genreIds: [`Genre-${index}`],
    id: index,
  }));

export const makeMoviesViewAllInitialDataset = (length: number, page: number): MovieTrendingItem[] => Array(length)
  .fill({})
  .map((_, index) => ({
    __typename: 'BaseMovie',
    voteAverage: 10 / index + 1,
    title: `Title-${index}-Page-${page}`,
    posterPath: `PosterPath-${index}`,
    voteCount: 10 / index + 1,
    genreIds: [`Genre-${index}`],
    id: index,
  }));

const makeTrendingMoviesQueryResult = (params: MakeTrendingMoviesQueryResultParams) => ({
  trendingMovies: {
    [params.trendingMoviesKey]: {
      hasMore: params.hasMore,
      items: params.items,
    }
  },
});

const makeTrendingTVShowsQueryResult = (params: MakeTrendingTVShowsQueryResultParams) => ({
  trendingTvShows: {
    [params.trendingTVShowsKey]: {
      hasMore: params.hasMore,
      items: params.items,
    }
  },
});

const getTrendingQueryResults = (params: MediaViewAllResolversParams) => {
  return params.isMovie ? makeTrendingMoviesQueryResult({
    trendingMoviesKey: params.trendingKey as Types.TrendingMoviesKeys,
    items: params.items as MovieTrendingItem[],
    hasMore: params.hasMore,
  }) : makeTrendingTVShowsQueryResult({
    trendingTVShowsKey: params.trendingKey as Types.TrendingTVShowsKeys,
    items: params.items as TVShowTrendingItem[],
    hasMore: params.hasMore,
  });
};

export const mediaViewAllResolvers = (params: MediaViewAllResolversParams) => {
  const request = {
    request: {
      query: params.query,
      variables: params.variables,
    },
  };
  const result = {
    result: {
      data: getTrendingQueryResults(params),
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

type MakeQueryResultItemsParams = {
  isMovie: boolean;
  numberOfItems: number;
  page: number;
}

const makeQueryResultItems = (params: MakeQueryResultItemsParams) =>
  params.isMovie
    ? makeMoviesViewAllInitialDataset(params.numberOfItems, params.page)
    : makeTVShowViewAllInitialDataset(params.numberOfItems, params.page);

export const makePaginationSuccessQuery = (params: MakePaginationSuccessQueryParams) => {
  const queryResolver = mediaViewAllResolvers({
    variables: {page: 2, language: SchemaTypes.ISO6391Language.EN},
    items: makeQueryResultItems({
      isMovie: params.isMovie,
      numberOfItems: params.numberOfItems,
      page: 2,
    }) as MediaTrendingItem[],
    trendingKey: params.trendingKey,
    isMovie: params.isMovie,
    hasMore: true,
    query: params.query,
  });
  return [
    {
      ...queryResolver.request,
      ...queryResolver.result,
    },
    {
      ...queryResolver.request,
      ...queryResolver.result,
    },
  ];
};

export const makePaginationNetworkErrorQuery = (params: MakePaginationSuccessQueryParams) => {
  const queryResolver = mediaViewAllResolvers({
    variables: {page: 2, language: SchemaTypes.ISO6391Language.EN},
    items: makeQueryResultItems({
      isMovie: params.isMovie,
      numberOfItems: params.numberOfItems,
      page: 2,
    }) as MediaTrendingItem[],
    trendingKey: params.trendingKey,
    isMovie: params.isMovie,
    hasMore: true,
    query: params.query,
  });
  return [
    {
      ...queryResolver.request,
      ...queryResolver.responseWithNetworkError,
    },
  ];
};

export const makePaginationNetworkErrorRefetchSuccess = (params: MakePaginationSuccessQueryParams) => {
  const queryResolver = mediaViewAllResolvers({
    variables: {page: 2, language: SchemaTypes.ISO6391Language.EN},
    items: makeQueryResultItems({
      isMovie: params.isMovie,
      numberOfItems: params.numberOfItems,
      page: 2,
    }) as MediaTrendingItem[],
    trendingKey: params.trendingKey,
    isMovie: params.isMovie,
    hasMore: true,
    query: params.query,
  });
  return [
    {
      ...queryResolver.request,
      ...queryResolver.responseWithNetworkError,
    },
    {
      ...queryResolver.request,
      ...queryResolver.result,
    },
  ];
};

export const makePaginationNetworkErrorRefetchNetworkError = (params: MakePaginationSuccessQueryParams) => {
  const queryResolver = mediaViewAllResolvers({
    variables: {page: 2, language: SchemaTypes.ISO6391Language.EN},
    items: makeQueryResultItems({
      isMovie: params.isMovie,
      numberOfItems: params.numberOfItems,
      page: 2,
    }) as MediaTrendingItem[],
    trendingKey: params.trendingKey,
    isMovie: params.isMovie,
    hasMore: true,
    query: params.query,
  });
  return [
    {
      ...queryResolver.request,
      ...queryResolver.responseWithNetworkError,
    },
    {
      ...queryResolver.request,
      ...queryResolver.responseWithNetworkError,
    },
  ];
};

export const makePaginationNetworkErrorRefetchGraphQLError = (params: MakePaginationSuccessQueryParams) => {
  const queryResolver = mediaViewAllResolvers({
    variables: {page: 2, language: SchemaTypes.ISO6391Language.EN},
    items: makeQueryResultItems({
      isMovie: params.isMovie,
      numberOfItems: params.numberOfItems,
      page: 2,
    }) as MediaTrendingItem[],
    trendingKey: params.trendingKey,
    isMovie: params.isMovie,
    hasMore: true,
    query: params.query,
  });
  return [
    {
      ...queryResolver.request,
      ...queryResolver.responseWithNetworkError,
    },
    {
      ...queryResolver.request,
      ...queryResolver.responseWithGraphQLError,
    },
  ];
};

export const makePaginationGraphQLErrorQuery = (params: MakePaginationSuccessQueryParams) => {
  const queryResolver = mediaViewAllResolvers({
    variables: {page: 2, language: SchemaTypes.ISO6391Language.EN},
    items: makeQueryResultItems({
      isMovie: params.isMovie,
      numberOfItems: params.numberOfItems,
      page: 2,
    }) as MediaTrendingItem[],
    trendingKey: params.trendingKey,
    isMovie: params.isMovie,
    hasMore: true,
    query: params.query,
  });
  return [
    {
      ...queryResolver.request,
      ...queryResolver.responseWithGraphQLError,
    },
  ];
};

export const makePaginationGraphQLRefetchSuccess = (params: MakePaginationSuccessQueryParams) => {
  const queryResolver = mediaViewAllResolvers({
    variables: {page: 2, language: SchemaTypes.ISO6391Language.EN},
    items: makeQueryResultItems({
      isMovie: params.isMovie,
      numberOfItems: params.numberOfItems,
      page: 2,
    }) as MediaTrendingItem[],
    trendingKey: params.trendingKey,
    isMovie: params.isMovie,
    hasMore: true,
    query: params.query,
  });
  return [
    {
      ...queryResolver.request,
      ...queryResolver.responseWithGraphQLError,
    },
    {
      ...queryResolver.request,
      ...queryResolver.result,
    },
  ];
};

export const makePaginationGraphQLErrorRefetchGraphQLError = (params: MakePaginationSuccessQueryParams) => {
  const queryResolver = mediaViewAllResolvers({
    variables: {page: 2, language: SchemaTypes.ISO6391Language.EN},
    items: makeQueryResultItems({
      isMovie: params.isMovie,
      numberOfItems: params.numberOfItems,
      page: 2,
    }) as MediaTrendingItem[],
    trendingKey: params.trendingKey,
    isMovie: params.isMovie,
    hasMore: true,
    query: params.query,
  });
  return [
    {
      ...queryResolver.request,
      ...queryResolver.responseWithGraphQLError,
    },
    {
      ...queryResolver.request,
      ...queryResolver.responseWithGraphQLError,
    },
  ];
};

export const makePaginationGraphQLErrorRefetchNetworkError = (params: MakePaginationSuccessQueryParams) => {
  const queryResolver = mediaViewAllResolvers({
    variables: {page: 2, language: SchemaTypes.ISO6391Language.EN},
    items: makeQueryResultItems({
      isMovie: params.isMovie,
      numberOfItems: params.numberOfItems,
      page: 2,
    }) as MediaTrendingItem[],
    trendingKey: params.trendingKey,
    isMovie: params.isMovie,
    hasMore: true,
    query: params.query,
  });
  return [
    {
      ...queryResolver.request,
      ...queryResolver.responseWithGraphQLError,
    },
    {
      ...queryResolver.request,
      ...queryResolver.responseWithNetworkError,
    },
  ];
};
