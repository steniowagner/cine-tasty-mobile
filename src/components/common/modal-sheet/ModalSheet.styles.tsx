import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { Typography } from '@common-components';
import { dark, light } from '@styles/themes';
import { borderRadius } from '@styles/border-radius';
import metrics from '@styles/metrics';

export const DEFAULT_MODAL_SHEET_HEIGHT = metrics.getHeightFromDP('60%');

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

export const sheet = StyleSheet.create({
  backgroundDarkLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: dark.colors.darkLayer,
  },
  bottomGap: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  card: {
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
    backgroundColor: dark.colors.white,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gestureHandlerRootView: {
    width: '100%',
    height: '100%',
  },
});
