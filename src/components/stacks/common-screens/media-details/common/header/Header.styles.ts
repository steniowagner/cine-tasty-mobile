import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import metrics from '@styles/metrics';

export const POSTER_IMAGE_ICON_SIZE = metrics.xl * 3;
export const POSTER_IMAGE_DEFAULT_WIDTH = metrics.getWidthFromDP('60');
export const POSTER_IMAGE_DEFAULT_HEIGHT = metrics.getHeightFromDP('50');
export const POSTER_IMAGE_DEFAULT_BORDER_RADIUS = metrics.md;
export const MARGIN_TOP = metrics.xl * 4;
export const MEDIA_HEADLINE_MARGIN_TOP = metrics.lg;

export const Wrapper = styled.View`
  width: 100%;
  align-items: center;
  margin-top: ${MARGIN_TOP}px;
`;

export const MediaHeadlineWrapper = styled.View`
  margin-top: ${MEDIA_HEADLINE_MARGIN_TOP}px;
  margin-bottom: ${({ theme }) => theme.metrics.sm}px;
`;

export const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
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

export const MiddleContent = styled.View`
  justify-content: center;
  align-items: center;
`;

export const StarsWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.metrics.md}px;
  margin-top: ${({ theme }) => theme.metrics.xs}px;
`;

export const sheet = StyleSheet.create({
  poster: {
    width: POSTER_IMAGE_DEFAULT_WIDTH,
    height: POSTER_IMAGE_DEFAULT_HEIGHT,
    borderRadius: POSTER_IMAGE_DEFAULT_BORDER_RADIUS,
  },
});
