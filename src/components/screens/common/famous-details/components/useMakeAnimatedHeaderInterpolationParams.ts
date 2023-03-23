import metrics from '@styles/metrics';
import {useTheme} from 'styled-components/native';

export const useMakeAnimatedHeaderIntepolationParams = () => {
  const theme = useTheme();

  return {
    headerBackgroundColorInterpolationInput: [
      0,
      metrics.extraLargeSize,
      metrics.getWidthFromDP('8%'),
    ],
    headerBackgroundColorInterpolationOutput: [
      'transparent',
      'transparent',
      theme.colors.background,
    ],
    headerTitleOpacityInterpolationInput: [
      0,
      metrics.getWidthFromDP('14%'),
      metrics.getWidthFromDP('24%'),
    ],
    headerTitleOpacityInterpolationOutput: [0, 0, 1],
  };
};
