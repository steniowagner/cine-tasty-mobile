/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import { Platform, FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import LoadingIndicator from 'components/common/LoadingIndicator';
import SearchBar from 'components/common/searchbar/SearchBar';
import metrics from 'styles/metrics';

import { PeopleStackParams } from '../../routes/route-params-types';
import SearchPersonListItem from './SearchPersonListItem';
import useSearchPerson from './useSearchPerson';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
`;

const NUMBER_FLATLIST_COLUMNS = 3;

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
  const { onTypeSearchQuery, isLoading, items } = useSearchPerson();

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
        numColumns={NUMBER_FLATLIST_COLUMNS}
        columnWrapperStyle={{
          paddingLeft: metrics.smallSize,
        }}
        onEndReachedThreshold={Platform.select({
          android: 0.5,
          ios: 0.1,
        })}
        renderItem={({ item, index }) => (
          <SearchPersonListItem
            onPress={() => console.warn('item: ', item)}
            numberOfColumns={NUMBER_FLATLIST_COLUMNS}
            profilePath={item.profilePath}
            name={item.name}
            index={index}
          />
        )}
        keyExtractor={({ id }) => `${id}`}
        data={items}
      />
    </Wrapper>
  );
};

export default SearchPerson;
