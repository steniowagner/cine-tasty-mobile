import { View } from 'react-native';
import styled from 'styled-components';

export const LoadingWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const TextLoadingWrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;
