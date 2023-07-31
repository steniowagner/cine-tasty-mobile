import {TextInput, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styled from 'styled-components/native';

import {dark} from '@styles/themes';

const HEADER_HEIGHT = 44;

export const Wrapper = styled(View)`
  width: 100%;
  height: ${() => getStatusBarHeight() + HEADER_HEIGHT}px;
  justify-content: flex-end;
  padding-bottom: ${({theme}) => theme.metrics.mediumSize}px;
  background-color: ${({theme}) => theme.colors.contrast};
`;

export const ContentWrapper = styled(View)`
  flex-direction: row;
`;

export const Input = styled(TextInput).attrs(({placeholder, theme}) => ({
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
  margin-left: ${({theme}) => theme.metrics.smallSize}px;
  font-family: CircularStd-Book;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: white;
`;
