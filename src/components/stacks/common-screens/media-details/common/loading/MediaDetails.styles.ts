import metrics from '@styles/metrics';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import * as BackgroundImageStyles from '../background-image/BackgroundImage.styles';
import * as HeaderStyles from '../header/Header.styles';

const DEFAULT_BORDER_RADIUS = metrics.height;

export const Wrapper = styled.View`
  width: ${BackgroundImageStyles.DEFAULT_WIDTH}px;
  height: ${BackgroundImageStyles.DEFAULT_HEIGHT}px;
  margin-top: ${HeaderStyles.MARGIN_TOP}px;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const sheet = StyleSheet.create({
  poster: {
    width: HeaderStyles.POSTER_IMAGE_DEFAULT_WIDTH,
    height: HeaderStyles.POSTER_IMAGE_DEFAULT_HEIGHT,
    borderRadius: HeaderStyles.POSTER_IMAGE_DEFAULT_BORDER_RADIUS,
  },
  title: {
    width: metrics.getWidthFromDP('60'),
    height: metrics.xl * 2,
    borderRadius: DEFAULT_BORDER_RADIUS,
    marginVertical: metrics.md,
  },
  stars: {
    width: metrics.getWidthFromDP('45'),
    height: metrics.lg * 2,
    borderRadius: DEFAULT_BORDER_RADIUS,
    marginBottom: metrics.md,
  },
  genreItem: {
    width: metrics.xl * 4,
    height: metrics.xl * 2,
    borderRadius: metrics.xs,
    marginBottom: metrics.sm,
  },
  middleGenreItem: {
    width: metrics.xl * 4,
    height: metrics.xl * 2,
    borderRadius: metrics.xs,
    marginHorizontal: metrics.sm,
    marginBottom: metrics.sm,
  },
});
