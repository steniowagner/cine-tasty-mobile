import React, {useLayoutEffect} from 'react';
import {FlatList, Platform} from 'react-native';

import PaginatedListHeader from '@components/common/paginated-list-header/PaginatedListHeader';
import ListFooterComponent from '@components/common/pagination-footer/PaginationFooter';
import HeaderIconButton from '@components/common/header-icon-button/HeaderIconButton';
import PopupAdvice from '@components/common/popup-advice/PopupAdvice';
import Advise from '@components/common/advise/Advise';
import * as SchemaTypes from '@schema-types';
import metrics from '@styles/metrics';

import {imageWrapper} from './list-item/NewsListItem.styles';
import {NewsStackProps} from '../routes/route-params-types';
import NewsLoading from './loading-list/NewsLoading';
import NewsListItem from './list-item/NewsListItem';
import useNews from './useNews';

const LIST_ITEM_HEIGHT = imageWrapper.height + 2 * metrics.mediumSize;

export const INITIAL_ITEMS_TO_RENDER =
  Math.floor(metrics.height / LIST_ITEM_HEIGHT) - 1;

const News = (props: NewsStackProps) => {
  const news = useNews({navigation: props.navigation});

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={news.onPressHeaderIconButton}
          disabled={news.isLoading}
          withMarginRight
          iconName="tune"
        />
      ),
    });
  }, [
    news.onPressHeaderIconButton,
    props.navigation.setOptions,
    news.isLoading,
  ]);

  if (news.isLoading) {
    return <NewsLoading />;
  }

  if (news.shouldShowEmptyListAdvice) {
    return (
      <Advise
        description={news.adviseTexts.description}
        suggestion={news.adviseTexts.suggestion}
        title={news.adviseTexts.title}
        icon="alert-box"
      />
    );
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={() =>
          news.shouldShowListTopReloadButton && (
            <PaginatedListHeader onPress={news.onPressTopReloadButton} />
          )
        }
        ListFooterComponent={() =>
          news.shouldShowPaginationFooter && (
            <ListFooterComponent
              onPressReloadButton={news.onPressFooterReloadButton}
              hasError={news.hasPaginationError}
              isPaginating={news.isPaginating}
            />
          )
        }
        renderItem={({item}) => (
          <NewsListItem
            withRTL={news.language === SchemaTypes.ArticleLanguage.AR}
            date={item.publishedAt}
            source={item.source}
            image={item.image}
            text={item.title}
            url={item.url}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        initialNumToRender={INITIAL_ITEMS_TO_RENDER + 1}
        onEndReachedThreshold={Platform.select({
          android: 0.5,
          ios: 0.1,
        })}
        getItemLayout={(_, index) => ({
          offset: LIST_ITEM_HEIGHT * index,
          length: LIST_ITEM_HEIGHT,
          index,
        })}
        bounces={!!news.articles.length}
        onEndReached={news.onEndReached}
        data={news.articles}
        testID="news-list"
      />
      {!!news.error && <PopupAdvice text={news.error} />}
    </>
  );
};

export default News;
