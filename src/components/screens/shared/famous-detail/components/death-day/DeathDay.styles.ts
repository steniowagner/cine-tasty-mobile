import {View, Text} from 'react-native';
import styled from 'styled-components/native';

import CONSTANTS from '@utils/constants';

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('35%')}px;
  flex-direction: row;
  align-items: center;
  margin-top: ${({theme}) => theme.metrics.getWidthFromDP('12%')}px;
  margin-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  padding-horizontal: ${({theme}) => theme.metrics.extraSmallSize}px;
  padding-vertical: ${({theme}) => theme.metrics.extraSmallSize}px;
  border-radius: ${({theme}) => theme.metrics.height}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const IconWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({theme}) => theme.metrics.largeSize}px;
  background-color: white;
`;

export const DateText = styled(Text)`
  margin-left: ${({theme}) => theme.metrics.extraSmallSize * 1.5}px;
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
`;
