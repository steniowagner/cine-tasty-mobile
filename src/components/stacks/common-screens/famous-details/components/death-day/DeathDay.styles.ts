import styled from 'styled-components/native';

import { Typography } from '@common-components';
import { dark } from '@/styles/themes';

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  margin-left: ${({ theme }) => theme.metrics.md}px;
  margin-bottom: ${({ theme }) => theme.metrics.lg * 2}px;
  padding-horizontal: ${({ theme }) => theme.metrics.xs}px;
  padding-vertical: ${({ theme }) => theme.metrics.xs}px;
  border-radius: ${({ theme }) => theme.metrics.height}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const IconWrapper = styled.View`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('8')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('8')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.lg}px;
  margin0-left: ${({ theme }) => theme.metrics.sm}px;
  background-color: white;
`;

export const DateText = styled(Typography.ExtraSmallText).attrs({
  color: dark.colors.buttonText,
  alignment: 'center',
  bold: true,
})`
  margin-horizontal: ${({ theme }) => theme.metrics.sm}px;
`;
