import { Animated, View } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  flex-direction: row;
`;

export const Dot = styled(Animated.View)`
  height: ${({ theme }) => theme.metrics.smallSize}px;
  margin-right: ${({ theme }) => theme.metrics.extraSmallSize}px;
  border-radius: 99px;
  background-color: #111111;
`;
