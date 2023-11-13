import styled from 'styled-components/native';
import { StyleSheet, TouchableOpacityProps } from 'react-native';
import {
  IStyledComponent,
  Substitute,
} from 'styled-components/native/dist/types';

import metrics from '@styles/metrics';
import { dark } from '@styles/themes';

const THUMB_SIZE = metrics.xl * 4;
const BORDER_RADIUS = metrics.sm;
const THUMB_MARGIN = metrics.md;
export const THUMB_TOTAL_SIZE = THUMB_SIZE + THUMB_MARGIN;

type WrapperStyleProps = {
  isSelected: boolean;
};

export const Wrapper: IStyledComponent<
  'native',
  Substitute<TouchableOpacityProps, WrapperStyleProps>
> = styled.TouchableOpacity<WrapperStyleProps>`
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  margin-right: ${THUMB_MARGIN}px;
  align-items: center;
  border-radius: ${BORDER_RADIUS}px;
  border: ${({ isSelected, theme }) => {
    const borderColor = isSelected
      ? theme.id === dark.id
        ? theme.colors.primary
        : theme.colors.buttonText
      : 'transparent';
    return `1px solid ${borderColor}`;
  }};
`;

export const DotMarker = styled.View`
  width: ${({ theme }) => theme.metrics.sm}px;
  height: ${({ theme }) => theme.metrics.sm}px;
  border-radius: ${({ theme }) => theme.metrics.sm}px;
  margin-top: ${({ theme }) => theme.metrics.md}px;
  background-color: ${({ theme }) =>
    theme.colors.background === dark.colors.background
      ? theme.colors.primary
      : theme.colors.buttonText};
`;

export const sheet = StyleSheet.create({
  thumb: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS,
  },
});
