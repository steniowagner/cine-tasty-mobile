import React, {useEffect} from 'react';
import {FlatList, Platform} from 'react-native';

import {
  PaginatedListHeader,
  PaginationFooter,
  HeaderIconButton,
  Advise,
} from '@components';
import * as SchemaTypes from '@schema-types';
import metrics from '@styles/metrics';

import {LanguagesFilterModal} from './language-filter-modal/LanguagesFilterModal';
import {LIST_ITEM_HEIGHT} from './News.style';
import {NewsStackProps} from '../routes/route-params-types';
import NewsLoading from './loading-list/NewsLoading';
import NewsListItem from './list-item/NewsListItem';
import {useNews} from './useNews';

export const INITIAL_ITEMS_TO_RENDER =
  Math.floor(metrics.height / LIST_ITEM_HEIGHT) - 1;

export const News = (props: NewsStackProps) => {
  const news = useNews();

  useEffect(() => {
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
  }, [news.isLoading]);

  if (news.isLoading) {
    return <NewsLoading />;
  }

  if (news.shouldShowEmptyListAdvice) {
    return (
      <>
        <LanguagesFilterModal
          onSelectLanguage={news.setLanguageSelected}
          isOpen={news.isLanguageModalOpen}
          onCloseModal={news.onCloseModal}
          languageSelected={news.languageSelected}
        />
        <Advise
          description={news.texts.advice.description}
          suggestion={news.texts.advice.suggestion}
          title={news.texts.advice.title}
          icon="alert-box"
        />
      </>
    );
  }

  return (
    <>
      <LanguagesFilterModal
        onSelectLanguage={news.setLanguageSelected}
        isOpen={news.isLanguageModalOpen}
        onCloseModal={news.onCloseModal}
        languageSelected={news.languageSelected}
      />
      <FlatList
        ListHeaderComponent={() =>
          news.shouldShowListTopReloadButton && (
            <PaginatedListHeader onPress={news.onPressTopReloadButton} />
          )
        }
        ListFooterComponent={() =>
          news.shouldShowPaginationFooter && (
            <PaginationFooter
              onPressReloadButton={news.onPressFooterReloadButton}
              hasError={news.hasPaginationError}
              isPaginating={news.isPaginating}
            />
          )
        }
        renderItem={({item}) => (
          <NewsListItem
            withRTL={news.languageSelected === SchemaTypes.ArticleLanguage.AR}
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
    </>
  );
};
