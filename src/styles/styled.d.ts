import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
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
      backgroundAlphax1: string;
      backgroundAlphax2: string;
      backgroundAlphax3: string;
      backgroundAlphax4: string;
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
