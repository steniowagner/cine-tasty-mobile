import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const IconWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  background-color: rgba(0, 0, 0, 0.8);
`;
