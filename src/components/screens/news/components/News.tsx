import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { GetArticles, GetArticlesVariables } from '../../../../types/schema';
import NewsListItemPlaceholder from './list-item/NewsListItemPlaceholder';
import { imageWrapper } from './list-item/common-styles';
import NewsListItem from './list-item/NewsListItem';
import metrics from '../../../../styles/metrics';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LOADING_ITEMS_COUNT = Math.floor(metrics.height / imageWrapper.height) - 1;
const LOADING_ITEMS = Array.from({ length: LOADING_ITEMS_COUNT }, (_, index) => ({
  id: `${index}`,
}));

const GET_ARTICLES = gql`
  query GetArticles($page: Int!) {
    articles(page: $page) {
      items {
        publishedAt
        content
        source
        author
        title
        image
        url
        id
      }
      hasMore
    }
  }
`;

const News = () => {
  const { loading, data } = useQuery<GetArticles, GetArticlesVariables>(GET_ARTICLES, {
    variables: { page: 1 },
    fetchPolicy: 'no-cache',
  });

  if (loading) {
    return (
      <Wrapper
        testID="news-loading-wrapper"
      >
        {LOADING_ITEMS.map((item) => (
          <NewsListItemPlaceholder
            key={item.id}
          />
        ))}
      </Wrapper>
    );
  }

  return (
    <Wrapper
      testID="news-content-wrapper"
    >
      <FlatList
        testID="news-list"
        renderItem={({ item }) => (
          <NewsListItem
            date={item.publishedAt}
            source={item.source}
            text={item.content}
            image={item.image}
            url={item.url}
          />
        )}
        data={data.articles.items}
        keyExtractor={(item) => item.id}
      />
    </Wrapper>
  );
};

export default News;
