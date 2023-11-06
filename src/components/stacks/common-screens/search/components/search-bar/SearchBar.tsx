import React from 'react';
import { StatusBar } from 'react-native';

import { HeaderIconButton } from '@common-components';
import { dark as theme } from '@styles/themes';

import { useSearchBar } from './use-search-bar';
import * as Styles from './SearchBar.styles';

export type SearchBarProps = {
  onTypeSearchQuery: (query: string) => void;
  onPressClose: () => void;
  placeholder: string;
};

export const SearchBar = (props: SearchBarProps) => {
  const searchBar = useSearchBar();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.searchBar}
        barStyle="light-content"
        animated
      />
      <Styles.Wrapper testID="searchbar-wrapper">
        <Styles.ContentWrapper>
          <HeaderIconButton
            onPress={props.onPressClose}
            iconName="close"
            withMarginLeft
            color="white"
          />
          <Styles.Input
            testID="search-input"
            onChangeText={props.onTypeSearchQuery}
            placeholder={props.placeholder}
            ref={searchBar.inputRef}
          />
        </Styles.ContentWrapper>
      </Styles.Wrapper>
    </>
  );
};
