import styled from 'styled-components/native';

import { Typography } from '@/components/common';

export const Wrapper = styled.View`
  flex-direction: column;
  padding-top: ${({ theme }) => theme.metrics.xl}px;
  padding-horizontal: ${({ theme }) => theme.metrics.lg}px;
`;

export const RecentText = styled(Typography.ExtraSmallText)`
  margin-bottom: ${({ theme }) => theme.metrics.xl}px;
`;
