import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';
import * as Types from '@local-types';
import {TMDBImage} from '@components';

const THUMB_SIZE = metrics.getWidthFromDP('20%');
const THUMB_MARGIN = metrics.extraSmallSize;
export const BORDER_WIDTH = metrics.getWidthFromDP('0.5%');
export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');
export const THUMB_TOTAL_SIZE = THUMB_SIZE + THUMB_MARGIN * 2;
export const listStyles = {
  paddingHorizontal: metrics.mediumSize,
};

type ThumbImageStyleProps = {
  isSelected: boolean;
  image: string;
};

type WrapperStyleProps = {
  isSelected: boolean;
};

export const Wrapper = styled(TouchableOpacity)<WrapperStyleProps>`
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  margin-horizontal: ${THUMB_MARGIN}px;
  align-items: center;
  border-radius: ${metrics.mediumSize}px;
  border: ${({isSelected, theme}) => {
    const borderColor = isSelected
      ? theme.id === Types.ThemeId.DARK
        ? theme.colors.primary
        : theme.colors.buttonText
      : 'transparent';
    return `${BORDER_WIDTH}px solid ${borderColor}`;
  }};
`;

export const DotMarker = styled(View)`
  width: ${({theme}) => theme.metrics.smallSize}px;
  height: ${({theme}) => theme.metrics.smallSize}px;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
  margin-top: ${({theme}) => theme.metrics.mediumSize}px;
  background-color: ${({theme}) =>
    theme.id === Types.ThemeId.DARK
      ? theme.colors.primary
      : theme.colors.buttonText};
`;

export const FallbackWrapper = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.contrast};
  border-radius: ${metrics.mediumSize}px;
`;

export const ThumbImage = styled(TMDBImage)<ThumbImageStyleProps>`
  width: 100%;
  height: 100%;
  border-radius: ${metrics.mediumSize}px;
`;
