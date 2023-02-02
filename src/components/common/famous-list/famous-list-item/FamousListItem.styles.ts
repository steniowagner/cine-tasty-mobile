import {Animated, Text} from 'react-native';
import styled from 'styled-components/native';

import {TMDBImage} from '@components';
import metrics from '@styles/metrics';

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

export const TMDBImageStyled = styled(TMDBImage)`
  width: 100%;
  height: 70%;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;

export const PersonName = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-top: ${({theme}) => theme.metrics.smallSize}px;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({theme}) => theme.colors.text};
`;

export const FallbackImageWrapper = styled(Animated.View)`
  width: 100%;
  height: 70%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;
