/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { Platform, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import ListFooterComponent from '@components/common/pagination-footer/PaginationFooter';
import DefaultListItem from '@components/common/famous-list-item/FamousListItem';
import PaginatedListHeader from '@components/common/PaginatedListHeader';
import PopupAdvice from '@components/common/popup-advice/PopupAdvice';
import HeaderIconButton from '@components/common/HeaderIconButton';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

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
    hasPaginationError,
    isPaginating,
    onEndReached,
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
                TRANSLATIONS.FAMOUS_QUERY_BY_PAGINATION_ERROR,
            i18nSearchBarPlaceholderRef: TRANSLATIONS.FAMOUS_SEARCHBAR_PLACEHOLDER,
            i18nQueryByTextErrorRef: TRANSLATIONS.FAMOUS_QUERY_BY_TEXT_ERROR,
            searchType: SchemaTypes.SearchType.PERSON,
            queryId: 'search_famous',
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
        /* getItemLayout={(_, index: number) => ({
          length: DEFAULT_LIST_ITEM_HEIGHT,
          offset: DEFAULT_LIST_ITEM_HEIGHT * Math.floor(index / NUMBER_FLATLIST_COLUMNS),
          index,
        })} */
        numColumns={NUMBER_FLATLIST_COLUMNS}
        renderItem={({ item, index }) => (
          <DefaultListItem
            onPress={() => navigation.navigate('FAMOUS_DETAIL', {
              profileImage: item.profilePath,
              name: item.name,
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
