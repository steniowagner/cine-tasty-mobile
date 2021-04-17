import { Text, View } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '@utils/constants';

export const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('90%')}px;
  max-height: ${({ theme }) => theme.metrics.getHeightFromDP('80%')}px;
  background-color: white;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

export const EpisodeImageFallback = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

export const EpisodeTitleText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.buttonText};
  font-family: CircularStd-Black;
`;

export const EpisodeOverviewText = styled(Text)`
  padding-bottom: ${CONSTANTS.VALUES.DEFAULT_SPACING * 2}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.buttonText};
`;

export const EpisodeAiredText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  font-family: CircularStd-Medium;
  color: rgba(0, 0, 0, 0.5);
`;
