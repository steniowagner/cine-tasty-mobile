import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import metrics from '@styles/metrics';

export const IMAGE_HEIGHT = metrics.getWidthFromDP('40%');

export const FallbackMediaPosterImage = styled(Animated.View)`
  width: 30%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('40%')}px;
  margin-horizontal: ${({theme}) => theme.metrics.smallSize}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;
