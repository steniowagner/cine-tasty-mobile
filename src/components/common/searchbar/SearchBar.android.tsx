import React, { useEffect, useRef } from 'react';
import { StatusBar, TextInput, View } from 'react-native';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import HeaderIconButton from 'components/common/HeaderIconButton';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

const Input = styled(TextInput).attrs(({ placeholder, theme }) => ({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
  selectionColor: theme.colors.primary,
  underlineColorAndroid: 'transparent',
  returnKeyLabel: 'search',
  returnKeyType: 'search',
  numberOfLines: 1,
  autoFocus: true,
  placeholder,
}))`
  width: 85%;
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  font-family: CircularStd-Book;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

export type Props = {
  onTypeSearchQuery: (query: string) => void;
  onPressSearch: () => void;
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
}: Props) => {
  const inputRef = useRef<TextInput>();
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle="light-content"
        animated
      />
      <Wrapper
        testID="searchbar-wrapper"
      >
        <HeaderIconButton
          iconName="close"
          onPress={onPressClose}
          withMarginLeft
        />
        <Input
          testID="search-input"
          onChangeText={(text: string) => onTypeSearchQuery(text)}
          onSubmitEditing={onPressSearch}
          placeholder={placeholder}
          ref={inputRef}
        />
      </Wrapper>
    </>
  );
};

export default withTheme(SearchBar);
