import { StyleSheet, ViewProps } from 'react-native';
import styled, { IStyledComponent } from 'styled-components/native';
import { Substitute } from 'styled-components/native/dist/types';

import { Typography } from '@common-components';
import { dark, light } from '@styles/themes';
import { borderRadius } from '@styles/border-radius';
import metrics from '@styles/metrics';

export const DEFAULT_MODAL_SHEET_HEIGHT = metrics.getHeightFromDP('60%');
const DEFAULT_BACKGROUND_WHITE = dark.colors.text;

type BottomGapSectionStyleProps = {
  height: number;
  hasCtaButton: boolean;
};

export const GripWrapper = styled.View`
  width: 100%;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.metrics.md}px;
`;

export const Grip = styled.View`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('1.5%')}px;
  border-radius: ${({ theme }) => theme.metrics.xl}px;
  background-color: ${({ theme }) => theme.colors.inactiveWhite};
`;

export const Title = styled(Typography.SmallText).attrs(({ theme }) => ({
  color: theme.colors.buttonText,
  alignment: 'center',
  bold: true,
}))`
  margin-horizontal: ${({ theme }) => theme.metrics.lg}px;
  margin-bottom: ${({ theme }) => theme.metrics.lg}px;
`;

export const LineDivider = styled.View`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('0.5%')}px;
  background-color: ${light.colors.androidToolbar};
`;

export const ListHeaderWrapper = styled.View`
  margin-top: ${({ theme }) => theme.metrics.sm}px;
`;

export const BottomGapSection: IStyledComponent<
  'native',
  Substitute<ViewProps, BottomGapSectionStyleProps>
> = styled.View<BottomGapSectionStyleProps>`
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: ${({ hasCtaButton, theme }) =>
    hasCtaButton ? theme.colors.primary : DEFAULT_BACKGROUND_WHITE};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const sheet = StyleSheet.create({
  backgroundDarkLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: dark.colors.darkLayer,
  },
  card: {
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
    backgroundColor: DEFAULT_BACKGROUND_WHITE,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gestureHandlerRootView: {
    width: '100%',
    height: '100%',
  },
});
