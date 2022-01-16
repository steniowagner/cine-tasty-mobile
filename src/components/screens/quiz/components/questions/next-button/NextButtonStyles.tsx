import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

export const NextTouchable = styled(TouchableOpacity)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom-left-radius: ${({ theme }) => theme.metrics.smallSize}px;
  border-bottom-right-radius: ${({ theme }) => theme.metrics.smallSize}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const NextText = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.buttonText};
  text-align: center;
  text-transform: uppercase;
`;
