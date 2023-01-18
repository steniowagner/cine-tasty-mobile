import {StyleSheet, View, Text} from 'react-native';
import styled from 'styled-components/native';

import {dark, light} from '@styles/themes';
import metrics from '@styles/metrics';

export const DEFAULT_MODAL_SHEET_HEIGHT = metrics.getHeightFromDP('60%');

const DEFAULT_BACKGROUND_WHITE = dark.colors.text;

type BottomGapSectionStyleProps = {
  height: number;
  hasCtaButton: boolean;
};

export const GripWrapper = styled(View)`
  width: 100%;
  align-items: center;
  padding-vertical: ${({theme}) => theme.metrics.mediumSize}px;
`;

export const Grip = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('16%')}px;
  height: ${({theme}) => theme.metrics.getWidthFromDP('1.5%')}px;
  border-radius: ${({theme}) => theme.metrics.extraLargeSize}px;
  background-color: ${({theme}) => theme.colors.inactiveWhite};
`;

export const Title = styled(Text)`
  margin-horizontal: ${({theme}) => theme.metrics.largeSize}px;
  margin-bottom: ${({theme}) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.extraLargeSize * 1.1}px;
  text-align: center;
  color: ${light.colors.text};
`;

export const LineDivider = styled(View)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('0.5%')}px;
  background-color: ${light.colors.androidToolbar};
`;

export const ListHeaderWrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.smallSize}px;
`;

export const BottomGapSection = styled(View)<BottomGapSectionStyleProps>`
  width: 100%;
  height: ${({height}) => height}px;
  background-color: ${({hasCtaButton, theme}) =>
    hasCtaButton ? theme.colors.primary : DEFAULT_BACKGROUND_WHITE};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const AnimatedStyles = StyleSheet.create({
  backgroundDarkLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: dark.colors.darkLayer,
  },
  card: {
    borderTopLeftRadius: metrics.mediumSize,
    borderTopRightRadius: metrics.mediumSize,
    backgroundColor: DEFAULT_BACKGROUND_WHITE,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
