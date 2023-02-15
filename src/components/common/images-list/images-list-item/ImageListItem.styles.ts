import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import metrics from '@styles/metrics';
import {CONSTANTS} from '@utils';

export type ImageOrientation = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
};

export const Wrapper = styled(TouchableOpacity)<ImageOrientation>`
  width: ${({orientation, theme}) => {
    const percentage = orientation === 'PORTRAIT' ? '35%' : '60%';
    return theme.metrics.getWidthFromDP(percentage);
  }}px;
  height: ${({orientation, theme}) => {
    const percentage = orientation === 'PORTRAIT' ? '45%' : '38%';
    return theme.metrics.getWidthFromDP(percentage);
  }}px;
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
