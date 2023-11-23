import { DefaultTheme } from 'styled-components/native';

import * as HeaderStyles from './header/Header.styles';

export const scrollWithAnimatedHeaderParams = (theme: DefaultTheme) => ({
  backgroudColor: {
    input: [
      0,
      HeaderStyles.POSTER_IMAGE_DEFAULT_HEIGHT / 2,
      HeaderStyles.POSTER_IMAGE_DEFAULT_HEIGHT,
    ],
    output: ['transparent', 'transparent', theme.colors.background],
  },
  title: {
    input: [
      0,
      HeaderStyles.POSTER_IMAGE_DEFAULT_HEIGHT +
        HeaderStyles.MEDIA_HEADLINE_MARGIN_TOP +
        HeaderStyles.MARGIN_TOP,
      HeaderStyles.POSTER_IMAGE_DEFAULT_HEIGHT +
        HeaderStyles.MEDIA_HEADLINE_MARGIN_TOP +
        HeaderStyles.MARGIN_TOP +
        theme.metrics.xl,
    ],
    output: [0, 0, 1],
  },
});
