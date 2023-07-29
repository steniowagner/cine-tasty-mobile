import {TextInput, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import styled from 'styled-components/native';

const HEADER_HEIGHT = 44;

export const AndroidWrapper = styled(View)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('16%')}px;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.contrast};
`;

export const IOSWrapper = styled(View)`
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
  margin-left: ${({theme}) => theme.metrics.smallSize}px;
  font-family: CircularStd-Book;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: white;
`;
