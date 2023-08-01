import React, {useEffect} from 'react';
import {FlatList, Platform} from 'react-native';

import {
  PaginatedListHeader,
  PaginationFooter,
  MediaListItem,
} from '@components';

import {SearchMediaLoading} from './search-media-loading/SearchMediaLoading';
import {RecentSearches} from '../components/recent-searches/RecentSearches';
import {SearchBar} from '../components/searchbar/SearchBar';
import {
  useSearchMedia,
  UseSearchMediaProps as SearchMediaProps,
} from './useSearchMedia';
import * as Styles from './SearchMedia.styles';

export const NUMBER_OF_COLUMNS = 3;

export const SearchMedia = (props: SearchMediaProps) => {
  const searchMedia = useSearchMedia(props);

  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <SearchBar
          onTypeSearchQuery={searchMedia.onTypeSearchQuery}
          onPressClose={searchMedia.onPressClose}
          placeholder={searchMedia.placeholder}
        />
      ),
    });
  }, [searchMedia.onTypeSearchQuery]);

  if (searchMedia.shouldShowRecentSearches) {
    return (
      <RecentSearches
        onPressItem={searchMedia.onPressRecentSearchedItem}
        searchType={searchMedia.searchType}
      />
    );
  }

  if (searchMedia.isLoading) {
    return <SearchMediaLoading />;
  }

  return (
    <FlatList
      ListHeaderComponent={() =>
        searchMedia.shouldShowTopReloadButton && (
          <PaginatedListHeader onPress={searchMedia.onPressTopReloadButton} />
        )
      }
      ListFooterComponent={() =>
        searchMedia.shouldShowBottomReloadButton && (
          <PaginationFooter
            onPressReloadButton={searchMedia.onPressFooterReloadButton}
            hasError={searchMedia.hasPaginationError}
            isPaginating={searchMedia.isPaginating}
          />
        )
      }
      contentContainerStyle={Styles.sheet.contentContainerStyle}
      columnWrapperStyle={Styles.sheet.columnWrapperStyle}
      ItemSeparatorComponent={Styles.Separator}
      onEndReachedThreshold={Platform.select({
        android: 0.5,
        ios: 0.1,
      })}
      numColumns={NUMBER_OF_COLUMNS}
      renderItem={({item}) => (
        <MediaListItem
          onPress={() => searchMedia.onPressItem(item)}
          testID="search-media-item"
          layoutSize="medium"
          image={item.posterPath}
          title={item.title}
        />
      )}
      onEndReached={searchMedia.onEndReached}
      keyExtractor={item => `${item.id}`}
      data={searchMedia.items}
      testID="search-media-list"
    />
  );
};
