import React, { useCallback, useEffect } from 'react';
import { FlatList, Platform } from 'react-native';

import {
  PaginatedListHeader,
  PaginatedListFooter,
  HeaderIconButton,
} from '@/components/common';

import { TrendingFamousListItem } from './components/trending-famous-list-item/TrendingFamousListItem';
import { useTrendingFamous } from './use-trending-famous';
import { FamousNavigationProp } from '../../routes/route-params-types';
import * as Styles from './TrendingFamous.styles';
import { LoadingTrendingFamous } from './components/loading-trending-famous/LoadingTrendingFamous';

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
    return <LoadingTrendingFamous />;
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
      numColumns={Styles.NUMBER_OF_COLUMNS}
      renderItem={({ item }) => (
        <TrendingFamousListItem
          onPress={() => trendingFamous.onPressFamous(item)}
          image={item.profilePath || ''}
          title={item.name || '-'}
        />
      )}
      onEndReached={trendingFamous.onEndReached}
      keyExtractor={({ id }) => `${id}`}
      testID="trending-famous-list"
      data={trendingFamous.items}
    />
  );
};
