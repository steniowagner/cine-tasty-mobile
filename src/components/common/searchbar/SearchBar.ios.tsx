import React, { useRef } from 'react';
import { StatusBar, TextInput, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled, { DefaultTheme, withTheme } from 'styled-components';

import HeaderIconButton from '@components/common/HeaderIconButton';

const HEADER_HEIGHT = 44;

const Wrapper = styled(View)`
  width: 100%;
  height: ${() => getStatusBarHeight() + HEADER_HEIGHT}px;
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
  color: white;
`;

export type Props = {
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
}: Props) => {
  const inputRef = useRef<TextInput>();

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
    </>
  );
};

export default withTheme(SearchBar);
