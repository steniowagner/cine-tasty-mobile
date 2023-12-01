import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

import metrics from '@/styles/metrics';

export const LoadingEpisodeWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
`;

export const sheet = StyleSheet.create({
  title: {
    width: '85%',
    height: metrics.xl * 1.8,
    borderRadius: metrics.sm,
  },
  season: {
    width: '50%',
    height: metrics.xl * 1.8,
    borderRadius: metrics.sm,
    marginTop: metrics.sm,
  },
  votes: {
    width: '25%',
    height: metrics.xl * 1.8,
    borderRadius: metrics.sm,
    marginTop: metrics.sm,
  },
  episodeHalfLength: {
    width: '75%',
    height: metrics.xl * 1.8,
    borderRadius: metrics.sm,
    marginTop: metrics.sm,
  },
  episodeFullLength: {
    width: '100%',
    height: metrics.xl * 1.8,
    borderRadius: metrics.sm,
    marginTop: metrics.sm,
  },
});
