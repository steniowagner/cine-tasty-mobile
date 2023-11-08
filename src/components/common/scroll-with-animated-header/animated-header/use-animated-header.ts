import { useTheme } from 'styled-components/native';
import {
  interpolateColor,
  useAnimatedStyle,
  SharedValue,
  interpolate,
} from 'react-native-reanimated';

import metrics from '@styles/metrics';

type UseAnimatedHeaderProps = {
  scrollViewPosition: SharedValue<number>;
  backgroundColorInterpolationInput: number[];
  backgroundColorInterpolationOutput: string[];
  titleOpacityInterpolationInput: number[];
  titleOpacityInterpolationOutput: number[];
};

export const useAnimatedHeader = (props: UseAnimatedHeaderProps) => {
  const theme = useTheme();

  const headerBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      props.scrollViewPosition.value,
      props.backgroundColorInterpolationInput,
      props.backgroundColorInterpolationOutput,
    );
    return {
      backgroundColor,
    };
  });

  const shadow = useAnimatedStyle(() => ({
    shadowColor: interpolateColor(
      props.scrollViewPosition.value,
      props.backgroundColorInterpolationInput,
      ['transparent', '#000000'],
    ),
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      props.scrollViewPosition.value,
      props.titleOpacityInterpolationInput,
      props.titleOpacityInterpolationOutput,
      'clamp',
    );
    const bottom = interpolate(
      props.scrollViewPosition.value,
      props.titleOpacityInterpolationInput,
      [-metrics.xs, -metrics.sm, 0],
      'clamp',
    );
    return {
      color: theme.colors.text,
      opacity,
      bottom,
    };
  });

  return {
    headerBackgroundColor,
    titleAnimatedStyle,
    shadow,
  };
};
