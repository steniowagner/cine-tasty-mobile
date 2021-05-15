/* eslint-disable camelcase */
import React from 'react';
import { Platform, FlatList } from 'react-native';

import { DEFAULT_LIST_ITEM_HEIGHT } from '@components/common/famous-list-item/getWrapperMeasures';
import PaginatedListHeader from '@components/common/paginated-list-header/PaginatedListHeader';
import LoadingFamousList from '@components/common/loading-famous-list/LoadingFamousList';
import ListFooterComponent from '@components/common/pagination-footer/PaginationFooter';
import FamousListItem from '@components/common/famous-list-item/FamousListItem';
import * as SchemaTypes from '@schema-types';
import metrics from '@styles/metrics';
import * as Types from '@local-types';

const NUMBER_FLATLIST_COLUMNS = 3;

type FamousSearchProps = Types.BaseSearchProps & {
  onPressListItem: (item: SchemaTypes.SearchPerson_search_items_BasePerson) => void;
  items: SchemaTypes.SearchPerson_search_items_BasePerson[];
};

const FamousSearch = (props: FamousSearchProps) => {
  if (props.isLoading) {
    return (
      <LoadingFamousList
        numberOfColumns={NUMBER_FLATLIST_COLUMNS}
      />
    );
  }

  const shouldShowHeaderReloadButton = !props.items.length && !!props.errorMessage && !props.isLoading;

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
      columnWrapperStyle={{
        paddingLeft: metrics.smallSize,
      }}
      contentContainerStyle={{
        paddingTop: metrics.mediumSize,
        paddingBottom: metrics.mediumSize,
      }}
      onEndReachedThreshold={Platform.select({
        android: 0.5,
        ios: 0.1,
      })}
      getItemLayout={(_, index: number) => ({
        length: DEFAULT_LIST_ITEM_HEIGHT,
        offset: DEFAULT_LIST_ITEM_HEIGHT * Math.floor(index / NUMBER_FLATLIST_COLUMNS),
        index,
      })}
      numColumns={NUMBER_FLATLIST_COLUMNS}
      renderItem={({ item, index }) => (
        <FamousListItem
          numberOfColumns={NUMBER_FLATLIST_COLUMNS}
          onPress={() => props.onPressListItem(item)}
          image={item.image}
          title={item.title}
          index={index}
        />
      )}
      keyExtractor={({ id }) => `${id}`}
      onEndReached={props.onEndReached}
      testID="search-famous-list"
      data={props.items}
    />
  );
};

export default FamousSearch;
