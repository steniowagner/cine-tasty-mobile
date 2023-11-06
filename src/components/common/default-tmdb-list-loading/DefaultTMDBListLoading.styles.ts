import styled from 'styled-components/native';

import {
  DEFAULT_MARGIN_LEFT,
  DEFAULT_HEIGHT,
} from '../default-tmdb-list-item/DefaultTMDBListItem.styles';
import metrics from '@/styles/metrics';

const NUMBER_OF_COLUMNS = 3;
export const NUMBER_OF_LOADING_ITEMS = Math.ceil(
  NUMBER_OF_COLUMNS * (metrics.height / DEFAULT_HEIGHT) + 1,
);

export const LoadingWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.metrics.md}px;
  padding-horizontal: ${DEFAULT_MARGIN_LEFT}px;
`;
