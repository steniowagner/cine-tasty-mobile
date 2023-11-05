import React, { useCallback, useEffect } from 'react';
import { FlatList, Platform } from 'react-native';

import {
  DefaultTMDBListItem,
  DefaultTMDBListLoading,
  PaginatedListFooter,
  PaginatedListHeader,
} from '@/components/common';

import { RecentSearches } from './components/recent-searches/RecentSearches';
import { SearchNavigationProps as SearchProps } from './types';
import { SearchBar } from './components/search-bar/SearchBar';
import { useSearch } from './use-search';
import * as Styles from './Search.styles';

export const Search = (props: SearchProps) => {
  const search = useSearch(props);

  const ListHeaderComponent = useCallback(
    (): React.ReactNode | undefined =>
      search.shouldShowTopReloadButton && (
        <PaginatedListHeader onPress={search.onPressTopReloadButton} />
      ),
    [search.shouldShowTopReloadButton, search.onPressTopReloadButton],
  );

  const ListFooterComponent = useCallback(
    (): React.ReactNode | undefined =>
      search.shouldShowBottomReloadButton && (
        <PaginatedListFooter
          onPressReloadButton={search.onPressBottomReloadButton}
          hasError={search.hasPaginationError}
          isPaginating={search.isPaginating}
        />
      ),
    [
      search.isPaginating,
      search.hasPaginationError,
      search.shouldShowBottomReloadButton,
      search.onPressBottomReloadButton,
    ],
  );

  const Header = useCallback(
    () => (
      <SearchBar
        onTypeSearchQuery={search.onTypeSearchQuery}
        onPressClose={() => props.navigation.goBack()}
        placeholder={search.placeholder}
      />
    ),
    [search.onTypeSearchQuery, search.placeholder, props.navigation.goBack],
  );

  useEffect(() => {
    props.navigation.setOptions({
      header: Header,
    });
  }, [Header]);

  if (search.shouldShowRecentSearches) {
    return (
      <RecentSearches
        searchType={props.route.params.type}
        onPressItem={search.onPressItem}
      />
    );
  }

  if (search.isLoading) {
    return <DefaultTMDBListLoading />;
  }

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={Styles.sheet.contentContainerStyle}
      onEndReachedThreshold={Platform.select({
        android: 0.5,
        ios: 0.1,
      })}
      numColumns={3}
      renderItem={({ item }) => (
        <DefaultTMDBListItem
          iconImageLoading={search.iconImageLoading}
          testID="search-item"
          iconImageError="image-off"
          onPress={() => search.onPressItem(item)}
          image={item.image || ''}
          title={item.title || '-'}
        />
      )}
      onEndReached={search.onEndReached}
      keyExtractor={({ id }) => `${id}`}
      testID="famous-list"
      data={search.items}
    />
  );
};
