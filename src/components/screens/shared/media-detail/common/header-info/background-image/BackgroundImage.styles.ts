import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import * as Types from '@local-types';

type SmokeShadowStyleProps = {
  currentTheme: Types.ThemeId;
};

export const Wrapper = styled(View)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('50%')}px;
`;

export const SmokeShadow = styled(LinearGradient).attrs<SmokeShadowStyleProps>(
  ({currentTheme, theme}) => {
    if (currentTheme === Types.ThemeId.DARK) {
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
  },
)`
  width: 100%;
  height: 100%;
  position: absolute;
`;
