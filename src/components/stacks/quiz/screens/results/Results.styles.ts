import metrics from '@/styles/metrics';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const PlayAgainButtonWrapper = styled.View`
  position: absolute;
  bottom: ${({ theme }) => theme.metrics.lg * 2}px;
`;

export const sheet = StyleSheet.create({
  list: {
    paddingBottom: metrics.lg * 4,
    paddingHorizontal: metrics.lg,
    paddingTop: metrics.lg,
  },
});
