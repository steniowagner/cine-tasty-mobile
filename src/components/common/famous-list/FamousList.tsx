import React from 'react';
import {Platform, FlatList} from 'react-native';

import PaginatedListHeader from '@components/common/paginated-list-header/PaginatedListHeader';
import DefaultListItem from '@components/common/famous-list/famous-list-item/FamousListItem';
import LoadingFamous from '@components/common/famous-list/loading-famous/LoadingFamous';
import ListFooterComponent from '@components/common/pagination-footer/PaginationFooter';
import * as Types from '@local-types';

import useFamousList from './useFamousList';
import Styles from './FamousList.styles';

export const NUMBER_OF_COLUMNS = 3;

export type FamousListProps = {
  onPressBottomReloadButton: () => void;
  onPressTopReloadButton: () => void;
  hasPaginationError?: boolean;
  onEndReached: () => void;
  famous: Types.Famous[];
  isPaginating: boolean;
  isLoading: boolean;
  error?: string;
};

const FamousList = (props: FamousListProps) => {
  const famousList = useFamousList({
    hasPaginationError: props.hasPaginationError,
    isPaginating: props.isPaginating,
    isLoading: props.isLoading,
    famous: props.famous,
    error: props.error,
  });

  if (props.isLoading) {
    return <LoadingFamous />;
  }

  return (
    <FlatList
      ListHeaderComponent={() =>
        famousList.shouldShowTopReloadButton && (
          <PaginatedListHeader onPress={props.onPressTopReloadButton} />
        )
      }
      ListFooterComponent={() =>
        famousList.shouldShowBottomReloadButton && (
          <ListFooterComponent
            onPressReloadButton={props.onPressBottomReloadButton}
            hasError={props.hasPaginationError}
            isPaginating={props.isPaginating}
          />
        )
      }
      contentContainerStyle={Styles.contentContainerStyle}
      onEndReachedThreshold={Platform.select({
        android: 0.5,
        ios: 0.1,
      })}
      numColumns={NUMBER_OF_COLUMNS}
      renderItem={({item, index}) => (
        <DefaultListItem
          onPress={() => famousList.onPressFamousListItem(item)}
          image={item.profilePath}
          title={item.name}
          index={index}
        />
      )}
      onEndReached={props.onEndReached}
      keyExtractor={({id}) => `${id}`}
      testID="famous-list"
      style={Styles.style}
      data={props.famous}
    />
  );
};

export default FamousList;
