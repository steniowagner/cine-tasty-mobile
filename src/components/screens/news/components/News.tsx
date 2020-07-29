/* eslint-disable react/display-name */

import React from 'react';
import { FlatList, Platform } from 'react-native';
// import styled from 'styled-components';

import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import CustomRefreshControl from 'components/common/CustomRefreshControl';
import LoadingIndicator from 'components/common/LoadingIndicator';
// import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';

import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
// import LanguageFilter from './language-filter/LanguageFilter';
import { imageWrapper } from './list-item/common-styles';
import NewsListItem from './list-item/NewsListItem';
import useNews from './useNews';

/*  FilterIcon = styled(Icon).attrs(({ theme }) => ({
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

const LOADING_ITEMS = Array.from({ length: INITIAL_ITEMS_TO_RENDER }, (_, index) => ({
  id: `${index}`,
}));
*/
const ITEM_HEIGHT = imageWrapper.height + 2 * metrics.mediumSize;

export const INITIAL_ITEMS_TO_RENDER = Math.floor(metrics.height / imageWrapper.height) - 1;

type Props = {
  navigation: any;
};

const News = () => {
  const {
    onPullRefreshControl,
    onPressReloadButton,
    hasPaginationError,
    onEndReached,
    isRefreshing,
    isPaginating,
    isLoading,
    articles,
    error,
  } = useNews();

  /* useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        !isLoading &&
        !error && (
          <FilterButton onPress={() => console.log('setIsFilterLanguageModalOpen(true)')}>
            <FilterIcon />
          </FilterButton>
        ),
    });
  }, [isLoading, error]); */

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
            withRTL={false} // languageFilter === ArticleLanguage.AR
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
      {/* isFilterLanguageModalOpen && (
        <LanguageFilter
          onCloseModal={() => setIsFilterLanguageModalOpen(false)}
          onSelectLanguage={onSelectLanguageFilter}
          lastLanguageSelected={languageFilter}
        />
      ) */}
      {!!error && (
      <PopupAdvice
        onFinishToShow={() => {}}
        text={error}
      />
      )}
    </>
  );
};

export default News;
