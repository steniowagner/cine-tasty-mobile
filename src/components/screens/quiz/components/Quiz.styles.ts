import {View, Text} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  padding-vertical: ${({theme}) => theme.metrics.getHeightFromDP('10%')}px;
  padding-horizontal: ${({theme}) => theme.metrics.getWidthFromDP('7%')}px;
`;

export const LargeText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('5.5%')}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Black;
  text-align: center;
`;

export const SubText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({theme}) => theme.colors.subText};
  font-family: CircularStd-Bold;
  text-align: center;
`;
