/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import {
  TouchableOpacity, RefreshControl, FlatList, Platform, View,
} from 'react-native';
import styled, { withTheme, DefaultTheme } from 'styled-components';

import PaginationFooterLoading from '../../../common/PaginationFooterLoading';
import NewsListItemPlaceholder from './list-item/NewsListItemPlaceholder';
import LanguageFilter from './language-filter/LanguageFilter';
import { ArticleLanguage } from '../../../../types/schema';
import { imageWrapper } from './list-item/common-styles';
import NewsListItem from './list-item/NewsListItem';
import CONSTANTS from '../../../../utils/constants';
import Advise from '../../../common/advise/Advise';
import metrics from '../../../../styles/metrics';
import Icon from '../../../common/Icon';
import useNews from './useNews';

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

const ITEM_HEIGHT = imageWrapper.height + 2 * metrics.mediumSize;

export const INITIAL_ITEMS_TO_RENDER = Math.floor(metrics.height / imageWrapper.height) - 1;

const LOADING_ITEMS = Array.from({ length: INITIAL_ITEMS_TO_RENDER }, (_, index) => ({
  id: `${index}`,
}));

type Props = {
  theme: DefaultTheme;
  navigation: any;
};

const News = ({ navigation, theme }: Props) => {
  const {
    setIsFilterLanguageModalOpen,
    isFilterLanguageModalOpen,
    onSelectLanguageFilter,
    onRefreshArticles,
    languageFilter,
    onEndReached,
    isRefreshing,
    isPaginating,
    isLoading,
    articles,
    error,
    t,
  } = useNews();

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

  if (isLoading) {
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
            refreshing={isRefreshing && !articles}
            colors={[theme.colors.background]}
            onRefresh={onRefreshArticles}
            tintColor={theme.colors.text}
          />
        )}
        ListFooterComponent={() => isPaginating && <PaginationFooterLoading />}
        keyExtractor={(item, index) => `${item.id}${index}`}
        initialNumToRender={INITIAL_ITEMS_TO_RENDER + 1}
        onEndReachedThreshold={Platform.select({
          android: 0.5,
          ios: 0.1,
        })}
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onEndReached={onEndReached}
        testID="news-list"
        data={articles}
      />
      {isFilterLanguageModalOpen && (
        <LanguageFilter
          lastFilterSelected={languageFilter}
          onSelect={onSelectLanguageFilter}
        />
      )}
    </Wrapper>
  );
};

export default withTheme(News);
