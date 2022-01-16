import { Text, View } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const InfoCellWrapper = styled(View)`
  width: 46%;
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('1.5%')}px;
`;

export const InfoTitleText = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const InfoValueText = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.subText};
`;
