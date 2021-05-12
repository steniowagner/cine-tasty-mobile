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

const Famous = (props: FamousStackProps) => {
  const famous = useFamous();

  const famousPressHandlers = useFamousPressHandlers({
    navigation: props.navigation,
  });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={famousPressHandlers.onPressHeaderIconButton}
          iconName="magnify"
          withMarginRight
        />
      ),
    });
  }, []);

  if (famous.isLoading) {
    return (
      <LoadingFamousList
        numberOfColumns={NUMBER_FLATLIST_COLUMNS}
      />
    );
  }

  const shouldShowListTopReloadButton = !famous.famous.length && !!famous.error && !famous.isLoading;
  const shouldShowListBottomReloadButton = !!famous.famous.length && (famous.hasPaginationError || famous.isPaginating);

  return (
    <>
      <FlatList
        testID="famous-list"
        ListHeaderComponent={() => shouldShowListTopReloadButton && (
        <PaginatedListHeader
          onPress={famous.onPressTopReloadButton}
        />
        )}
        ListFooterComponent={() => shouldShowListBottomReloadButton && (
        <ListFooterComponent
          onPressReloadButton={famous.onPressBottomReloadButton}
          hasError={famous.hasPaginationError}
          isPaginating={famous.isPaginating}
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
            onPress={() => famousPressHandlers.onPressFamousListItem(item)}
            numberOfColumns={NUMBER_FLATLIST_COLUMNS}
            image={item.profilePath}
            title={item.name}
            index={index}
          />
        )}
        keyExtractor={({ id }, index) => `${id}-${index}`}
        onEndReached={famous.onEndReached}
        data={famous.famous}
      />
      {!!famous.error && (
      <PopupAdvice
        text={famous.error}
      />
      )}
    </>
  );
};

export default Famous;
