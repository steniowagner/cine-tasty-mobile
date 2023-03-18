import metrics from '@styles/metrics';
import {useTheme} from 'styled-components/native';

import * as HeaderInfoStyles from '../common/header-info/header-info/HeaderInfo.styles';

export const useMakeAnimatedHeaderIntepolationParams = () => {
  const theme = useTheme();

  return {
    headerBackgroundColorInterpolationInput: [
      0,
      HeaderInfoStyles.POSTER_IMAGE_DEFAULT_HEIGHT / 2,
      HeaderInfoStyles.POSTER_IMAGE_DEFAULT_HEIGHT,
    ],
    headerBackgroundColorInterpolationOutput: [
      'transparent',
      'transparent',
      theme.colors.background,
    ],
    headerTitleOpacityInterpolationInput: [
      0,
      HeaderInfoStyles.POSTER_IMAGE_DEFAULT_HEIGHT +
        HeaderInfoStyles.MEDIA_HEADLINE_MARGIN_TOP +
        HeaderInfoStyles.BASE_MARGIN_TOP,
      HeaderInfoStyles.POSTER_IMAGE_DEFAULT_HEIGHT +
        HeaderInfoStyles.MEDIA_HEADLINE_MARGIN_TOP +
        HeaderInfoStyles.BASE_MARGIN_TOP +
        metrics.extraLargeSize,
    ],
    headerTitleOpacityInterpolationOutput: [0, 0, 1],
  };
};
