import {TouchableOpacity, Animated} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';
import {CONSTANTS} from '@utils';

export const Wrapper = styled(TouchableOpacity)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('35%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('45%')}px;
  margin-right: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
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
