import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CloseButtonWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
