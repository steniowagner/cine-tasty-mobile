import {ActivityIndicator, Animated, View} from 'react-native';
import styled from 'styled-components/native';

import {TMDBImage, SVGIcon} from '@components';

import metrics from '@styles/metrics';

export const LANDSCAPE_HEIGHT = metrics.getWidthFromDP('50%');
export const PORTRAIT_HEIGHT = metrics.getWidthFromDP('80%');

type ImageStyleProps = {
  height: number;
};

export const Image = styled(TMDBImage)<ImageStyleProps>`
  width: 100%;
  height: ${({height}) => height}px;
`;

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  height: ${PORTRAIT_HEIGHT}px;
  justify-content: center;
  align-items: center;
`;

export const CustomActivityIndicator = styled(ActivityIndicator).attrs(
  ({theme}) => ({
    color: theme.colors.text,
    size: 'large',
  }),
)``;

export const FallbackImageWrapper = styled(Animated.View)`
  width: ${({theme}) => theme.metrics.width}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('60%')}px;
  justify-content: center;
  align-items: center;
`;

export const ImageOffIcon = styled(SVGIcon).attrs(({theme}) => ({
  size: theme.metrics.getWidthFromDP('25%'),
  colorThemeRef: 'white',
  id: 'image-off',
}))``;
