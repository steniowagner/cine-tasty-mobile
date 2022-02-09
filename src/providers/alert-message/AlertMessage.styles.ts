import {Animated, Text, View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  height: 60%;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

export const MessageWrapper = styled(Animated.View)`
  margin-top: ${({theme}) => theme.metrics.getHeightFromDP('35%')}px;
  padding-horizontal: ${({theme}) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({theme}) => theme.metrics.largeSize}px;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
  background-color: ${({theme}) => theme.colors.popup};
`;

export const Message = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: #fff;
`;
