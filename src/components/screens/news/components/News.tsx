/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import { FlatList, Platform } from 'react-native';

import PaginatedListHeader from '@components/common/paginated-list-header/PaginatedListHeader';
import ListFooterComponent from '@components/common/pagination-footer/PaginationFooter';
import HeaderIconButton from '@components/common/header-icon-button/HeaderIconButton';
import PopupAdvice from '@components/common/popup-advice/PopupAdvice';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';
import metrics from '@styles/metrics';
import * as Types from '@local-types';

import { imageWrapper } from './list-item/NewsListItem.styles';
import { NewsStackProps } from '../routes/route-params-types';
import NewsLoading from './loading-list/NewsLoading';
import NewsListItem from './list-item/NewsListItem';
import EmtpyListError from './EmtpyListError';
import useNews from './useNews';

export const INITIAL_ITEMS_TO_RENDER = Math.floor(metrics.height / imageWrapper.height) - 1;

const ITEM_HEIGHT = imageWrapper.height + 2 * metrics.mediumSize;

const News = (props: NewsStackProps) => {
  const news = useNews();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={() => props.navigation.navigate(Routes.CustomModal.CUSTOM_MODAL, {
            type: Types.CustomizedModalChildrenType.LANGUAGE,
            headerText: news.t(TRANSLATIONS.NEWS_FILTER_MESSAGE),
            extraData: {
              onPressSelect: news.onSelectArticleLanguage,
              lastItemSelected: news.articleLanguage,
            },
          })}
          disabled={news.isLoading}
          withMarginRight
          iconName="tune"
        />
      ),
    });
  }, [news.isLoading]);

  if (news.isLoading) {
    return <NewsLoading />;
  }

  const shouldShowEmptyListAdvice = !news.isLoading && !news.error && !news.articles.length;

  if (shouldShowEmptyListAdvice) {
    return <EmtpyListError />;
  }

  const shouldShowListTopReloadButton = !news.articles.length && !!news.error && !news.isLoading;
  const shouldShowListBottomReloadButton = !!news.articles.length && (news.hasPaginationError || news.isPaginating);

  return (
    <>
      <FlatList
        ListHeaderComponent={() => shouldShowListTopReloadButton && (
        <PaginatedListHeader
          onPress={news.onPressTopReloadButton}
        />
        )}
        ListFooterComponent={() => shouldShowListBottomReloadButton && (
        <ListFooterComponent
          onPressReloadButton={news.onPressFooterReloadButton}
          hasError={news.hasPaginationError}
          isPaginating={news.isPaginating}
        />
        )}
        renderItem={({ item }) => (
          <NewsListItem
            withRTL={news.articleLanguage === SchemaTypes.ArticleLanguage.AR}
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
        bounces={!!news.articles.length}
        onEndReached={news.onEndReached}
        testID="news-list"
        data={news.articles}
      />
      {!!news.error && (
      <PopupAdvice
        text={news.error}
      />
      )}
    </>
  );
};

export default News;
