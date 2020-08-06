/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import {
  TouchableOpacity, FlatList, Platform, View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';

import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import CustomRefreshControl from 'components/common/CustomRefreshControl';
import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import LoadingIndicator from 'components/common/LoadingIndicator';
import HeaderIconButton from 'components/common/HeaderIconButton';
import Advise from 'components/common/advise/Advise';
import { ArticleLanguage } from 'types/schema';
import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';

import { NewsStackParams } from '../routes/route-params-types';
import LanguageFilter from './language-filter/LanguageFilter';
import { imageWrapper } from './list-item/common-styles';
import NewsListItem from './list-item/NewsListItem';
import useNews from './useNews';

const ITEM_HEIGHT = imageWrapper.height + 2 * metrics.mediumSize;

export const INITIAL_ITEMS_TO_RENDER = Math.floor(metrics.height / imageWrapper.height) - 1;

const TopReloadButton = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.largeSize,
    bottom: theme.metrics.largeSize,
    left: theme.metrics.largeSize,
    right: theme.metrics.largeSize,
  },
}))`
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ReloadIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('10%'),
  color: theme.colors.text,
  name: 'reload',
}))``;

type NewsScreenNavigationProp = StackNavigationProp<NewsStackParams, 'NEWS'>;

type Props = {
  navigation: NewsScreenNavigationProp;
};

const News = ({ navigation }: Props) => {
  const {
    setIsFilterLanguageModalOpen,
    isFilterLanguageModalOpen,
    onPressFooterReloadButton,
    onSelectArticleLanguage,
    onPressTopReloadButton,
    onPullRefreshControl,
    hasPaginationError,
    articleLanguage,
    onEndReached,
    isPaginating,
    isRefreshing,
    articles,
    isLoading,
    error,
    t,
  } = useNews();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={() => setIsFilterLanguageModalOpen(true)}
          disabled={isLoading}
          withMarginRight
          iconName="tune"
        />
      ),
    });
  }, [isLoading]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const shouldShowEmptyListAdvice = !isLoading && !error && !articles.length;

  if (shouldShowEmptyListAdvice) {
    return (
      <View
        testID="list-empty-component-wrapper"
      >
        <Advise
          description={t('translations:news:emptyList:description')}
          suggestion={t('translations:news:emptyList:suggestion')}
          title={t('translations:news:emptyList:title')}
          icon="alert-box"
        />
        {isFilterLanguageModalOpen && (
          <LanguageFilter
            onCloseModal={() => setIsFilterLanguageModalOpen(false)}
            onSelectLanguage={onSelectArticleLanguage}
            lastLanguageSelected={articleLanguage}
          />
        )}
      </View>
    );
  }

  const shouldShowListTopReloadButton = !articles.length && !!error && !isLoading;
  const shouldShowListBottomReloadButton = !!articles.length && (hasPaginationError || isPaginating);

  return (
    <>
      <FlatList
        ListHeaderComponent={() => shouldShowListTopReloadButton && (
        <TopReloadButton
          onPress={() => onPressTopReloadButton()}
          testID="top-reload-button"
        >
          <ReloadIcon />
        </TopReloadButton>
        )}
        ListFooterComponent={() => shouldShowListBottomReloadButton && (
        <ListFooterComponent
          onPressReloadButton={onPressFooterReloadButton}
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
        refreshControl={(
          <CustomRefreshControl
            onRefresh={onPullRefreshControl}
            refreshing={isRefreshing}
          />
        )}
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
          onSelectLanguage={onSelectArticleLanguage}
          lastLanguageSelected={articleLanguage}
        />
      )}
      {!!error && (
      <PopupAdvice
        text={error}
      />
      )}
    </>
  );
};

export default News;
