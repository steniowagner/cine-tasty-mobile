import 'styled-components';

import { ThemeID } from '../types';

declare module 'styled-components' {
  export interface DefaultTheme {
    id: ThemeID;
    metrics: {
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
    colors: {
      fallbackImageBackground: string;
      fallbackImageIcon: string;
      loadingColors: string[];
      lightPrimary: string;
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
    };
  }
}
