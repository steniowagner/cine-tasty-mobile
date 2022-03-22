import {TouchableOpacity, Animated} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const Wrapper = styled(TouchableOpacity)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('45%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('32%')}px;
  margin-right: ${({theme}) => theme.metrics.largeSize}px;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
`;

export const FallbackImageWrapper = styled(Animated.View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;

export const TMDBImageStyle = {
  width: '100%',
  height: '100%',
  borderRadius: metrics.extraSmallSize,
};
