import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const IMAGE_SQUARE_PERCENTAGE = '28%';

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

export const FallbackImageWrapper = styled(Animated.View)`
  width: ${({theme}) =>
    theme.metrics.getWidthFromDP(IMAGE_SQUARE_PERCENTAGE)}px;
  height: ${({theme}) =>
    theme.metrics.getWidthFromDP(IMAGE_SQUARE_PERCENTAGE)}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({theme}) => theme.metrics.getWidthFromDP('1%')}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;
