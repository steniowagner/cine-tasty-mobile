import React, { useEffect } from 'react';
import { Text, Platform } from 'react-native';

import { useImperativeQuery } from '@hooks';
import { QueryNewsVariables, QueryNews, NewsLanguage } from '@schema-types';
import { gql } from '@apollo/client';

const GET_NEWS = gql`
  query QueryNews($page: Int!, $language: NewsLanguage!) {
    news(page: $page, language: $language) {
      items {
        author
        content
      }
    }
  }
`;

export const NewsStack = () => {
  const imperativeQuery = useImperativeQuery<QueryNews, QueryNewsVariables>({
    onCompleted: r => console.log(Platform.OS, r.data),
    query: GET_NEWS,
  });

  useEffect(() => {
    imperativeQuery.exec({
      page: 1,
      language: NewsLanguage.EN,
    });
  }, []);

  return <Text>QW</Text>;
};
