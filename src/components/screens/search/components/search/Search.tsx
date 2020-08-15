/* eslint-disable react/display-name */

import React, { useLayoutEffect, useCallback } from 'react';
import { Platform, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { DEFAULT_LIST_ITEM_HEIGHT } from 'components/common/famous-list-item/getWrapperMeasures';
import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import DefaultListItem from 'components/common/famous-list-item/FamousListItem';
import PaginatedListHeader from 'components/common/PaginatedListHeader';
import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import LoadingIndicator from 'components/common/LoadingIndicator';
import SearchBar from 'components/common/searchbar/SearchBar';
import { SearchType } from 'types/schema';
import metrics from 'styles/metrics';
import { SearchItem } from 'types';

import { SearchStackParams } from '../../routes/route-params-types';
import useSearch from './use-search/useSearch';

const NUMBER_FLATLIST_COLUMNS = 3;

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParams, 'SEARCH'>;

type SearchScreenRouteProp = RouteProp<SearchStackParams, 'SEARCH'>;

type Props = {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
};

const Search = ({ navigation, route }: Props) => {
  const {
    onPressFooterReloadButton,
    onPressHeaderReloadButton,
    hasPaginationError,
    onTypeSearchQuery,
    onEndReached,
    isPaginating,
    errorMessage,
    isLoading,
    items,
    t,
  } = useSearch({
    i18nQueryByPaginationErrorRef: route.params.i18nQueryByPaginationErrorRef,
    i18nQueryByTextErrorRef: route.params.i18nQueryByTextErrorRef,
    searchType: route.params.searchType,
    query: route.params.query,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <SearchBar
          placeholder={t(route.params.i18nSearchBarPlaceholderRef)}
          onPressClose={() => navigation.goBack()}
          onTypeSearchQuery={onTypeSearchQuery}
        />
      ),
    });
  }, [onTypeSearchQuery]);

  const onPressListItem = useCallback((item: SearchItem): void => {
    if (route.params.searchType === SearchType.MOVIE) {
      console.warn('Go to MOVIE-DETAIL-SCREEN', item.title);
    }

    if (route.params.searchType === SearchType.PERSON) {
      console.warn('Go to PERSON-DETAIL-SCREEN', item.title);
    }

    if (route.params.searchType === SearchType.TV) {
      console.warn('Go to Tv-DETAIL-SCREEN', item.title);
    }
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const shouldShowListTopReloadButton = !items.length && !!errorMessage && !isLoading;

  return (
    <>
      <FlatList
        ListHeaderComponent={() => shouldShowListTopReloadButton && (
        <PaginatedListHeader
          onPress={onPressHeaderReloadButton}
        />
        )}
        ListFooterComponent={() => (
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
          <DefaultListItem
            onPress={() => onPressListItem(item)}
            numberOfColumns={NUMBER_FLATLIST_COLUMNS}
            image={item.image}
            title={item.title}
            index={index}
          />
        )}
        keyExtractor={({ id }) => `${id}`}
        onEndReached={onEndReached}
        testID="search-list"
        data={items}
      />
      {!!errorMessage && (
      <PopupAdvice
        text={errorMessage}
      />
      )}
    </>
  );
};

export default Search;
