import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';
import * as Types from '@local-types';

export const THUMB_SIZE = metrics.getWidthFromDP('18%');
export const BORDER_RADIUS = metrics.smallSize;
export const THUMB_SPACING = metrics.mediumSize;

type WrapeprStyleProps = {
  isSelected: boolean;
};

export const Wrapper = styled(TouchableOpacity)<WrapeprStyleProps>`
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  margin-right: ${({theme}) => theme.metrics.mediumSize}px;
  align-items: center;
  border: 3px solid
    ${({isSelected, theme}) => {
      if (!isSelected) {
        return 'transparent';
      }

      return theme.id === Types.ThemeId.DARK
        ? theme.colors.primary
        : theme.colors.buttonText;
    }};
  border-radius: ${BORDER_RADIUS + 3}px;
`;

export const DotMarker = styled(View)`
  width: ${({theme}) => theme.metrics.smallSize}px;
  height: ${({theme}) => theme.metrics.smallSize}px;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
  margin-top: ${({theme}) => theme.metrics.mediumSize}px;
  background-color: ${({theme}) => {
    const color =
      theme.id === Types.ThemeId.DARK
        ? theme.colors.primary
        : theme.colors.buttonText;

    return color;
  }};
`;
