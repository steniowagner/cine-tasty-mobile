import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const LoadingList = styled.View`
  flex: 1;
`;

export const sheet = StyleSheet.create({
  placeholder: {
    width: '100%',
    height: metrics.getWidthFromDP('8'),
    borderRadius: metrics.xs,
  },
});
