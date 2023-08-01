import React, {useEffect} from 'react';
import {FlatList, Platform} from 'react-native';

import {FamousListItem} from '@src/components/screens/famous/components/famous-list-item/FamousListItem';
import {LoadingFamous} from '@src/components/screens/famous/components/loading-famous/LoadingFamous';
import * as FamousListStyles from '@src/components/screens/famous/components/Famous.styles';
import {PaginatedListHeader, PaginationFooter} from '@components';
import * as SchemaTypes from '@schema-types';

import {SearchBar} from '../components/searchbar/SearchBar';
import {useSearchFamous} from './useSearchFamous';
import {RecentSearches} from '../components/recent-searches/RecentSearches';
import {SearchFamousNavigationProp} from './routes/route-params-types';

type SearchFamousProps = {
  navigation: SearchFamousNavigationProp;
};

export const SearchFamous = (props: SearchFamousProps) => {
  const searchFamous = useSearchFamous({navigation: props.navigation});

  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <SearchBar
          onTypeSearchQuery={searchFamous.onTypeSearchQuery}
          onPressClose={searchFamous.onPressClose}
          placeholder={searchFamous.placeholder}
        />
      ),
    });
  }, [searchFamous.onTypeSearchQuery]);

  if (searchFamous.shouldShowRecentSearches) {
    return (
      <RecentSearches
        onPressItem={searchFamous.onPressRecentSearchedItem}
        searchType={SchemaTypes.SearchType.PERSON}
      />
    );
  }

  if (searchFamous.isLoading) {
    return <LoadingFamous />;
  }

  return (
    <FlatList
      ListHeaderComponent={() =>
        searchFamous.shouldShowTopReloadButton && (
          <PaginatedListHeader onPress={searchFamous.onPressTopReloadButton} />
        )
      }
      ListFooterComponent={() =>
        searchFamous.shouldShowBottomReloadButton && (
          <PaginationFooter
            onPressReloadButton={searchFamous.onPressBottomReloadButton}
            hasError={searchFamous.hasPaginationError}
            isPaginating={searchFamous.isPaginating}
          />
        )
      }
      contentContainerStyle={FamousListStyles.sheet.contentContainerStyle}
      onEndReachedThreshold={Platform.select({
        android: 0.5,
        ios: 0.1,
      })}
      numColumns={3}
      renderItem={({item, index}) => (
        <FamousListItem
          onPress={() => searchFamous.onPressItem(item)}
          image={item.profileImage}
          title={item.name}
          index={index}
        />
      )}
      onEndReached={searchFamous.onEndReached}
      keyExtractor={({id}) => `${id}`}
      testID="famous-list"
      data={searchFamous.famous}
    />
  );
};
