import {Text, View} from 'react-native';
import styled from 'styled-components/native';

import {CONSTANTS} from '@utils';

export const Wrapper = styled(View)`
  width: 100%;
  padding-bottom: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  max-height: ${({theme}) => theme.metrics.getHeightFromDP('80%')}px;
  background-color: white;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
`;

export const EpisodeImageFallback = styled(View)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('30%')}px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  border-top-right-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;

export const EpisodeTitleText = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.smallSize}px;
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: ${({theme}) => theme.colors.buttonText};
  font-family: CircularStd-Black;
`;

export const EpisodeOverviewText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({theme}) => theme.colors.buttonText};
`;

export const EpisodeAiredText = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.largeSize}px;
  margin-top: ${({theme}) => theme.metrics.smallSize}px;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: rgba(0, 0, 0, 0.5);
`;

export const TextWrapper = styled(View)`
  padding: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;
