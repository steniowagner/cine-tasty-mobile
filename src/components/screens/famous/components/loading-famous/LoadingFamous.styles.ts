import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

import * as FamousListItemStyles from '../famous-list-item/FamousListItem.styles';

export const Wrapper = styled(View)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: ${({theme}) => theme.metrics.mediumSize}px;
  padding-horizontal: ${FamousListItemStyles.DEFAULT_MARGIN_LEFT}px;
`;

export const sheet = StyleSheet.create({
  loading: {
    width: FamousListItemStyles.DEFAULT_WIDTH,
    height: FamousListItemStyles.DEFAULT_HEIGHT,
    borderRadius: FamousListItemStyles.DEFAULT_BORDER_RADIUS,
    marginBottom: FamousListItemStyles.DEFAULT_MARGIN_BOTTOM,
  },
});
