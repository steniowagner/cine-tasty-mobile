import { DefaultTheme } from 'styled-components';

import { ThemeId } from 'types';

import metrics from '../metrics';

export const dark: DefaultTheme = {
  id: ThemeId.DARK,
  colors: {
    primary: '#FFD700',
    lightPrimary: 'rgba(70, 117, 248, 0.4)',
    secondary: '#111',
    background: '#222',
    backgroundAlphax1: 'rgba(38, 38, 38, 0.8)',
    backgroundAlphax2: 'rgba(38, 38, 38, 0.6)',
    backgroundAlphax3: 'rgba(38, 38, 38, 0.4)',
    backgroundAlphax4: 'rgba(38, 38, 38, 0.2)',
    contrast: '#4d4d4d',
    text: '#FFF',
    subText: 'rgba(255, 255, 255, 0.5)',
    androidToolbar: '#222',
    inactiveWhite: '#aaa',
    loadingColors: ['#353535', '#4f4f4f'],
    darkLayer: 'rgba(0, 0, 0, 0.4)',
    popup: '#rgba(0, 0, 0, 0.9)',
    fallbackImageBackground: '#cfcfcf',
    fallbackImageIcon: '#4d4d4d',
    buttonText: '#262626',
  },
  metrics,
};
