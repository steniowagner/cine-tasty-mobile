/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import { Platform, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { DEFAULT_LIST_ITEM_HEIGHT } from 'components/common/famous-list-item/getWrapperMeasures';
import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import DefaultListItem from 'components/common/famous-list-item/FamousListItem';
import CustomRefreshControl from 'components/common/CustomRefreshControl';
import { SEARCH_PERSON } from 'components/screens/shared/search/queries';
import PaginatedListHeader from 'components/common/PaginatedListHeader';
import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import HeaderIconButton from 'components/common/HeaderIconButton';
import { SearchType } from 'types/schema';
import metrics from 'styles/metrics';

import LoadingFamousList from '../../../common/loading-famous-list/LoadingFamousList';
import { FamousStackParams } from '../routes/route-params-types';
import useFamous from './useFamous';

export const NUMBER_FLATLIST_COLUMNS = 3;

type FamousScreenNavigationProp = StackNavigationProp<FamousStackParams, 'FAMOUS'>;

type Props = {
  navigation: FamousScreenNavigationProp;
};

const Famous = ({ navigation }: Props) => {
  const {
    onPressBottomReloadButton,
    onPressTopReloadButton,
    onPullRefreshControl,
    hasPaginationError,
    isPaginating,
    onEndReached,
    isRefreshing,
    isLoading,
    famous,
    error,
  } = useFamous();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={() => navigation.navigate('SEARCH', {
            i18nQueryByPaginationErrorRef:
                'translations:famous:i18nQueryByPaginationErrorRef',
            i18nSearchBarPlaceholderRef: 'translations:famous:searchBarPlaceholder',
            i18nQueryByTextErrorRef: 'translations:famous:i18nQueryByTextErrorRef',
            searchType: SearchType.PERSON,
            query: SEARCH_PERSON,
          })}
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
        refreshControl={(
          <CustomRefreshControl
            onRefresh={onPullRefreshControl}
            refreshing={isRefreshing}
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
        getItemLayout={(_, index: number) => ({
          length: DEFAULT_LIST_ITEM_HEIGHT,
          offset: DEFAULT_LIST_ITEM_HEIGHT * Math.floor(index / NUMBER_FLATLIST_COLUMNS),
          index,
        })}
        numColumns={NUMBER_FLATLIST_COLUMNS}
        renderItem={({ item, index }) => (
          <DefaultListItem
            onPress={() => navigation.navigate('FAMOUS_DETAIL', {
              id: item.id,
            })}
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
