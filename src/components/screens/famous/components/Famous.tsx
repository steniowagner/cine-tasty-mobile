/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { Platform, FlatList } from 'react-native';

import PaginatedListHeader from '@components/common/paginated-list-header/PaginatedListHeader';
import ListFooterComponent from '@components/common/pagination-footer/PaginationFooter';
import HeaderIconButton from '@components/common/header-icon-button/HeaderIconButton';
import DefaultListItem from '@components/common/famous-list-item/FamousListItem';
import PopupAdvice from '@components/common/popup-advice/PopupAdvice';

import metrics from '@styles/metrics';

import LoadingFamousList from '../../../common/loading-famous-list/LoadingFamousList';
import { FamousStackProps } from '../routes/route-params-types';
import useFamousPressHandlers from './useFamousPressHandlers';
import useFamous from './useFamous';

export const NUMBER_FLATLIST_COLUMNS = 3;

const Famous = ({ navigation }: FamousStackProps) => {
  const {
    onPressBottomReloadButton,
    onPressTopReloadButton,
    hasPaginationError,
    isPaginating,
    onEndReached,
    isLoading,
    famous,
    error,
  } = useFamous();

  const { onPressHeaderIconButton, onPressFamousListItem } = useFamousPressHandlers({
    navigation,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={onPressHeaderIconButton}
          iconName="magnify"
          withMarginRight
        />
      ),
    });
  }, []);

  if (isLoading) {
    return (
      <LoadingFamousList
        numberOfColumns={NUMBER_FLATLIST_COLUMNS}
      />
    );
  }

  const shouldShowListTopReloadButton = !famous.length && !!error && !isLoading;
  const shouldShowListBottomReloadButton = !!famous.length && (hasPaginationError || isPaginating);

  return (
    <>
      <FlatList
        testID="famous-list"
        ListHeaderComponent={() => shouldShowListTopReloadButton && (
        <PaginatedListHeader
          onPress={onPressTopReloadButton}
        />
        )}
        ListFooterComponent={() => shouldShowListBottomReloadButton && (
        <ListFooterComponent
          onPressReloadButton={onPressBottomReloadButton}
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
        numColumns={NUMBER_FLATLIST_COLUMNS}
        renderItem={({ item, index }) => (
          <DefaultListItem
            onPress={() => onPressFamousListItem(item)}
            numberOfColumns={NUMBER_FLATLIST_COLUMNS}
            image={item.profilePath}
            title={item.name}
            index={index}
          />
        )}
        keyExtractor={({ id }, index) => `${id}-${index}`}
        onEndReached={onEndReached}
        data={famous}
      />
      {!!error && (
      <PopupAdvice
        text={error}
      />
      )}
    </>
  );
};

export default Famous;
