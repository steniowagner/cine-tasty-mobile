import styled from 'styled-components/native';

import { getStatusBarHeight } from '@utils';

import { dark } from '@styles/themes';

const HEADER_HEIGHT = 44;

export const Wrapper = styled.View`
  width: 100%;
  height: ${() => getStatusBarHeight() + HEADER_HEIGHT}px;
  justify-content: flex-end;
  padding-bottom: ${({ theme }) => theme.metrics.md}px;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const ContentWrapper = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput.attrs(({ placeholder, theme }) => ({
  placeholderTextColor: dark.colors.subText,
  selectionColor: theme.colors.primary,
  underlineColorAndroid: 'transparent',
  returnKeyLabel: 'search',
  returnKeyType: 'search',
  numberOfLines: 1,
  autoFocus: true,
  placeholder,
}))`
  width: 85%;
  margin-left: ${({ theme }) => theme.metrics.sm}px;
  font-family: CircularStd-Book;
  font-size: ${({ theme }) => theme.metrics.xl}px;
  color: white;
`;
