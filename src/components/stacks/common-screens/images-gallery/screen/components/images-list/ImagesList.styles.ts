import metrics from '@/styles/metrics';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const PlaceholderListItem = styled.View`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
`;

export const sheet = StyleSheet.create({
  flatlist: {
    marginTop: metrics.getHeightFromDP('20'),
  },
});
