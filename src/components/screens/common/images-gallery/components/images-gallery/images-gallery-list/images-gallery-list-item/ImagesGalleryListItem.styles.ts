import {ActivityIndicator, View} from 'react-native';
import styled from 'styled-components/native';

import {SVGIcon} from '@components';
import metrics from '@styles/metrics';

export const LANDSCAPE_HEIGHT = metrics.getWidthFromDP('65%');
export const PORTRAIT_HEIGHT = metrics.getWidthFromDP('100%');

export const Wrapper = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  height: ${PORTRAIT_HEIGHT}px;
  align-items: center;
  justify-content: center;
`;

export const CustomActivityIndicator = styled(ActivityIndicator).attrs(
  ({theme}) => ({
    color: theme.colors.text,
    size: 'small',
  }),
)``;

export const ImageOffIcon = styled(SVGIcon).attrs(({theme}) => ({
  size: theme.metrics.getWidthFromDP('25%'),
  colorThemeRef: 'white',
  id: 'image-off',
}))``;
