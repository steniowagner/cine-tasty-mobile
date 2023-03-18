import styled from 'styled-components/native';
import {StyleSheet, View} from 'react-native';

import metrics from '@styles/metrics';
import LinearGradient from 'react-native-linear-gradient';

export const POSTER_IMAGE_ICON_SIZE = metrics.getWidthFromDP('14%');
export const POSTER_IMAGE_DEFAULT_WIDTH = metrics.getWidthFromDP('70%');
export const POSTER_IMAGE_DEFAULT_HEIGHT = metrics.getHeightFromDP('50%');
export const POSTER_IMAGE_DEFAULT_BORDER_RADIUS = metrics.mediumSize;
export const BASE_MARGIN_TOP = metrics.extraLargeSize;
export const MEDIA_HEADLINE_MARGIN_TOP = metrics.largeSize;

type WrapperStylesProp = {
  headerHeight: number;
};

export const Wrapper = styled(View)<WrapperStylesProp>`
  width: 100%;
  align-items: center;
  margin-top: ${({headerHeight}) => BASE_MARGIN_TOP + headerHeight}px;
`;

export const MediaHeadlineWrapper = styled(View)`
  margin-top: ${MEDIA_HEADLINE_MARGIN_TOP}px;
  margin-bottom: ${({theme}) => theme.metrics.extraSmallSize}px;
`;

export const SmokeShadow = styled(LinearGradient).attrs(({theme}) => ({
  colors: [
    ...Array(5).fill('transparent'),
    theme.colors.backgroundAlphax5,
    theme.colors.backgroundAlphax4,
    theme.colors.backgroundAlphax3,
    theme.colors.backgroundAlphax2,
    theme.colors.backgroundAlphax1,
    ...Array(5).fill(theme.colors.background),
  ],
}))`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const sheet = StyleSheet.create({
  poster: {
    width: POSTER_IMAGE_DEFAULT_WIDTH,
    height: POSTER_IMAGE_DEFAULT_HEIGHT,
    borderRadius: POSTER_IMAGE_DEFAULT_BORDER_RADIUS,
  },
});
