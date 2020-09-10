import React from 'react';
import { Platform, FlatList } from 'react-native';

import { DEFAULT_LIST_ITEM_HEIGHT } from 'components/common/famous-list-item/getWrapperMeasures';
import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import LoadingFamousList from 'components/common/loading-famous-list/LoadingFamousList';
import DefaultListItem from 'components/common/famous-list-item/FamousListItem';
import PaginatedListHeader from 'components/common/PaginatedListHeader';
import metrics from 'styles/metrics';
import { SearchProps } from 'types';

const NUMBER_FLATLIST_COLUMNS = 3;

const FamousSearch = ({
  onPressHeaderReloadButton,
  onPressFooterReloadButton,
  hasPaginationError,
  onPressListItem,
  onEndReached,
  errorMessage,
  isPaginating,
  isLoading,
  items,
}: SearchProps) => {
  if (isLoading) {
    return (
      <LoadingFamousList
        numberOfColumns={NUMBER_FLATLIST_COLUMNS}
      />
    );
  }

  const shouldShowHeaderReloadButton = !items.length && !!errorMessage && !isLoading;

  return (
    <FlatList
      ListHeaderComponent={() => shouldShowHeaderReloadButton && (
      <PaginatedListHeader
        onPress={onPressHeaderReloadButton}
      />
      )}
      ListFooterComponent={() => items.length > 0 && (
      <ListFooterComponent
        onPressReloadButton={onPressFooterReloadButton}
        hasError={hasPaginationError}
        isPaginating={isPaginating}
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
        <DefaultListItem
          numberOfColumns={NUMBER_FLATLIST_COLUMNS}
          onPress={() => onPressListItem(item)}
          image={item.image}
          title={item.title}
          index={index}
        />
      )}
      keyExtractor={({ id }) => `${id}`}
      onEndReached={onEndReached}
      testID="search-list"
      data={items}
    />
  );
};

export default FamousSearch;
