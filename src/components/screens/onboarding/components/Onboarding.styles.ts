import {View, Text} from 'react-native';
import styled from 'styled-components/native';

import {dark} from '@styles/themes/dark';

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  height: ${({theme}) => theme.metrics.height}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const ItemWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
`;

export const IconSection = styled(View)`
  width: 100%;
  height: 45%;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const TextSection = styled(View)`
  width: 100%;
  height: 40%;
  padding: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
`;

export const LargeText = styled(Text)`
  color: ${dark.colors.secondary};
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
  font-family: CircularStd-Black;
`;

export const SmallText = styled(Text)`
  color: ${dark.colors.secondary};
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  margin-top: ${({theme}) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
`;
