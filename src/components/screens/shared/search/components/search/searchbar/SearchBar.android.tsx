import React from 'react';
import {StatusBar} from 'react-native';

import {HeaderIconButton} from '@components/common';
import {CONSTANTS} from '@utils';

import * as Styles from './SearchBar.styles';
import useSearchBar from './useSearchBar';

type SearchBarProps = {
  onTypeSearchQuery: (query: string) => void;
  onPressSearch: () => void;
  onPressClose: () => void;
  placeholder: string;
};

const SearchBar = (props: SearchBarProps) => {
  const searchBar = useSearchBar({onTypeSearchQuery: props.onTypeSearchQuery});
  return (
    <>
      <StatusBar
        backgroundColor={CONSTANTS.VALUES.DEFAULT_SEARCH_COLOR}
        barStyle="light-content"
        animated
      />
      <Styles.AndroidWrapper testID="searchbar-wrapper">
        <HeaderIconButton
          onPress={props.onPressClose}
          iconName="close"
          withMarginLeft
          color="white"
        />
        <Styles.Input
          testID="search-input"
          onChangeText={searchBar.onChangeText}
          onSubmitEditing={props.onPressSearch}
          placeholder={props.placeholder}
          ref={searchBar.inputRef}
        />
      </Styles.AndroidWrapper>
    </>
  );
};

export default SearchBar;
