/* eslint-disable react/display-name */

import React, { useLayoutEffect, useCallback } from 'react';
import { Platform, FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import DefaultListItem, {
  DEFAULT_LIST_ITEM_HEIGHT,
} from 'components/common/DefaultListItem';
import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import LoadingIndicator from 'components/common/LoadingIndicator';
import SearchBar from 'components/common/searchbar/SearchBar';
import { SearchType } from 'types/schema';
import metrics from 'styles/metrics';
import { SearchItem } from 'types';

import { SearchStackParams } from '../../routes/route-params-types';
import useSearch from './use-search/useSearch';

const NUMBER_FLATLIST_COLUMNS = 3;

const Wrapper = styled(View)`
  flex: 1;
`;

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParams, 'SEARCH'>;

type SearchScreenRouteProp = RouteProp<SearchStackParams, 'SEARCH'>;

type Props = {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
};

const Search = ({ navigation, route }: Props) => {
  const {
    onReloadPagination,
    hasPaginationError,
    onTypeSearchQuery,
    onPaginateSearch,
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

  return (
    <Wrapper>
      <FlatList
        ListFooterComponent={() => (
          <ListFooterComponent
            onPressReloadButton={onReloadPagination}
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
        onEndReached={onPaginateSearch}
        data={items}
      />
      {!!errorMessage && (
      <PopupAdvice
        text={errorMessage}
      />
      )}
    </Wrapper>
  );
};

export default Search;
