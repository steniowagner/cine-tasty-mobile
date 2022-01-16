import { View } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const PlayAgainButtonWrapper = styled(View)`
  position: absolute;
  bottom: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
`;
