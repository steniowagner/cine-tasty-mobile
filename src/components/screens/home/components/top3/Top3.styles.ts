import { Platform, View } from 'react-native';
import styled from 'styled-components';

import metrics from '@styles/metrics';

import * as Top3listItemStyles from './top-3-list-item/Top3ListItem.styles';

export const SNAP_INTERVAL = metrics.getWidthFromDP('80%');
export const INITIAL_SCROLL_POSITION = metrics.getWidthFromDP('80%');
export const SCROLL_CONTENT_OFFSET = metrics.getWidthFromDP('80%');

export const ListGap = styled(View)`
  height: 1px;
  width: ${Top3listItemStyles.ITEM_MARGING}px;
`;

export const ListWrapper = styled(View)`
  width: 100%;
  height: ${Top3listItemStyles.ITEM_HEIGHT + Top3listItemStyles.ITEM_MARGING_TOP}px;
  margin-top: ${({ theme }) => Platform.select({
    android: theme.metrics.getWidthFromDP('22%'),
    ios: theme.metrics.getWidthFromDP('28%'),
  })}px;
`;
