import { View } from 'react-native';
import styled from 'styled-components';

export const SeeSeasonsButtonWrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
`;
