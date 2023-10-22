import { OperationVariables } from '@apollo/client';
import { GraphQLError } from 'graphql';

import { QueryNews_news_items, NewsLanguage } from '@schema-types';
import metrics from '@styles/metrics';

import { GET_NEWS } from '../src/components/stacks/news/screens/news/use-news';
import { LIST_ITEM_HEIGHT } from '../src/components/stacks/news/screens/news/News.styles';

type Errors = 'network' | 'graphql';

type BaseMockNewsQueryResponseParams = {
  variables: OperationVariables;
  items: QueryNews_news_items[];
  hasMore: boolean;
};

export const NEWS_ITEMS_PER_PAGE = Math.floor(
  metrics.height / LIST_ITEM_HEIGHT,
);

const ENTRY_QUERY_DEFAULT_VARIABLES = {
  language: NewsLanguage.EN,
  page: 1,
};

const makeResponseDataset = (language = NewsLanguage.EN, page = 1) =>
  Array(NEWS_ITEMS_PER_PAGE)
    .fill({})
    .map((_, index) => ({
      publishedAt: `page${page}-language-${language}-publishedAt-${index}`,
      source: `page${page}-language-${language}-source-${index}`,
      title: `page${page}-language-${language}-title-${index}`,
      image: `page${page}-language-${language}-image-${index}`,
      url: `page${page}-language-${language}-url-${index}`,
      id: `page${page}-language-${language}-id-${index}`,
      __typename: 'NewsArticle',
    })) as QueryNews_news_items[];

const baseMockNewsQueryResponse = (params: BaseMockNewsQueryResponseParams) => {
  const request = {
    request: {
      query: GET_NEWS,
      variables: params.variables,
    },
  };
  const result = {
    result: {
      data: {
        news: {
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

export const mockNewsEntryQuerySuccessResponse = (
  language = NewsLanguage.EN,
  hasMore = true,
  withEmptyResponse = false,
) => {
  const entryQueryResult = baseMockNewsQueryResponse({
    variables: ENTRY_QUERY_DEFAULT_VARIABLES,
    items: withEmptyResponse ? [] : makeResponseDataset(language),
    hasMore,
  });
  return [
    {
      ...entryQueryResult.request,
      ...entryQueryResult.result,
    },
  ];
};

export const mockNewsEntryQueryErrorResponse = (error: Errors) => {
  const entryQueryResult = baseMockNewsQueryResponse({
    variables: ENTRY_QUERY_DEFAULT_VARIABLES,
    hasMore: false,
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

export const mockNewsPaginationQuerySuccessResponse = (hasMore = true) => {
  const entryQueryResult = baseMockNewsQueryResponse({
    variables: { language: NewsLanguage.EN, page: 1 },
    items: makeResponseDataset(),
    hasMore: true,
  });
  const paginationQueryResult = baseMockNewsQueryResponse({
    variables: { language: NewsLanguage.EN, page: 2 },
    items: makeResponseDataset(undefined, 2),
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

export const mockNewsPaginationQueryErrorResponse = (error: Errors) => {
  const entryQueryResult = baseMockNewsQueryResponse({
    variables: { language: NewsLanguage.EN, page: 1 },
    items: makeResponseDataset(),
    hasMore: true,
  });
  const paginationQueryResult = baseMockNewsQueryResponse({
    variables: { language: NewsLanguage.EN, page: 2 },
    items: makeResponseDataset(undefined, 2),
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
