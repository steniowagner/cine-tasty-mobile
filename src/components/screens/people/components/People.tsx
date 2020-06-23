/* eslint-disable react/display-name */

import React, { useLayoutEffect, useMemo } from 'react';
import { View } from 'react-native';
import { StackNavigationProp, StackHeaderProps, Header } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import HeaderIconButton from 'components/common/HeaderIconButton';
import SearchBar from 'components/common/searchbar/SearchBar';

import { PeopleStackParams } from '../routes/route-params-types';
import usePeople from './usePeople';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

type PeopleScreenNavigationProp = StackNavigationProp<PeopleStackParams, 'PEOPLE'>;

type PeopleScreenRouteProp = RouteProp<PeopleStackParams, 'PEOPLE'>;

type Props = {
  navigation: PeopleScreenNavigationProp;
  route: PeopleScreenRouteProp;
};

const People = ({ navigation, route }: Props) => {
  const {
    setIsStatusBarOpen,
    isSearchBarOpen,
    onPressSearch,
    setQuery,
    query,
  } = usePeople();

  const defaultHeaderOptions = useMemo(
    () => ({
      headerRight: () => (
        <HeaderIconButton iconName="magnify" onPress={() => setIsStatusBarOpen(true)} />
      ),
      // eslint-disable-next-line react/jsx-props-no-spreading
      header: (headerOptions: StackHeaderProps) => <Header {...headerOptions} />,
      headerTitle: route.params.headerTitle,
    }),
    [],
  );

  const searchBarHeaderOptions = useMemo(
    () => ({
      header: () => (
        <SearchBar
          placeholder={route.params.searchBarPlaceholder}
          onPressClose={() => setIsStatusBarOpen(false)}
          onPressSearch={onPressSearch}
          onTypeSearchQuery={setQuery}
          value={query}
        />
      ),
      headerRight: () => null,
      headerTitle: null,
    }),
    [setQuery, query],
  );

  useLayoutEffect(() => {
    const options = isSearchBarOpen ? searchBarHeaderOptions : defaultHeaderOptions;

    navigation.setOptions(options);
  }, [setIsStatusBarOpen, isSearchBarOpen, setQuery, query]);

  return <Wrapper />;
};

export default People;
