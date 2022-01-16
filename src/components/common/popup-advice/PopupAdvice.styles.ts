import { Animated, Text } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(Animated.View)`
  position: absolute;
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('35%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.popup};
`;

export const Message = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: #fff;
`;
