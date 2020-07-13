/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import { Platform, FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import ListFooterComponent from 'components/common/PaginationFooter';
import LoadingIndicator from 'components/common/LoadingIndicator';
import SearchBar from 'components/common/searchbar/SearchBar';
import PopupAdvice from 'components/common/PopupAdvice';
import metrics from 'styles/metrics';

import { PeopleStackParams } from '../../routes/route-params-types';
import SearchPersonListItem from './SearchPersonListItem';
import useSearchPerson from './useSearchPerson';

const LIST_ITEM_HEIGHT = metrics.getWidthFromDP('50%');
const NUMBER_FLATLIST_COLUMNS = 3;

const Wrapper = styled(View)`
  flex: 1;
`;

type SearchPersonScreenNavigationProp = StackNavigationProp<
  PeopleStackParams,
  'SEARCH_PERSON'
>;

type SearchPersonScreenRouteProp = RouteProp<PeopleStackParams, 'SEARCH_PERSON'>;

type Props = {
  navigation: SearchPersonScreenNavigationProp;
  route: SearchPersonScreenRouteProp;
};

const SearchPerson = ({ navigation, route }: Props) => {
  const {
    onReloadPagination,
    hasPaginationError,
    onTypeSearchQuery,
    onPaginateSearch,
    isPaginating,
    errorMessage,
    isLoading,
    items,
  } = useSearchPerson();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <SearchBar
          placeholder={route.params.searchBarPlaceholder}
          onPressClose={() => navigation.goBack()}
          onTypeSearchQuery={onTypeSearchQuery}
          onPressSearch={() => {}}
        />
      ),
    });
  }, [onTypeSearchQuery]);

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
          length: LIST_ITEM_HEIGHT,
          offset: LIST_ITEM_HEIGHT * Math.floor(index / NUMBER_FLATLIST_COLUMNS),
          index,
        })}
        numColumns={NUMBER_FLATLIST_COLUMNS}
        renderItem={({ item, index }) => (
          <SearchPersonListItem
            onPress={() => console.warn('item: ', item)}
            numberOfColumns={NUMBER_FLATLIST_COLUMNS}
            profilePath={item.profilePath}
            height={LIST_ITEM_HEIGHT}
            name={item.name}
            index={index}
          />
        )}
        keyExtractor={({ id }) => `${id}`}
        onEndReached={onPaginateSearch}
        data={items}
      />
      {!!errorMessage && (
      <PopupAdvice
        onFinishToShow={() => {}}
        text={errorMessage}
      />
      )}
    </Wrapper>
  );
};

export default SearchPerson;
