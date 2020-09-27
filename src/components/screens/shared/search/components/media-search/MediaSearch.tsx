import React, { useMemo } from 'react';
import { Platform, FlatList } from 'react-native';

import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import {
  SearchTVShow_search_items_BaseTVShow as SearchTVShowResult,
  SearchMovie_search_items_BaseMovie as SearchMovieResult,
} from 'types/schema';
import PaginatedListHeader from 'components/common/PaginatedListHeader';
import { BaseSearchProps } from 'types';

import MediaSearchListItem from './MediaSerachListItem';
import LoadingMediaSearch from './LoadingMediaSearch';

type MediaSearchItem = SearchTVShowResult | SearchMovieResult;

type Props = BaseSearchProps & {
  onPressListItem: (item: MediaSearchItem) => void;
  items: MediaSearchItem[];
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
      testID="search-media-list"
      data={items}
    />
  );
};

export default MediaSearch;
