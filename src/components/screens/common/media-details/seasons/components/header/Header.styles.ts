import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const IMAGE_OFF_ICON_SIZE = metrics.extraLargeSize;

export const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({theme}) => theme.metrics.extraLargeSize}px;
  padding-horizontal: ${({theme}) => theme.metrics.mediumSize}px;
`;

export const SeasonPosterImageWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('30%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('40%')}px;
`;

export const sheet = StyleSheet.create({
  poster: {
    width: metrics.getWidthFromDP('28%'),
    height: metrics.getWidthFromDP('40%'),
    borderRadius: metrics.smallSize,
  },
});
