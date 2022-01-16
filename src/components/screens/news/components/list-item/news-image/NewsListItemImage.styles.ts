import { Animated } from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import { imageWrapper } from '../NewsListItem.styles';

export const ImageContent = styled(FastImage)`
  width: ${imageWrapper.width}px;
  height: ${imageWrapper.height}px;
  border-radius: ${imageWrapper.borderRadius}px;
`;

export const FallbackImageWrapper = styled(Animated.View)`
  width: ${imageWrapper.width}px;
  height: ${imageWrapper.height}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${imageWrapper.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;
