import {TouchableOpacity, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {CONSTANTS} from '@utils';
import metrics from '@styles/metrics';

export const EPISODE_INDEX_WRAPPER_WIDTH = metrics.getWidthFromDP('12%');
export const EPISODE_INDEX_WRAPPER_HEIGHT = metrics.getWidthFromDP('12%');
export const EPISODE_INDEX_WRAPPER_BORDER_RADIUS = metrics.getWidthFromDP('6%');

export const ListItemWrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  margin-bottom: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const EpisodeNameText = styled(Text).attrs({
  numberOfLines: 2,
})`
  width: 75%;
  margin-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  font-size: ${({theme}) => theme.metrics.largeSize * 1.1}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Bold;
`;

export const EpisodeIndexText = styled(Text)`
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({theme}) => theme.colors.buttonText};
  font-family: CircularStd-Black;
`;

export const EpisodeIndexWrapper = styled(View)`
  width: ${EPISODE_INDEX_WRAPPER_WIDTH}px;
  height: ${EPISODE_INDEX_WRAPPER_HEIGHT}px;
  justify-content: center;
  align-items: center;
  border-radius: ${EPISODE_INDEX_WRAPPER_BORDER_RADIUS}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;
