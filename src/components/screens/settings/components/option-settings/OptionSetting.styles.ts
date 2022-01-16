import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
`;

export const OptionTitle = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
`;
