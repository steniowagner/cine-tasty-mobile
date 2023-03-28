import metrics from '@styles/metrics';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

import * as EpisodeListItemStyles from '../episode-list-item/EpisodesListItem.styles';
import * as SeasonsDetailsStyles from '../SeasonsDetails.styles';

export const HeaderWrapper = styled(View)`
  flex-direction: row;
`;

export const TextsPlaceholdersWrapper = styled(View)`
  margin-left: ${({theme}) => theme.metrics.mediumSize}px;
  justify-content: center;
`;

export const EpisodeWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${SeasonsDetailsStyles.LINE_DIVIDER_MARGIN_BOTTOM}px;
  margin-left: ${SeasonsDetailsStyles.LINE_DIVIDER_MARGIN_BOTTOM}px;
`;

export const sheet = StyleSheet.create({
  text: {
    width: metrics.getWidthFromDP('60%'),
    height: metrics.extraLargeSize,
    borderRadius: metrics.mediumSize,
    marginVertical: metrics.smallSize,
  },
  episodesText: {
    width: metrics.getWidthFromDP('40%'),
  },
  episodesTitle: {
    width: metrics.getWidthFromDP('65%'),
    marginHorizontal: metrics.mediumSize,
  },
  episodeIndex: {
    width: EpisodeListItemStyles.EPISODE_INDEX_WRAPPER_WIDTH,
    height: EpisodeListItemStyles.EPISODE_INDEX_WRAPPER_HEIGHT,
    borderRadius: EpisodeListItemStyles.EPISODE_INDEX_WRAPPER_BORDER_RADIUS,
    marginRight: metrics.smallSize,
  },
});
