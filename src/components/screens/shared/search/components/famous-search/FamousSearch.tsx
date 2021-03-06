import React from 'react';
import { Platform, FlatList } from 'react-native';

import { DEFAULT_LIST_ITEM_HEIGHT } from 'components/common/famous-list-item/getWrapperMeasures';
import { SearchPerson_search_items_BasePerson as SearchPersonResult } from 'types/schema';
import LoadingFamousList from 'components/common/loading-famous-list/LoadingFamousList';
import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import FamousListItem from 'components/common/famous-list-item/FamousListItem';
import PaginatedListHeader from 'components/common/PaginatedListHeader';
import { BaseSearchProps } from 'types';
import metrics from 'styles/metrics';

const NUMBER_FLATLIST_COLUMNS = 3;

type Props = BaseSearchProps & {
  onPressListItem: (item: SearchPersonResult) => void;
  items: SearchPersonResult[];
};

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
}: Props) => {
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
      ListFooterComponent={() => !!items.length && (
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
        <FamousListItem
          numberOfColumns={NUMBER_FLATLIST_COLUMNS}
          onPress={() => onPressListItem(item)}
          image={item.image}
          title={item.title}
          index={index}
        />
      )}
      keyExtractor={({ id }) => `${id}`}
      onEndReached={onEndReached}
      testID="search-famous-list"
      data={items}
    />
  );
};

export default FamousSearch;
