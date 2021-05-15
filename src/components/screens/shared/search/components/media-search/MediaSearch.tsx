/* eslint-disable camelcase */
import React, { useMemo } from 'react';
import { Platform, FlatList } from 'react-native';

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

const MediaSearch = (props: MediaSearchProps) => {
  if (props.isLoading) {
    return <LoadingMediaSearch />;
  }

  const shouldShowHeaderReloadButton = useMemo(
    (): boolean => !props.items.length && !!props.errorMessage && !props.isLoading,
    [props.items.length, props.errorMessage, props.isLoading],
  );

  return (
    <FlatList
      ListHeaderComponent={() => shouldShowHeaderReloadButton && (
      <PaginatedListHeader
        onPress={props.onPressHeaderReloadButton}
      />
      )}
      ListFooterComponent={() => !!props.items.length && (
      <ListFooterComponent
        onPressReloadButton={props.onPressFooterReloadButton}
        hasError={props.hasPaginationError}
        isPaginating={props.isPaginating}
      />
      )}
      onEndReachedThreshold={Platform.select({
        android: 0.5,
        ios: 0.1,
      })}
      renderItem={({ item }) => (
        <MediaSearchListItem
          onPressDetails={() => props.onPressListItem(item)}
          voteCount={item.voteCount}
          votes={item.voteAverage}
          image={item.posterPath}
          genres={item.genreIds}
          title={item.title}
        />
      )}
      keyExtractor={({ id }) => `${id}`}
      onEndReached={props.onEndReached}
      testID="search-media-list"
      data={props.items}
    />
  );
};

export default MediaSearch;
