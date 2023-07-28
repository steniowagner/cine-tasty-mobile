import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

import * as MediaListItemStyles from '../../../../../../../common/media-list-item/MediaListItem.styles';
import * as SearchMediaListStyles from '../SearchMedia.styles';

export const Wrapper = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-horizontal: ${SearchMediaListStyles.sheet.contentContainerStyle
    .paddingHorizontal}px;
  padding-top: ${SearchMediaListStyles.sheet.contentContainerStyle
    .paddingTop}px;
`;

export const sheet = StyleSheet.create({
  loadingItem: {
    width: MediaListItemStyles.LAYOUT_MEASURES.medium.width,
    height:
      MediaListItemStyles.LAYOUT_MEASURES.medium.height +
      metrics.getWidthFromDP('15%'),
    borderRadius: metrics.smallSize,
    marginBottom: SearchMediaListStyles.SEPARATOR_HEIGHT,
  },
});
