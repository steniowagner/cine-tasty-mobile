import React, { useRef } from 'react';
import { StatusBar, TextInput } from 'react-native';
import { DefaultTheme, withTheme } from 'styled-components';

import HeaderIconButton from '@components/common/header-icon-button/HeaderIconButton';

import * as Styles from './SearchBar.styles';

type SearchBarProps = {
  onTypeSearchQuery: (query: string) => void;
  onPressSearch?: () => void;
  onPressClose: () => void;
  placeholder: string;
  theme: DefaultTheme;
};

const SearchBar = ({
  onTypeSearchQuery,
  onPressSearch,
  onPressClose,
  placeholder,
  theme,
}: SearchBarProps) => {
  const inputRef = useRef<TextInput>();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle="light-content"
        animated
      />
      <Styles.IOSWrapper
        testID="searchbar-wrapper"
      >
        <Styles.ContentWrapper>
          <HeaderIconButton
            iconName="close"
            onPress={onPressClose}
            withMarginLeft
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

export default withTheme(SearchBar);
