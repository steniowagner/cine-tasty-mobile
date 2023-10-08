import 'styled-components';

import { borderRadius } from './border-radius';
import typography from './typography';
import { ThemeId } from '../types';

declare module 'styled-components/native' {
  export type Colors = {
    fallbackImageBackground: string;
    backgroundAlphax1: string;
    backgroundAlphax2: string;
    backgroundAlphax3: string;
    backgroundAlphax4: string;
    backgroundAlphax5: string;
    fallbackImageIcon: string;
    loadingColor: string;
    primary: string;
    popup: string;
    secondary: string;
    buttonText: string;
    contrast: string;
    background: string;
    text: string;
    subText: string;
    androidToolbar: string;
    inactiveWhite: string;
    darkLayer: string;
    inputBackground: string;
    red: string;
    green: string;
    white: string;
  };

  export type Metrics = {
    getHeightFromDP: (px: string) => number;
    getWidthFromDP: (px: string) => number;
    navigationHeaderFontSize: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    width: number;
    height: number;
  };

  export type BorderRadius = typeof borderRadius;

  export type TypographyValues = typeof typography;

  export interface DefaultTheme {
    borderRadius: BorderRadius;
    typography: Typography;
    id: ThemeId;
    metrics: Metrics;
    colors: Colors;
  }
}
