import metrics from '@styles/metrics';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

import * as BackgroundImageStyles from '../header-info/background-image/BackgroundImage.styles';
import * as HeaderInfoStyles from '../header-info/header-info/HeaderInfo.styles';

const DEFAULT_BORDER_RADIUS = metrics.height;

type WrapperStylesProp = {
  headerHeight: number;
};

export const Wrapper = styled(View)<WrapperStylesProp>`
  width: ${BackgroundImageStyles.DEFAULT_WIDTH}px;
  height: ${BackgroundImageStyles.DEFAULT_HEIGHT}px;
  margin-top: ${({headerHeight}) =>
    HeaderInfoStyles.BASE_MARGIN_TOP + headerHeight}px;
  align-items: center;
`;

export const Row = styled(View)`
  flex-direction: row;
`;

export const sheet = StyleSheet.create({
  poster: {
    width: HeaderInfoStyles.POSTER_IMAGE_DEFAULT_WIDTH,
    height: HeaderInfoStyles.POSTER_IMAGE_DEFAULT_HEIGHT,
    borderRadius: HeaderInfoStyles.POSTER_IMAGE_DEFAULT_BORDER_RADIUS,
  },
  title: {
    width: metrics.getWidthFromDP('60%'),
    height: metrics.getWidthFromDP('10%'),
    borderRadius: DEFAULT_BORDER_RADIUS,
    marginVertical: metrics.mediumSize,
  },
  stars: {
    width: metrics.getWidthFromDP('45%'),
    height: metrics.getWidthFromDP('8%'),
    borderRadius: DEFAULT_BORDER_RADIUS,
    marginBottom: metrics.mediumSize,
  },
  genreItem: {
    width: metrics.getWidthFromDP('20%'),
    height: metrics.getWidthFromDP('10%'),
    borderRadius: metrics.extraSmallSize,
    marginBottom: metrics.smallSize,
  },
  middleGenreItem: {
    width: metrics.getWidthFromDP('20%'),
    height: metrics.getWidthFromDP('10%'),
    borderRadius: metrics.extraSmallSize,
    marginHorizontal: metrics.smallSize,
    marginBottom: metrics.smallSize,
  },
});
