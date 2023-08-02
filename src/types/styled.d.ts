import 'styled-components/native';

import {ThemeId} from './index'

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
    progressiveImageBackground: string;
    modalTextContent: string;
    github: string;
    instagram: string;
    linkedin: string;
    searchBar: string;
    defaultShadow: {
      shadowColor: string,
      shadowOffset: {
        width: number;
        height: number;
      },
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    },
  };

  export type Metrics = {
    getHeightFromDP: (heightPercentage: string) => number;
    getWidthFromDP: (widthPercentage: string) => number;
    navigationHeaderFontSize: number;
    extraSmallSize: number;
    extraLargeSize: number;
    smallSize: number;
    mediumSize: number;
    largeSize: number;
    width: number;
    height: number;
  };

  interface Theme {
    id: ThemeId;
    metrics: Metrics;
    colors: Colors;
  }

  interface DefaultTheme extends Theme {}
}
