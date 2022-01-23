import React, {useMemo} from 'react';
import {Platform, FlatList} from 'react-native';

import PaginatedListHeader from '@components/common/paginated-list-header/PaginatedListHeader';
import LoadingMediaSearch from '@components/common/full-media-list-item/LoadingFullMediaList';
import MediaSearchListItem from '@components/common/full-media-list-item/FullMediaListItem';
import ListFooterComponent from '@components/common/pagination-footer/PaginationFooter';
import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

type MediaSearchItem =
  | SchemaTypes.SearchTVShow_search_items_BaseTVShow
  | SchemaTypes.SearchMovie_search_items_BaseMovie;

type MediaSearchProps = Types.BaseSearchProps & {
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
}: MediaSearchProps) => {
  const shouldShowHeaderReloadButton = useMemo(
    (): boolean => !items.length && !!errorMessage && !isLoading,
    [items.length, errorMessage, isLoading],
  );

  if (isLoading) {
    return <LoadingMediaSearch />;
  }

  return (
    <FlatList
      ListHeaderComponent={() =>
        shouldShowHeaderReloadButton && (
          <PaginatedListHeader onPress={onPressHeaderReloadButton} />
        )
      }
      ListFooterComponent={() =>
        !!items.length && (
          <ListFooterComponent
            onPressReloadButton={onPressFooterReloadButton}
            hasError={hasPaginationError}
            isPaginating={isPaginating}
          />
        )
      }
      onEndReachedThreshold={Platform.select({
        android: 0.5,
        ios: 0.1,
      })}
      renderItem={({item}) => (
        <MediaSearchListItem
          onPressDetails={() => onPressListItem(item)}
          voteCount={item.voteCount}
          votes={item.voteAverage}
          image={item.posterPath}
          genres={item.genreIds}
          title={item.title}
        />
      )}
      keyExtractor={({id}) => `${id}`}
      onEndReached={onEndReached}
      testID="search-media-list"
      data={items}
    />
  );
};

export default MediaSearch;
