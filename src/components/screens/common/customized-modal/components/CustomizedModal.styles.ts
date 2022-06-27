import {Animated, View, Text} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  background-color: ${({theme}) => theme.colors.darkLayer};
`;

export const PressAreaClose = styled(View)`
  width: 100%;
  height: 100%;
`;

export const CardWrapper = styled(Animated.View)`
  width: 100%;
  border-top-left-radius: ${({theme}) => theme.metrics.mediumSize}px;
  border-top-right-radius: ${({theme}) => theme.metrics.mediumSize}px;
  background-color: white;
`;

export const GripWrapper = styled(View)`
  width: 100%;
  align-items: center;
  padding-vertical: ${({theme}) => theme.metrics.mediumSize}px;
`;

export const Grip = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('15%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('1.2%')}px;
  border-radius: ${({theme}) => theme.metrics.extraLargeSize}px;
  background-color: ${({theme}) => theme.colors.inactiveWhite};
`;

export const HeadLineText = styled(Text)`
  margin-horizontal: ${({theme}) => theme.metrics.largeSize}px;
  margin-bottom: ${({theme}) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.extraLargeSize * 1.1}px;
  text-align: center;
  color: rgba(0, 0, 0, 0.8);
`;

export const LineDivider = styled(View)`
  width: 100%;
  height: 1.8px;
  background-color: #f2f2f2;
`;

export const ListHeaderWrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.smallSize}px;
`;
