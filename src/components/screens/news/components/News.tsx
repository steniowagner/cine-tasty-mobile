/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, FlatList, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';

import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import CustomRefreshControl from 'components/common/CustomRefreshControl';
import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import LoadingIndicator from 'components/common/LoadingIndicator';
import { ArticleLanguage } from 'types/schema';
import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';

import { NewsStackParams } from '../routes/route-params-types';
import LanguageFilter from './language-filter/LanguageFilter';
import { imageWrapper } from './list-item/common-styles';
import NewsListItem from './list-item/NewsListItem';
import useNews from './useNews';

const FilterIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('7%'),
  color: theme.colors.text,
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

export const INITIAL_ITEMS_TO_RENDER =
  Math.floor(metrics.height / imageWrapper.height) - 1;

type PeopleScreenNavigationProp = StackNavigationProp<NewsStackParams, 'NEWS'>;

type Props = {
  navigation: PeopleScreenNavigationProp;
};

const News = ({ navigation }: Props) => {
  const {
    setIsFilterLanguageModalOpen,
    isFilterLanguageModalOpen,
    onPullRefreshControl,
    onPressReloadButton,
    setArticleLanguage,
    hasPaginationError,
    articleLanguage,
    onEndReached,
    isRefreshing,
    isPaginating,
    isLoading,
    articles,
    error,
  } = useNews();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        !isLoading &&
        !error && (
          <FilterButton onPress={() => setIsFilterLanguageModalOpen(true)}>
            <FilterIcon />
          </FilterButton>
        ),
    });
  }, [isLoading, error]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <FlatList
        ListFooterComponent={() => (
          <ListFooterComponent
            onPressReloadButton={onPressReloadButton}
            hasError={hasPaginationError}
            isPaginating={isPaginating}
          />
        )}
        renderItem={({ item }) => (
          <NewsListItem
            withRTL={articleLanguage === ArticleLanguage.AR}
            date={item.publishedAt}
            source={item.source}
            image={item.image}
            text={item.title}
            url={item.url}
          />
        )}
        ListEmptyComponent={() => (
          <ListFooterComponent
            onPressReloadButton={onPressReloadButton}
            hasError={hasPaginationError}
            isPaginating={isPaginating}
          />
        )}
        refreshControl={
          <CustomRefreshControl
            onRefresh={onPullRefreshControl}
            refreshing={isRefreshing}
          />
        }
        keyExtractor={(item, index) => `${item.id}${index}`}
        initialNumToRender={INITIAL_ITEMS_TO_RENDER + 1}
        onEndReachedThreshold={Platform.select({
          android: 0.5,
          ios: 0.1,
        })}
        getItemLayout={(_data, index) => ({
          offset: ITEM_HEIGHT * index,
          length: ITEM_HEIGHT,
          index,
        })}
        bounces={!!articles.length}
        onEndReached={onEndReached}
        testID="news-list"
        data={articles}
      />
      {isFilterLanguageModalOpen && (
        <LanguageFilter
          onCloseModal={() => setIsFilterLanguageModalOpen(false)}
          lastLanguageSelected={articleLanguage}
          onSelectLanguage={setArticleLanguage}
        />
      )}
      {!!error && <PopupAdvice onFinishToShow={() => {}} text={error} />}
    </>
  );
};

export default News;
