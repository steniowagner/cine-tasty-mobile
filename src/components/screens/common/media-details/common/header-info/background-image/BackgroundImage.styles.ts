import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const DEFAULT_HEIGHT = metrics.getHeightFromDP('75%');
export const DEFAULT_WIDTH = metrics.width;
export const DEFAULT_BLUR_RADIUS = 2;
export const DEFAULT_ANIMATION_TIMING = 500;

export const SmokeShadow = styled(LinearGradient).attrs(({theme}) => ({
  colors: [
    ...Array(5).fill('transparent'),
    theme.colors.backgroundAlphax5,
    theme.colors.backgroundAlphax4,
    theme.colors.backgroundAlphax3,
    theme.colors.backgroundAlphax2,
    theme.colors.backgroundAlphax1,
    ...Array(5).fill(theme.colors.background),
  ],
}))`
  width: 100%;
  height: 70%;
  bottom: 0;
  position: absolute;
`;

export const BackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
`;
