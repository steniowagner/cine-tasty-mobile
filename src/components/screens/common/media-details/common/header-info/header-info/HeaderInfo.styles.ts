import styled from 'styled-components/native';
import {StyleSheet, View} from 'react-native';

import metrics from '@styles/metrics';

export const POSTER_IMAGE_ICON_SIZE = metrics.getWidthFromDP('14%');
export const POSTER_IMAGE_DEFAULT_WIDTH = metrics.getWidthFromDP('70%');
export const POSTER_IMAGE_DEFAULT_HEIGHT = metrics.getHeightFromDP('50%');
export const POSTER_IMAGE_DEFAULT_BORDER_RADIUS = metrics.mediumSize;

type WrapperStylesProp = {
  headerHeight: number;
};

export const Wrapper = styled(View)<WrapperStylesProp>`
  width: 100%;
  align-items: center;
  margin-top: ${({headerHeight, theme}) =>
    theme.metrics.extraLargeSize + headerHeight}px;
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize}px;
`;

export const MediaHeadlineWrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.largeSize}px;
  margin-bottom: ${({theme}) => theme.metrics.extraSmallSize}px;
`;

export const sheet = StyleSheet.create({
  poster: {
    width: POSTER_IMAGE_DEFAULT_WIDTH,
    height: POSTER_IMAGE_DEFAULT_HEIGHT,
    borderRadius: POSTER_IMAGE_DEFAULT_BORDER_RADIUS,
  },
});
