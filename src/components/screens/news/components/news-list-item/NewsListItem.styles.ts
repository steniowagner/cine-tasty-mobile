import styled from 'styled-components/native';

import { Typography } from '@common-components';
import metrics from '@styles/metrics';
import { borderRadius } from '@styles/border-radius';
import { ThemeId } from '@/types';

export const Wrapper = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.md}px;
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
`;

export const LoadingWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.sm}px;
  padding-horizontal: ${({ theme }) => theme.metrics.lg}px;
`;

export const TextWrapper = styled.View`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('55%')}px;
  margin-left: ${({ theme }) => theme.metrics.md}px;
`;

export const SourceText = styled(Typography.ExtraSmallText).attrs(
  ({ theme }) => ({
    numberOfLines: 1,
    color:
      theme.id === ThemeId.DARK
        ? theme.colors.primary
        : theme.colors.buttonText,
  }),
)``;

export const NewsText = styled(Typography.ExtraSmallText).attrs(
  ({ theme }) => ({
    color: theme.id === ThemeId.DARK ? theme.colors.text : theme.colors.subText,
  }),
)`
  margin-vertical: ${({ theme }) => theme.metrics.md}px;
`;

export const imageWrapper = {
  width: metrics.getWidthFromDP('35'),
  height: metrics.getWidthFromDP('30'),
  borderRadius: borderRadius.sm,
};
