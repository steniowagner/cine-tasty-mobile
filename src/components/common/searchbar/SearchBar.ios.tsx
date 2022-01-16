import React, { useRef } from 'react';
import { StatusBar, TextInput } from 'react-native';

import HeaderIconButton from '@components/common/header-icon-button/HeaderIconButton';
import CONSTANTS from '@utils/constants';

import * as Styles from './SearchBar.styles';

type SearchBarProps = {
  onTypeSearchQuery: (query: string) => void;
  onPressSearch?: () => void;
  onPressClose: () => void;
  placeholder: string;
};

const SearchBar = ({
  onTypeSearchQuery,
  onPressSearch,
  onPressClose,
  placeholder,
}: SearchBarProps) => {
  const inputRef = useRef<TextInput>();

  return (
    <>
      <StatusBar
        backgroundColor={CONSTANTS.VALUES.DEFAULT_SEARCH_COLOR}
        barStyle="light-content"
        animated
      />
      <Styles.IOSWrapper
        testID="searchbar-wrapper"
      >
        <Styles.ContentWrapper>
          <HeaderIconButton
            onPress={onPressClose}
            iconName="close"
            withMarginLeft
            color="white"
          />
          <Styles.Input
            testID="search-input"
            onChangeText={(text: string) => onTypeSearchQuery(text)}
            onSubmitEditing={onPressSearch}
            placeholder={placeholder}
            ref={inputRef}
          />
        </Styles.ContentWrapper>
      </Styles.IOSWrapper>
    </>
  );
};

export default SearchBar;
