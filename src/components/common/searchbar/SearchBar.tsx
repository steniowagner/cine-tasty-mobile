import React, { useEffect, useRef } from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';

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
  font-family: CircularStd-Book;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

export type Props = {
  onTypeSearchQuery: (query: string) => void;
  onPressSearch: () => void;
  onPressClose: () => void;
  placeholder: string;
  value: string;
};

const SearchBar = ({
  onTypeSearchQuery,
  onPressSearch,
  onPressClose,
  placeholder,
  value,
}: Props) => {
  const inputRef = useRef<TextInput>();
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Wrapper
      testID="searchbar-wrapper"
    >
      <HeaderIconButton
        iconName="close"
        onPress={onPressClose}
      />
      <Input
        testID="search-input"
        onChangeText={(text: string) => onTypeSearchQuery(text)}
        onSubmitEditing={onPressSearch}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
      />
    </Wrapper>
  );
};

export default SearchBar;
