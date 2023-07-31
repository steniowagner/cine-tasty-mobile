import React from 'react';
import {StatusBar} from 'react-native';

import {HeaderIconButton} from '@components';
import {CONSTANTS} from '@utils';

import * as Styles from './SearchBar.styles';
import {useSearchBar} from './useSearchBar';

export type SearchBarProps = {
  onTypeSearchQuery: (query: string) => void;
  onPressSearch?: () => void;
  onPressClose: () => void;
  placeholder: string;
};

export const SearchBar = (props: SearchBarProps) => {
  const searchBar = useSearchBar();
  return (
    <>
      <StatusBar
        backgroundColor={CONSTANTS.VALUES.DEFAULT_SEARCH_COLOR}
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
            onSubmitEditing={props.onPressSearch}
            placeholder={props.placeholder}
            ref={searchBar.inputRef}
          />
        </Styles.ContentWrapper>
      </Styles.Wrapper>
    </>
  );
};
