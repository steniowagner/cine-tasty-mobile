import { GraphQLError } from 'graphql';

import { QUERY_TRENDING_FAMOUS } from '@/components/stacks/famous/screens/trending-famous/use-trending-famous';
import { DEFAULT_HEIGHT } from '@/components/common/default-tmdb-list-item/DefaultTMDBListItem.styles';
import { QueryTrendingFamous_trendingFamous_items } from '@/types/schema';
import metrics from '@styles/metrics';

type Errors = 'network' | 'graphql';

export const TRENDING_FAMOUS_ITEMS_PER_PAGE = Math.floor(
  metrics.height / DEFAULT_HEIGHT,
);

export const trendingFamousList = (page: number = 1) =>
  Array(TRENDING_FAMOUS_ITEMS_PER_PAGE)
    .fill({})
    .map((_, index) => ({
      profilePath: `page${page}-profilePath-${index}`,
      name: `page${page}-name-${index}-${page}`,
      id: page * TRENDING_FAMOUS_ITEMS_PER_PAGE + index,
      __typename: 'TrendingFamousItem',
    })) as QueryTrendingFamous_trendingFamous_items[];

type BaseMockNewsQueryResponseParams = {
  items: QueryTrendingFamous_trendingFamous_items[];
  page: number;
  hasMore: boolean;
};

const baseMockTrendingFamousQueryResponse = (
  params: BaseMockNewsQueryResponseParams,
) => {
  const request = {
    request: {
      query: QUERY_TRENDING_FAMOUS,
      variables: {
        page: params.page,
      },
    },
  };
  const result = {
    result: {
      data: {
        trendingFamous: {
          hasMore: params.hasMore,
          items: params.items,
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

export const mockTrendingFamousEntryQuerySuccessResponse = (
  hasMore = true,
  withEmptyResponse = false,
) => {
  const entryQueryResult = baseMockTrendingFamousQueryResponse({
    items: withEmptyResponse ? [] : trendingFamousList(),
    page: 1,
    hasMore,
  });
  return [
    {
      ...entryQueryResult.request,
      ...entryQueryResult.result,
    },
  ];
};

export const mockTrendingFamousEntryQueryErrorResponse = (error: Errors) => {
  const entryQueryResult = baseMockTrendingFamousQueryResponse({
    hasMore: false,
    page: 1,
    items: [],
  });
  const errorResponse =
    error === 'network'
      ? entryQueryResult.responseWithNetworkError
      : entryQueryResult.responseWithGraphQLError;
  return [
    {
      ...entryQueryResult.request,
      ...errorResponse,
    },
  ];
};

export const mockTrendingFamousPaginationQuerySuccessResponse = (
  hasMore = true,
) => {
  const entryQueryResult = baseMockTrendingFamousQueryResponse({
    items: trendingFamousList(),
    page: 1,
    hasMore: true,
  });
  const paginationQueryResult = baseMockTrendingFamousQueryResponse({
    items: trendingFamousList(2),
    page: 2,
    hasMore,
  });
  return [
    {
      ...entryQueryResult.request,
      ...entryQueryResult.result,
    },
    {
      ...paginationQueryResult.request,
      ...paginationQueryResult.result,
    },
  ];
};

export const mockTrendingFamousPaginationQueryErrorResponse = (
  error: Errors,
) => {
  const entryQueryResult = baseMockTrendingFamousQueryResponse({
    items: trendingFamousList(),
    page: 1,
    hasMore: true,
  });
  const paginationQueryResult = baseMockTrendingFamousQueryResponse({
    items: trendingFamousList(),
    page: 2,
    hasMore: false,
  });
  const errorResponse =
    error === 'network'
      ? paginationQueryResult.responseWithNetworkError
      : paginationQueryResult.responseWithGraphQLError;
  return [
    {
      ...entryQueryResult.request,
      ...entryQueryResult.result,
    },
    {
      ...errorResponse.request,
      ...errorResponse,
    },
  ];
};
