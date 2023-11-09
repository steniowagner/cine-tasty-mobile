import styled from 'styled-components/native';

import { Typography } from '..';

export const Wrapper = styled.View`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.xl}px;
`;

export const Title = styled(Typography.SmallText).attrs({ bold: true })`
  margin-bottom: ${({ theme }) => theme.metrics.xs}px;
  margin-left: ${({ theme }) => theme.metrics.md}px;
`;
