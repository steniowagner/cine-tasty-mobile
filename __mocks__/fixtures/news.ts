import {OperationVariables} from '@apollo/client';
import { GraphQLError } from 'graphql';

import {GET_ARTICLES} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

export const DATASET_LENGTH = 10;

export const dataset = (page: number, language: SchemaTypes.ArticleLanguage = SchemaTypes.ArticleLanguage.EN) => Array(DATASET_LENGTH)
.fill({})
.map((_, index) => ({
  publishedAt: `page${page}-language-${language}-publishedAt-${index}`,
  source: `page${page}-language-${language}-source-${index}`,
  title: `page${page}-language-${language}-title-${index}`,
  image: `page${page}-language-${language}-image-${index}`,
  url: `page${page}-language-${language}-url-${index}`,
  id: `page${page}-language-${language}-${index}`,
  __typename: 'Article',
}));

export const newsRresolvers = (variables: OperationVariables, items: SchemaTypes.GetArticles_articles_items[] = [], hasMore: boolean = false) => {
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
