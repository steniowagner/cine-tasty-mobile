import {useMemo} from 'react';
import {Platform} from 'react-native';
import {
  interpolateColor,
  useAnimatedStyle,
  SharedValue,
  interpolate,
} from 'react-native-reanimated';
import {useTheme} from 'styled-components/native';
import {
  getStatusBarHeight,
  isIPhoneWithMonobrow,
} from 'react-native-status-bar-height';

import metrics from '@styles/metrics';

import * as Styles from './AnimatedHeader.styles';

const STATUS_BAR_HEIGHT = getStatusBarHeight();

type UseAnimatedHeaderProps = {
  scrollViewPosition: SharedValue<number>;
  headerBackgroundColorInterpolationInput: number[];
  headerBackgroundColorInterpolationOutput: string[];
  headerTitleOpacityInterpolationInput: number[];
  headerTitleOpacityInterpolationOutput: number[];
};

export const useAnimatedHeader = (props: UseAnimatedHeaderProps) => {
  const theme = useTheme();

  const headerHeight = useMemo(() => {
    const baseIOSHeader = isIPhoneWithMonobrow()
      ? Styles.IOS_MONOBROWN_EXTRA_HEIGHT
      : Styles.IOS_NON_MONOBROWN_EXTRA_HEIGHT;
    return Platform.select({
      ios: STATUS_BAR_HEIGHT + baseIOSHeader,
      android: STATUS_BAR_HEIGHT,
    });
  }, []);

  const headerBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      props.scrollViewPosition.value,
      props.headerBackgroundColorInterpolationInput,
      props.headerBackgroundColorInterpolationOutput,
    );
    return {
      backgroundColor,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      props.scrollViewPosition.value,
      props.headerTitleOpacityInterpolationInput,
      props.headerTitleOpacityInterpolationOutput,
    );
    const bottom = interpolate(
      props.scrollViewPosition.value,
      props.headerTitleOpacityInterpolationInput,
      [-metrics.extraSmallSize, -metrics.smallSize, 0],
      'clamp',
    );
    return {
      color: theme.colors.text,
      opacity,
      bottom,
    };
  });

  const baseAnimatedStyle = useAnimatedStyle(
    () => ({
      width: '100%',
      height: headerHeight,
      justifyContent: 'flex-end',
      paddingBottom: metrics.mediumSize,
    }),
    [headerHeight],
  );

  return {
    headerBackgroundColor,
    baseAnimatedStyle,
    titleAnimatedStyle,
  };
};
