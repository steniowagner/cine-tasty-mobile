import React, { useEffect, useState, useRef } from 'react';
import { TextInput, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import styled from 'styled-components';

import HeaderIconButton from 'components/common/HeaderIconButton';

interface WrapperStyleProps {
  readonly headerHeight: number;
}

const Wrapper = styled(View)<WrapperStyleProps>`
  width: 100%;
  height: ${({ headerHeight }) => 1.05 * headerHeight}px;
  justify-content: flex-end;
  padding-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

const ContentWrapper = styled(View)`
  flex-direction: row;
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
  onPressSearch?: () => void;
  onPressClose: () => void;
  placeholder: string;
};

const SearchBar = ({
  onTypeSearchQuery,
  onPressSearch,
  onPressClose,
  placeholder,
}: Props) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerHeightRef = useRef<number>();
  const inputRef = useRef<TextInput>();

  headerHeightRef.current = useHeaderHeight();

  useEffect(() => {
    setHeaderHeight(headerHeightRef.current);

    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Wrapper
      testID="searchbar-wrapper"
      headerHeight={headerHeight}
    >
      <ContentWrapper>
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
      </ContentWrapper>
    </Wrapper>
  );
};

export default SearchBar;
