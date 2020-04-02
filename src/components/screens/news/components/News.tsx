/* eslint-disable react/display-name */

import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
  TouchableOpacity, RefreshControl, FlatList, View,
} from 'react-native';
import { useLazyQuery } from '@apollo/react-hooks';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import gql from 'graphql-tag';

import NewsListItemPlaceholder from './list-item/NewsListItemPlaceholder';
import LanguageFilter from './language-filter/LanguageFilter';
import { imageWrapper } from './list-item/common-styles';
import NewsListItem from './list-item/NewsListItem';
import CONSTANTS from '../../../../utils/constants';
import Advise from '../../../common/advise/Advise';
import metrics from '../../../../styles/metrics';
import Icon from '../../../common/Icon';
import {
  GetArticlesVariables,
  ArticleLanguage,
  GetArticles,
} from '../../../../types/schema';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const FilterIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('7%'),
  color: theme.colors.background,
  name: 'tune',
}))``;

const FilterButton = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.mediumSize,
    right: theme.metrics.mediumSize,
    bottom: theme.metrics.mediumSize,
    left: theme.metrics.mediumSize,
  },
}))`
  margin-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

export const LOADING_ITEMS_COUNT = Math.floor(metrics.height / imageWrapper.height) - 1;

const LOADING_ITEMS = Array.from({ length: LOADING_ITEMS_COUNT }, (_, index) => ({
  id: `${index}`,
}));

export const GET_ARTICLES = gql`
  query GetArticles($page: Int!, $language: ArticleLanguage!) {
    articles(page: $page, language: $language) {
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

type Props = {
  theme: DefaultTheme;
  navigation: any;
};

const News = ({ navigation, theme }: Props) => {
  const [isFilterLanguageModalOpen, setIsFilterLanguageModalOpen] = useState<boolean>(
    false,
  );

  const [languageFilter, setLanguageFilter] = useState<ArticleLanguage>(
    ArticleLanguage.EN,
  );

  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const [loadArticles, { loading, data, error }] = useLazyQuery<
    GetArticles,
    GetArticlesVariables
  >(GET_ARTICLES, {
    variables: { page: 1, language: languageFilter },
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      setIsRefetching(false);
    },
  });

  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FilterButton
          onPress={() => setIsFilterLanguageModalOpen(true)}
        >
          <FilterIcon />
        </FilterButton>
      ),
    });
  }, []);

  useEffect(() => {
    loadArticles();
  }, []);

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

  if (
    error
    && error.message.includes(CONSTANTS.ERROR_MESSAGES.NETWORK_FAILED_CONNECTION)
  ) {
    return (
      <Advise
        description={t('translations:errors:network:description')}
        suggestion={t('translations:errors:network:suggestion')}
        title={t('translations:errors:network:title')}
        icon="wifi-off"
      />
    );
  }

  return (
    <Wrapper
      testID="news-content-wrapper"
    >
      <FlatList
        renderItem={({ item }) => (
          <NewsListItem
            withRTL={languageFilter === ArticleLanguage.AR}
            date={item.publishedAt}
            source={item.source}
            text={item.content}
            image={item.image}
            url={item.url}
          />
        )}
        refreshControl={(
          <RefreshControl
            progressBackgroundColor={theme.colors.text}
            refreshing={isRefetching && !data}
            colors={[theme.colors.background]}
            tintColor={theme.colors.text}
            onRefresh={() => {
              setIsRefetching(true);
              loadArticles();
            }}
          />
        )}
        data={data ? data.articles.items : []}
        keyExtractor={(item) => item.id}
        testID="news-list"
      />
      {isFilterLanguageModalOpen && (
        <LanguageFilter
          onSelect={(language: ArticleLanguage) => {
            setIsFilterLanguageModalOpen(false);
            setLanguageFilter(language);
          }}
          lastFilterSelected={languageFilter}
        />
      )}
    </Wrapper>
  );
};

export default withTheme(News);
