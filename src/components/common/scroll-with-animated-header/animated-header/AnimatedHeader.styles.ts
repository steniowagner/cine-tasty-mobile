import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { isEqualsOrLargerThanIphoneX } from '../../../../utils/is-equals-or-larger-than-iphonex/is-equals-or-larger-than-iphonex';
import { getStatusBarHeight } from '../../../../utils/status-bar-height/get-statusbar-height';
import typography from '@styles/typography';
import metrics from '@styles/metrics';

const IOS_NON_MONOBROWN_EXTRA_HEIGHT = metrics.xl * 2.25;
const IOS_MONOBROWN_EXTRA_HEIGHT = metrics.lg * 3.5;

const headerHeight = () => {
  const baseIOSHeader = isEqualsOrLargerThanIphoneX()
    ? IOS_MONOBROWN_EXTRA_HEIGHT
    : IOS_NON_MONOBROWN_EXTRA_HEIGHT;
  return Platform.select({
    ios: getStatusBarHeight() + baseIOSHeader,
    android: getStatusBarHeight() + metrics.xl,
  });
};

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Gap = styled.View`
  width: ${({ theme }) => theme.metrics.xl * 2}px;
`;

export const TitleWrapper = styled.View`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('80')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.lg}px;
`;

export const sheet = StyleSheet.create({
  title: {
    ...typography.xs({ bold: true }),
    textAlign: 'center',
  },
  header: {
    width: '100%',
    height: headerHeight(),
    justifyContent: 'flex-end',
    paddingBottom: metrics.md,
  },
});
