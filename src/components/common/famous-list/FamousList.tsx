import React from 'react';
import {Platform, FlatList} from 'react-native';

import * as Types from '@local-types';
import {PaginatedListHeader, PaginationFooter} from '@components';

import {LoadingFamous} from './loading-famous/LoadingFamous';
import {useFamousList} from './useFamousList';
import {FamousListItem} from './famous-list-item/FamousListItem';
import Styles from './FamousList.styles';

export const NUMBER_OF_COLUMNS = 3;

export type FamousListProps = {
  beforePressItem?: (famous: Types.Famous) => unknown;
  onPressBottomReloadButton: () => void;
  onPressTopReloadButton: () => void;
  hasPaginationError?: boolean;
  onEndReached: () => void;
  famous: Types.Famous[];
  isPaginating: boolean;
  isLoading: boolean;
  error?: string;
};

export const FamousList = (props: FamousListProps) => {
  const famousList = useFamousList({
    hasPaginationError: props.hasPaginationError,
    beforePressItem: props.beforePressItem,
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
          <PaginationFooter
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
        <FamousListItem
          onPress={() => famousList.onPressFamousListItem(item)}
          image={item.profileImage}
          title={item.name}
          index={index}
        />
      )}
      onEndReached={props.onEndReached}
      keyExtractor={({id}) => `${id}`}
      testID="famous-list"
      data={props.famous}
    />
  );
};
