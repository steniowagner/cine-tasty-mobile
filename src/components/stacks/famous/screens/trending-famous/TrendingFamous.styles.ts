import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import {
  DEFAULT_MARGIN_LEFT,
  DEFAULT_HEIGHT,
} from '@/components/common/default-tmdb-list-item/DefaultTMDBListItem.styles';
import metrics from '@styles/metrics';

export const NUMBER_OF_COLUMNS = 3;
export const NUMBER_OF_LOADING_ITEMS = Math.ceil(
  NUMBER_OF_COLUMNS * (metrics.height / DEFAULT_HEIGHT) + 1,
);
export const sheet = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: metrics.md,
  },
});

export const LoadingWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.metrics.md}px;
  padding-horizontal: ${DEFAULT_MARGIN_LEFT}px;
`;
