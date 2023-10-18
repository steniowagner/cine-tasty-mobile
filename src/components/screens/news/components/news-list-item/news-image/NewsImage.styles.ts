import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import metrics from '@styles/metrics';
import { dark } from '@styles/themes';

import { imageWrapper } from '../NewsListItem.styles';

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12');

export const ImageContent = styled(FastImage)`
  width: ${imageWrapper.width}px;
  height: ${imageWrapper.height}px;
  border-radius: ${imageWrapper.borderRadius}px;
`;

export const AnimatedViewStlyes = StyleSheet.create({
  fallbackImageWrapper: {
    width: imageWrapper.width,
    height: imageWrapper.height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: imageWrapper.borderRadius,
    backgroundColor: dark.colors.fallbackImageBackground,
  },
});
