import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import metrics from '@/styles/metrics';

export const Wrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.metrics.xl * 2}px;
`;

export const sheet = StyleSheet.create({
  flatlist: {
    paddingLeft: metrics.md,
    marginTop: metrics.sm,
  },
});
