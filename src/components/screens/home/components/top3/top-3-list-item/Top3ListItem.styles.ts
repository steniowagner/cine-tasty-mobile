import {View, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import metrics from '@styles/metrics';
import {dark} from '@styles/themes';

export const ITEM_HEIGHT = metrics.getHeightFromDP('58%');
export const ITEM_MARGING = metrics.getWidthFromDP('12.5%');
export const ITEM_WIDTH = metrics.getWidthFromDP('75%');
export const ITEM_BORDER_RADIUS = metrics.mediumSize;
export const ITEM_MARGING_TOP = metrics.getWidthFromDP('14%');

type ItemWrapperStyleProps = {
  index: number;
};

export const Wrapper = styled(Animated.View)<ItemWrapperStyleProps>`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
`;

export const TextContentWrapper = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: ${({theme}) => theme.metrics.getWidthFromDP('10%')}px;
`;

export const TitleText = styled(Text).attrs({
  numberOfLines: 3,
})`
  margin-horizontal: ${({theme}) => theme.metrics.mediumSize}px;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  color: ${dark.colors.text};
  font-family: CircularStd-Black;
  text-align: center;
`;

export const GenreText = styled(Text)`
  margin-bottom: ${({theme}) => theme.metrics.largeSize}px;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${dark.colors.text};
  font-family: CircularStd-Bold;
  text-align: center;
`;

export const LearnMoreButtonWrapper = styled(View)`
  width: 80%;
`;

export const SmokeShadow = styled(LinearGradient).attrs(() => ({
  colors: [
    'transparent',
    'transparent',
    dark.colors.backgroundAlphax2,
    dark.colors.backgroundAlphax1,
    dark.colors.backgroundAlphax1,
    dark.colors.backgroundAlphax1,
  ],
}))`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT + 2}px;
  border-radius: ${ITEM_BORDER_RADIUS}px;
  position: absolute;
`;

export const StarsWrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.extraSmallSize}px;
  margin-bottom: ${({theme}) => theme.metrics.smallSize}px;
`;

export const sheet = StyleSheet.create({
  left: {
    marginLeft: ITEM_MARGING,
  },
  middle: {
    marginHorizontal: metrics.extraLargeSize,
  },
  right: {
    marginRight: ITEM_MARGING,
  },
});
