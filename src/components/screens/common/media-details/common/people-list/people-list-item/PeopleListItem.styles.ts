import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import metrics from '@styles/metrics';
import {CONSTANTS} from '@utils';

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');
const DEFAULT_WIDTH = metrics.getWidthFromDP('42%');
const DEFAULT_HEIGHT = metrics.getWidthFromDP('62%');

export const Wrapper = styled(TouchableOpacity)`
  width: ${DEFAULT_WIDTH}px;
  height: ${DEFAULT_HEIGHT}px;
  margin-right: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
`;

export const SmokeShadow = styled(LinearGradient).attrs(() => ({
  colors: [
    ...Array(4).fill('transparent'),
    'rgba(0, 0, 0, 0.6)',
    'rgba(0, 0, 0, 0.8)',
    'rgba(0, 0, 0, 1)',
  ],
}))`
  width: 100%;
  height: 100%;
  bottom: 0;
  position: absolute;
  border-bottom-left-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  border-bottom-right-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
`;

export const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
`;

export const TextContentWrapper = styled(View)`
  height: 100%;
  justify-content: flex-end;
  margin-horizontal: ${({theme}) => theme.metrics.mediumSize}px;
  padding-bottom: ${({theme}) => theme.metrics.mediumSize}px;
  position: absolute;
`;

export const PersonNameText = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: ${({theme}) => theme.metrics.extraLargeSize}px;
  color: white;
  font-family: CircularStd-Bold;
`;

export const PersonSubText = styled(Text).attrs({
  numberOfLines: 4,
})`
  margin-top: ${({theme}) => theme.metrics.extraSmallSize}px;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.primary};
  font-family: CircularStd-Medium;
`;

export const FallbackImageWrapper = styled(Animated.View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;

export const sheet = StyleSheet.create({
  image: {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    borderRadius: metrics.extraSmallSize,
  },
});
