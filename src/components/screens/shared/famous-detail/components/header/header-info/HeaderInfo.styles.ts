import { View, Text } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  width: 100%;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

export const InfoWrapper = styled(View)`
  flex-direction: row;
`;

export const InfoTextWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('63%')}px;
`;

export const NameText = styled(Text)`
  width: 65%;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.text};
`;

export const TextContentWrapper = styled(View)`
  justify-content: center;
  padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;
