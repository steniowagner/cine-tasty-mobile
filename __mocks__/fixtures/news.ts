import {OperationVariables} from '@apollo/client';
import { GraphQLError } from 'graphql';

import {GET_ARTICLES} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import { INITIAL_ITEMS_TO_RENDER } from '@src/components/screens/news/components/News';

type PossibleErrors = 'network' | 'graphql';

export const DATASET_LENGTH = INITIAL_ITEMS_TO_RENDER;

const dataset = (page: number, language: SchemaTypes.ArticleLanguage = SchemaTypes.ArticleLanguage.EN) => Array(DATASET_LENGTH)
.fill({})
.map((_, index) => ({
  publishedAt: `page${page}-language-${language}-publishedAt-${index}`,
  source: `page${page}-language-${language}-source-${index}`,
  title: `page${page}-language-${language}-title-${index}`,
  image: `page${page}-language-${language}-image-${index}`,
  url: `page${page}-language-${language}-url-${index}`,
  id: `page${page}-language-${language}-${index}`,
  content: `page${page}-language-${language}-content-${index}`,
  author: `page${page}-language-${language}-author-${index}`,
  __typename: 'Article',
})) as SchemaTypes.GetArticles_articles_items[];


const newsRresolvers = (variables: OperationVariables, items: SchemaTypes.GetArticles_articles_items[] = [], hasMore: boolean = false) => {
  const request = {
    request: {
      query: GET_ARTICLES,
      variables,
    },
  };

  const result = {
    result: {
      data: {
        articles: {
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

const getError = (error: PossibleErrors) => {
  const paginationErrorResult = newsRresolvers(
    {language: 'EN', page: 2},
    dataset(2),
    true,
  );
  const errorResult = error === 'network'
    ? paginationErrorResult.responseWithNetworkError
    : paginationErrorResult.responseWithGraphQLError;
  return {
    ...paginationErrorResult.request,
    ...errorResult,
  };
};


export const makeEntryQuerySuccessResolvers = (numberOfItems: number = 1) => {
  const entryQueryResult = newsRresolvers(
    {language: 'EN', page: 1},
    !numberOfItems ? [] : dataset(numberOfItems),
    true,
  );
  return [
    {
      ...entryQueryResult.request,
      ...entryQueryResult.result,
    },
  ];
};

export const makeEntryQueryErrorResolvers = (error: PossibleErrors) => {
  const entryQueryResult = newsRresolvers(
    {language: 'EN', page: 1},
    dataset(1),
    true,
  );
  const errorResponse =
    error === 'network'
      ? entryQueryResult.responseWithNetworkError
      : entryQueryResult.responseWithGraphQLError;
  return [
    {
      ...entryQueryResult.request,
      ...errorResponse,
    },
    {
      ...entryQueryResult.request,
      ...entryQueryResult.result,
    },
  ];
};

export const makeEntryQueryWithRefetchError = (
  firstError: PossibleErrors,
  secondError: PossibleErrors,
) => {
  const entryQueryResult = newsRresolvers(
    {language: 'EN', page: 1},
    dataset(1),
    true,
  );
  const getEntryError = (error: PossibleErrors) =>
    error === 'network'
      ? entryQueryResult.responseWithNetworkError
      : entryQueryResult.responseWithGraphQLError;
  const firstErrorResponse = getEntryError(firstError);
  const secondErrorResponse = getEntryError(secondError);
  return [
    {
      ...entryQueryResult.request,
      ...firstErrorResponse,
    },
    {
      ...entryQueryResult.request,
      ...secondErrorResponse,
    },
  ];
};

export const makePaginationSuccess = (hasMoreDataAfterFirstQuery: boolean) => {
  const entryQueryResult = newsRresolvers(
    {language: 'EN', page: 1},
    dataset(1),
    hasMoreDataAfterFirstQuery,
  );
  const paginationQueryResult = newsRresolvers(
    {language: 'EN', page: 2},
    dataset(2),
    false,
  );
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

export const mockPaginationError = (firstError: PossibleErrors) => {
  const entryQueryResult = newsRresolvers(
    {language: 'EN', page: 1},
    dataset(1),
    true,
  );
  const errorResponse = getError(firstError);
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

export const mockPaginationErrorSuccess = (firstError: PossibleErrors) => {
  const entryQueryResult = newsRresolvers(
    {language: 'EN', page: 1},
    dataset(1),
    true,
  );
  const paginationErrorResult = newsRresolvers(
    {language: 'EN', page: 2},
    dataset(2),
    true,
  );
  const errorResponse =
  firstError === 'network'
      ? paginationErrorResult.responseWithNetworkError
      : paginationErrorResult.responseWithGraphQLError;
  return [
    {
      ...entryQueryResult.request,
      ...entryQueryResult.result,
    },
    {
      ...paginationErrorResult.request,
      ...errorResponse,
    },
    {
      ...paginationErrorResult.request,
      ...paginationErrorResult.result,
    },
  ];
}

export const mockPaginationErrorAndError = (firstError: PossibleErrors, secondError: PossibleErrors) => {
  const entryQueryResult = newsRresolvers(
    {language: 'EN', page: 1},
    dataset(1),
    true,
  );

const firstErrorResponse = getError(firstError);
const secondErrorResponse = getError(secondError);
  return [
    {
      ...entryQueryResult.request,
      ...entryQueryResult.result,
    },
    {
      ...firstErrorResponse,
    },
    {
     ...secondErrorResponse,
    },
  ];
}