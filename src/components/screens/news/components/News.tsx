/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import { FlatList, Platform } from 'react-native';

import PaginatedListHeader from '@components/common/paginated-list-header/PaginatedListHeader';
import ListFooterComponent from '@components/common/pagination-footer/PaginationFooter';
import HeaderIconButton from '@components/common/header-icon-button/HeaderIconButton';
import PopupAdvice from '@components/common/popup-advice/PopupAdvice';
import * as SchemaTypes from '@schema-types';
import metrics from '@styles/metrics';

import { imageWrapper } from './list-item/NewsListItem.styles';
import { NewsStackProps } from '../routes/route-params-types';
import useNews, { INITIAL_ITEMS_TO_RENDER } from './useNews';
import NewsLoading from './loading-list/NewsLoading';
import NewsListItem from './list-item/NewsListItem';
import EmtpyListError from './EmtpyListError';

const ITEM_HEIGHT = imageWrapper.height + 2 * metrics.mediumSize;

const News = ({ navigation }: NewsStackProps) => {
  const {
    shouldShowListBottomReloadButton,
    shouldShowListTopReloadButton,
    onPressFooterReloadButton,
    shouldShowEmptyListAdvice,
    onPressHeaderIconButton,
    onPressTopReloadButton,
    hasPaginationError,
    articleLanguage,
    onEndReached,
    isPaginating,
    articles,
    isLoading,
    error,
  } = useNews({ navigation });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={onPressHeaderIconButton}
          disabled={isLoading}
          withMarginRight
          iconName="tune"
        />
      ),
    });
  }, [isLoading]);

  if (isLoading) {
    return <NewsLoading />;
  }

  if (shouldShowEmptyListAdvice) {
    return <EmtpyListError />;
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={() => shouldShowListTopReloadButton && (
        <PaginatedListHeader
          onPress={onPressTopReloadButton}
        />
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
            withRTL={articleLanguage === SchemaTypes.ArticleLanguage.AR}
            date={item.publishedAt}
            source={item.source}
            image={item.image}
            text={item.title}
            url={item.url}
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
      {!!error && (
      <PopupAdvice
        text={error}
      />
      )}
    </>
  );
};

export default News;
