import {Animated, View} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import * as Types from '@local-types';

export const BackgroundImageWrapper = styled(Animated.View)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('100%')}px;
  position: absolute;
`;

type SmokeShadowStyleProps = {
  currentTheme: Types.ThemeId;
};

export const SmokeShadow = styled(LinearGradient).attrs<SmokeShadowStyleProps>(
  ({currentTheme, theme}) => {
    const backgroundAlphax4Count = currentTheme === Types.ThemeId.DARK ? 1 : 5;

    return {
      colors: [
        ...Array(backgroundAlphax4Count).fill(theme.colors.backgroundAlphax4),
        theme.colors.backgroundAlphax3,
        theme.colors.backgroundAlphax2,
        theme.colors.backgroundAlphax1,
        theme.colors.background,
      ],
    };
  },
)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getWidthFromDP('100%')}px;
  position: absolute;
  bottom: 0;
`;

export const BiographySectionWrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.getWidthFromDP('5%')}px;
`;

export const ImagesSectionWrapper = styled(View)`
  margin-bottom: ${({theme}) => theme.metrics.extraLargeSize}px;
`;
