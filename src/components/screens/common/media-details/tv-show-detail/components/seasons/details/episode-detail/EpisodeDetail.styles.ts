import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {SVGIcon} from '@components';
import {CONSTANTS} from '@utils';
import metrics from '@styles/metrics';
import {dark} from '@styles/themes';

export const IMAGE_OFF_ICON_SIZE = metrics.getWidthFromDP('12%');
export const DEFAULT_TEXT_COLOR = dark.colors.text;

export const Wrapper = styled(View)`
  width: 100%;
  padding-bottom: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  max-height: ${({theme}) => theme.metrics.getHeightFromDP('80%')}px;
  background-color: white;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
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
  color: ${DEFAULT_TEXT_COLOR};
`;

export const TextWrapper = styled(View)`
  padding: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const sheet = StyleSheet.create({
  profileImage: {
    width: metrics.width,
    height: metrics.getWidthFromDP('30%'),
    borderRadius: 0,
  },
});
