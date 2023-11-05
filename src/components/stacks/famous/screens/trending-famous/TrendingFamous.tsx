import React, { useCallback, useEffect } from 'react';
import { FlatList, Platform } from 'react-native';

import {
  DefaultTMDBListLoading,
  PaginatedListHeader,
  PaginatedListFooter,
  HeaderIconButton,
  DefaultTMDBListItem,
} from '@/components/common';

import { useTrendingFamous } from './use-trending-famous';
import { FamousNavigationProp } from '../../routes/route-params-types';
import * as Styles from './TrendingFamous.styles';

type FamousProps = {
  navigation: FamousNavigationProp;
};

export const TrendingFamous = (props: FamousProps) => {
  const trendingFamous = useTrendingFamous({
    navigation: props.navigation,
  });

  const HeaderMaginifyIconButton = useCallback(
    () => (
      <HeaderIconButton
        onPress={trendingFamous.onPressHeaderIconButton}
        iconName="magnify"
        withMarginRight
      />
    ),
    [trendingFamous.onPressHeaderIconButton],
  );

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: HeaderMaginifyIconButton,
    });
  }, [HeaderMaginifyIconButton]);

  const ListHeaderComponent = useCallback(
    (): React.ReactNode | undefined =>
      trendingFamous.shouldShowTopReloadButton && (
        <PaginatedListHeader onPress={trendingFamous.onPressTopReloadButton} />
      ),
    [
      trendingFamous.shouldShowTopReloadButton,
      trendingFamous.onPressTopReloadButton,
    ],
  );

  const ListFooterComponent = useCallback(
    (): React.ReactNode | undefined =>
      trendingFamous.shouldShowBottomReloadButton && (
        <PaginatedListFooter
          onPressReloadButton={trendingFamous.onPressBottomReloadButton}
          hasError={trendingFamous.hasPaginationError}
          isPaginating={trendingFamous.isPaginating}
        />
      ),
    [
      trendingFamous.isPaginating,
      trendingFamous.hasPaginationError,
      trendingFamous.shouldShowBottomReloadButton,
      trendingFamous.onPressBottomReloadButton,
    ],
  );

  if (trendingFamous.isLoading) {
    return <DefaultTMDBListLoading />;
  }

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={Styles.sheet.contentContainerStyle}
      onEndReachedThreshold={Platform.select({
        android: 0.5,
        ios: 0.1,
      })}
      numColumns={3}
      renderItem={({ item }) => (
        <DefaultTMDBListItem
          onPress={() => trendingFamous.onPressFamous(item)}
          image={item.profilePath || ''}
          title={item.name || '-'}
          iconImageLoading="account"
          iconImageError="image-off"
          testID="trending-famous-list-item-button"
        />
      )}
      onEndReached={trendingFamous.onEndReached}
      keyExtractor={({ id }) => `${id}`}
      testID="trending-famous-list"
      data={trendingFamous.items}
    />
  );
};
