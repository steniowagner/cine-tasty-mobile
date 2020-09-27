import React, { useMemo } from 'react';
import { Platform, FlatList } from 'react-native';

import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import { SearchMovie_search_items_BaseMovie as SearchMovieResult } from 'types/schema';
import PaginatedListHeader from 'components/common/PaginatedListHeader';
import { BaseSearchProps } from 'types';

import MediaSearchListItem from './MediaSerachListItem';
import LoadingMediaSearch from './LoadingMediaSearch';

type Props = BaseSearchProps & {
  onPressListItem: (item: SearchMovieResult) => void;
  items: SearchMovieResult[];
};

const MediaSearch = ({
  onPressHeaderReloadButton,
  onPressFooterReloadButton,
  hasPaginationError,
  onPressListItem,
  onEndReached,
  errorMessage,
  isPaginating,
  isLoading,
  items,
}: Props) => {
  console.log(items);
  console.log(isLoading);
  if (isLoading) {
    return <LoadingMediaSearch />;
  }

  const shouldShowHeaderReloadButton = useMemo(
    (): boolean => !items.length && !!errorMessage && !isLoading,
    [items.length, errorMessage, isLoading],
  );

  return (
    <FlatList
      ListHeaderComponent={() => shouldShowHeaderReloadButton && (
      <PaginatedListHeader
        onPress={onPressHeaderReloadButton}
      />
      )}
      ListFooterComponent={() => !!items.length && (
      <ListFooterComponent
        onPressReloadButton={onPressFooterReloadButton}
        hasError={hasPaginationError}
        isPaginating={isPaginating}
      />
      )}
      onEndReachedThreshold={Platform.select({
        android: 0.5,
        ios: 0.1,
      })}
      renderItem={({ item }) => (
        <MediaSearchListItem
          onPressDetails={() => onPressListItem(item)}
          votes={item.voteAverage}
          image={item.posterPath}
          genres={item.genreIds}
          title={item.title}
        />
      )}
      keyExtractor={({ id }) => `${id}`}
      onEndReached={onEndReached}
      testID="search-movies-list"
      data={items}
    />
  );
};

export default MediaSearch;
