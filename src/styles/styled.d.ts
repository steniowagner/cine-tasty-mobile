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
      primary: string;
      lightPrimary: string;
      popup: string;
      secondary: string;
      background: string;
      text: string;
      subText: string;
      androidToolbar: string;
      inactiveWhite: string;
      shimmer: string[];
      darkLayer: string;
    };
  }
}
