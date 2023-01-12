import {DefaultTheme} from 'styled-components/native';

import * as Types from '@local-types';

import metrics from '../metrics';

export const dark: DefaultTheme = {
  id: Types.ThemeId.DARK,
  colors: {
    primary: '#FFD700',
    secondary: '#111111',
    background: '#222222',
    backgroundAlphax1: 'rgba(34, 34, 34, 0.8)',
    backgroundAlphax2: 'rgba(34, 34, 34, 0.6)',
    backgroundAlphax3: 'rgba(34, 34, 34, 0.4)',
    backgroundAlphax4: 'rgba(34, 34, 34, 0.2)',
    backgroundAlphax5: 'rgba(34, 34, 34, 0.1)',
    contrast: '#4d4d4d',
    text: '#FFFFFF',
    subText: 'rgba(255, 255, 255, 0.5)',
    androidToolbar: '#222',
    inactiveWhite: '#AAAAAA',
    loadingColor: '#4A4A4A',
    darkLayer: 'rgba(0, 0, 0, 0.7)',
    popup: 'rgba(0, 0, 0, 0.9)',
    fallbackImageBackground: '#cfcfcf',
    fallbackImageIcon: '#4d4d4d',
    buttonText: '#262626',
    inputBackground: '#4d4d4d',
    red: '#D5233B',
    green: '#32BE70',
    white: '#FFFFFF',
  },
  metrics,
};
