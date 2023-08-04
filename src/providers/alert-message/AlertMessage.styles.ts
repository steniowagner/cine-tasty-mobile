import {Text} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';
import {SVGIcon} from '@components';

export const DEFAULT_HEIGHT = metrics.getWidthFromDP('12%');
const DEFAULT_BORDER_RADIUS = metrics.smallSize;

export const Wrapper = styled(Animated.View)`
  height: ${DEFAULT_HEIGHT}px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  flex-direction: row;
  position: absolute;
  align-self: center;
  align-items: center;
  padding-horizontal: ${({theme}) => theme.metrics.mediumSize}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Message = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
  margin-left: ${({theme}) => theme.metrics.smallSize}px;
`;

export const AlertIcon = styled(SVGIcon).attrs(({theme}) => ({
  size: theme.metrics.getWidthFromDP('8%'),
  colorThemeRef: 'buttonText',
  id: 'alert-box',
}))``;
