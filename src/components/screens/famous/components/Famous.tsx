import React, {useEffect} from 'react';
import {FlatList, Platform} from 'react-native';

import {
  HeaderIconButton,
  PaginatedListHeader,
  PaginationFooter,
} from '@components';

import {FamousListItem} from './famous-list-item/FamousListItem';
import {FamousStackProps} from '../routes/route-params-types';
import {LoadingFamous} from './loading-famous/LoadingFamous';
import {useFamous} from './useFamous';
import * as Styles from './Famous.styles';

export const Famous = (props: FamousStackProps) => {
  const famous = useFamous({navigation: props.navigation});

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={famous.onPressHeaderIconButton}
          iconName="magnify"
          withMarginRight
        />
      ),
    });
  }, [famous.onPressHeaderIconButton]);

  if (famous.isLoading) {
    return <LoadingFamous />;
  }

  return (
    <FlatList
      ListHeaderComponent={() =>
        famous.shouldShowTopReloadButton && (
          <PaginatedListHeader onPress={famous.onPressTopReloadButton} />
        )
      }
      ListFooterComponent={() =>
        famous.shouldShowBottomReloadButton && (
          <PaginationFooter
            onPressReloadButton={famous.onPressBottomReloadButton}
            hasError={famous.hasPaginationError}
            isPaginating={famous.isPaginating}
          />
        )
      }
      contentContainerStyle={Styles.sheet.contentContainerStyle}
      onEndReachedThreshold={Platform.select({
        android: 0.5,
        ios: 0.1,
      })}
      numColumns={Styles.NUMBER_OF_COLUMNS}
      renderItem={({item, index}) => (
        <FamousListItem
          onPress={() => famous.onPressFamousListItem(item)}
          image={item.profileImage}
          title={item.name}
          index={index}
        />
      )}
      onEndReached={famous.onEndReached}
      keyExtractor={({id}) => `${id}`}
      testID="famous-list"
      data={famous.dataset}
    />
  );
};
