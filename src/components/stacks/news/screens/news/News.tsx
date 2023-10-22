import React, { useEffect, useMemo } from 'react';
import { FlatList, Platform } from 'react-native';

import {
  HeaderIconButton,
  PaginatedListFooter,
  PaginatedListHeader,
  Advice,
} from '@/components/common';
import metrics from '@/styles/metrics';

import { LanguagesFilterModal } from './components/languages-filter-modal/LanguagesFilterModal';
import { NewsStackProps } from '../../routes/route-params-types';
import { NewsListItem } from './components/news-list-item/NewsListItem';
import { NewsLoading } from './components/news-loading/NewsLoading';
import * as Styles from './News.styles';
import { useNews } from './use-news';

export const INITIAL_ITEMS_TO_RENDER =
  Math.floor(metrics.height / Styles.LIST_ITEM_HEIGHT) - 1;

export const News = (props: NewsStackProps) => {
  const news = useNews();

  useEffect(() => {
    props.navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <HeaderIconButton
          onPress={news.onPressHeaderCTA}
          disabled={news.isLoading}
          withMarginRight
          iconName="tune"
        />
      ),
    });
  }, [news.isLoading]);

  const ListHeaderComponent = useMemo(
    () =>
      news.shouldShowListTopReloadButton ? (
        <PaginatedListHeader onPress={news.onPressTopReloadButton} />
      ) : undefined,
    [news.shouldShowListTopReloadButton, news.onPressTopReloadButton],
  );

  const ListFooterComponent = useMemo(
    () =>
      news.shouldShowPaginationFooter ? (
        <PaginatedListFooter
          onPressReloadButton={news.onPressFooterReloadButton}
          hasError={news.hasPaginationError}
          isPaginating={news.isPaginating}
        />
      ) : undefined,
    [
      news.onPressFooterReloadButton,
      news.hasPaginationError,
      news.isPaginating,
      news.shouldShowPaginationFooter,
    ],
  );

  if (news.isLoading) {
    return <NewsLoading />;
  }

  if (news.shouldShowEmptyListAdvice) {
    return (
      <>
        <LanguagesFilterModal
          onSelectLanguage={news.setLanguageSelected}
          isOpen={news.isLanguageFilterModalOpen}
          onCloseModal={news.onCloseModal}
          languageSelected={news.languageSelected}
        />
        <Advice
          description={news.texts.advice.description}
          suggestion={news.texts.advice.suggestion}
          title={news.texts.advice.title}
          icon="magnify-off"
        />
      </>
    );
  }

  return (
    <>
      <LanguagesFilterModal
        onSelectLanguage={news.setLanguageSelected}
        isOpen={news.isLanguageFilterModalOpen}
        onCloseModal={news.onCloseModal}
        languageSelected={news.languageSelected}
      />
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        renderItem={({ item }) => (
          <NewsListItem
            date={item.publishedAt ?? '-'}
            source={item.source ?? '-'}
            image={item.image ?? '-'}
            text={item.title ?? '-'}
            url={item.url ?? '-'}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        initialNumToRender={INITIAL_ITEMS_TO_RENDER + 1}
        onEndReachedThreshold={Platform.select({
          android: 0.5,
          ios: 0.1,
        })}
        getItemLayout={(_, index) => ({
          offset: Styles.LIST_ITEM_HEIGHT * index,
          length: Styles.LIST_ITEM_HEIGHT,
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
