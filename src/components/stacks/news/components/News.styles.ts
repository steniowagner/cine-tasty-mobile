import styled from 'styled-components/native';

import { WRAPPER_HEIGHT } from '@/navigation/components/tab-navigator/TabNavigator.styles';
import metrics from '@styles/metrics';

import { imageWrapper } from './news-list-item/NewsListItem.styles';

export const LIST_ITEM_HEIGHT = imageWrapper.height + 2 * metrics.md;

export const Container = styled.View`
  flex: 1;
  padding-bottom: ${WRAPPER_HEIGHT}px;
`;
