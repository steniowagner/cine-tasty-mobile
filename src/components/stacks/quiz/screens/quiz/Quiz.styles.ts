import styled from 'styled-components/native';

import { WRAPPER_HEIGHT } from '@/navigation/components/tab-navigator/TabNavigator.styles';
import { Typography } from '@/components/common';

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  padding-top: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  padding-bottom: ${WRAPPER_HEIGHT}px;
`;

export const LargeText = styled(Typography.MediumText).attrs(() => ({
  alignment: 'center',
}))``;

export const SubText = styled(Typography.SmallText).attrs(({ theme }) => ({
  color: theme.colors.subText,
  alignment: 'center',
}))``;
