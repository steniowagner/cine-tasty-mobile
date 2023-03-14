import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import * as Types from '@local-types';
import metrics from '@styles/metrics';

const DEFAULT_HEIGHT = metrics.getHeightFromDP('75%');
const DEFAULT_WIDTH = metrics.width;

export const Wrapper = styled(View)`
  width: ${DEFAULT_WIDTH}px;
  height: ${DEFAULT_HEIGHT}px;
  position: absolute;
`;

export const SmokeShadow = styled(LinearGradient).attrs(({theme}) => {
  if (theme.id === Types.ThemeId.DARK) {
    return {
      colors: [
        ...Array(5).fill('transparent'),
        theme.colors.backgroundAlphax4,
        theme.colors.backgroundAlphax3,
        theme.colors.backgroundAlphax2,
        theme.colors.backgroundAlphax1,
        theme.colors.background,
      ],
    };
  }
  return {
    colors: [
      ...Array(5).fill(theme.colors.backgroundAlphax4),
      theme.colors.backgroundAlphax3,
      theme.colors.backgroundAlphax2,
      theme.colors.background,
    ],
  };
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const BackgroundImage = styled(Image)`
  width: ${DEFAULT_WIDTH}px;
  height: ${DEFAULT_HEIGHT}px;
`;
