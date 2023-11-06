import { DocumentNode, GraphQLError } from 'graphql';

import { SEARCH_FAMOUS_QUERY } from '@/components/stacks/common-screens/search/search-config/search-famous-config';
import { SEARCH_MOVIES_QUERY } from '@/components/stacks/common-screens/search/search-config/search-movies-config';
import { SEARCH_TV_SHOWS_QUERY } from '@/components/stacks/common-screens/search/search-config/search-tv-shows-config';
import { DEFAULT_HEIGHT } from '@/components/common/default-tmdb-list-item/DefaultTMDBListItem.styles';
import {
  SearchType,
  SearchItem,
} from '@/components/stacks/common-screens/search/types';
import metrics from '@/styles/metrics';
import { ISO6391Language } from '@/types/schema';
import { getErrorType } from './utils';

type BaseMockSearchQueryResponseParams = {
  items: SearchItem[];
  type: SearchType;
  page: number;
  hasMore: boolean;
  query: string;
};

export const SEARCH_ITEMS_PER_PAGE = Math.floor(
  metrics.height / DEFAULT_HEIGHT,
);

export const searchItemsList = (page = 1) =>
  Array(SEARCH_ITEMS_PER_PAGE)
    .fill({})
    .map((_, index) => ({
      image: `page${page}-image-${index}`,
      title: `page${page}-title-${index}-${page}`,
      id: page * SEARCH_ITEMS_PER_PAGE + index,
    })) as SearchItem[];

const baseMockSearchQueryResponse = (
  params: BaseMockSearchQueryResponseParams,
) => {
  const searchTypeQueryMapping: Record<SearchType, DocumentNode> = {
    [SearchType.FAMOUS]: SEARCH_FAMOUS_QUERY,
    [SearchType.MOVIE]: SEARCH_MOVIES_QUERY,
    [SearchType.TV]: SEARCH_TV_SHOWS_QUERY,
  };
  const request = {
    request: {
      query: searchTypeQueryMapping[params.type],
      variables: {
        input: {
          language: ISO6391Language.en,
          page: params.page,
          query: params.query,
        },
      },
    },
  };
  const result = {
    result: {
      data: {
        search: {
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

type MockSearchEntryQuerySuccessResponseParams = {
  hasMore: boolean;
  type: SearchType;
  query: string;
};

export const mockSearchEntryQuerySuccessResponse = (
  params: MockSearchEntryQuerySuccessResponseParams,
) => {
  const entryQueryResult = baseMockSearchQueryResponse({
    items: searchItemsList(),
    page: 1,
    query: params.query,
    type: params.type,
    hasMore: params.hasMore,
  });
  return [
    {
      ...entryQueryResult.request,
      ...entryQueryResult.result,
    },
  ];
};

export const mockSearchEntryQueryErrorResponse = (
  params: MockSearchEntryQuerySuccessResponseParams,
) => {
  const error = getErrorType();
  const entryQueryResult = baseMockSearchQueryResponse({
    items: [],
    page: 1,
    query: params.query,
    type: params.type,
    hasMore: false,
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

export const mockSearchPaginationQuerySuccessResponse = (
  params: MockSearchEntryQuerySuccessResponseParams,
) => {
  const entryQueryResult = baseMockSearchQueryResponse({
    items: searchItemsList(),
    page: 1,
    query: params.query,
    type: params.type,
    hasMore: params.hasMore,
  });
  const paginationQueryResult = baseMockSearchQueryResponse({
    items: searchItemsList(2),
    page: 2,
    query: params.query,
    type: params.type,
    hasMore: params.hasMore,
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

export const mockSearchPaginationQueryErrorResponse = (
  params: MockSearchEntryQuerySuccessResponseParams,
) => {
  const error = getErrorType();
  const entryQueryResult = baseMockSearchQueryResponse({
    items: searchItemsList(),
    page: 1,
    query: params.query,
    type: params.type,
    hasMore: params.hasMore,
  });
  const paginationQueryResult = baseMockSearchQueryResponse({
    items: [],
    page: 2,
    query: params.query,
    type: params.type,
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
      ...paginationQueryResult.request,
      ...errorResponse,
    },
  ];
};
