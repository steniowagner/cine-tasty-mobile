import {StyleSheet, Text} from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import metrics from '@styles/metrics';

import {getFamousListItemMeasures} from '../get-famous-list-item-measures/getFamousListItemMeasures';

const famousListItemMeasures = getFamousListItemMeasures(0);

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

export const PersonName = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-top: ${({theme}) => theme.metrics.smallSize}px;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  color: ${({theme}) => theme.colors.text};
`;

export const FallbackImageWrapper = styled(Animated.View)`
  width: 100%;
  height: 70%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;

export const sheet = StyleSheet.create({
  image: {
    width: famousListItemMeasures.width,
    height: famousListItemMeasures.height * 0.7,
    borderRadius: metrics.extraSmallSize,
  },
});
