import {Animated} from 'react-native';
import styled from 'styled-components/native';

import {TMDBImage} from '@components';

export const FallbackImageWrapper = styled(Animated.View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('30%')}px;
  height: 100%;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;

export const TMDBImageStyled = styled(TMDBImage)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('30%')}px;
  height: 100%;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
`;
