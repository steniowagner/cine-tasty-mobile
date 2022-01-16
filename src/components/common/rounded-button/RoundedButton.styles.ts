import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(TouchableOpacity)`
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.metrics.width}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const ButtonText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.buttonText};
  font-family: CircularStd-Black;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1px;
`;
