import { View } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  padding-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  bottom: 0;
  right: 0;
`;
