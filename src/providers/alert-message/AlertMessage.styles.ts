import {Text} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const DEFAULT_HEIGHT = metrics.getWidthFromDP('12%');
const DEFAULT_BORDER_RADIUS = metrics.smallSize;

export const Wrapper = styled(Animated.View)`
  height: ${DEFAULT_HEIGHT}px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  position: absolute;
  align-self: center;
  justify-content: center;
  padding-horizontal: ${({theme}) => theme.metrics.extraLargeSize}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Message = styled(Text).attrs(() => ({
  numberOfLines: 2,
}))`
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
`;
