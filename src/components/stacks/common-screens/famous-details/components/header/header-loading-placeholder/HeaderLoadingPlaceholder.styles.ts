import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

const DEFAULT_STYLE = {
  width: metrics.getWidthFromDP('60'),
  height: metrics.lg,
  borderRadius: metrics.height,
};

export const LoadingWrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.md}px;
  flex-direction: row;
  align-items: center;
`;

export const styles = StyleSheet.create({
  loadingItem: DEFAULT_STYLE,
  middleItem: {
    ...DEFAULT_STYLE,
    marginVertical: metrics.sm,
  },
});
