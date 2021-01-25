import { DefaultTheme } from 'styled-components';

import { ThemeId } from 'types';

import metrics from '../metrics';

export const dark: DefaultTheme = {
  id: ThemeId.DARK,
  colors: {
    primary: '#FFD700',
    secondary: '#111111',
    background: '#222222',
    backgroundAlphax1: 'rgba(38, 38, 38, 0.8)',
    backgroundAlphax2: 'rgba(38, 38, 38, 0.6)',
    backgroundAlphax3: 'rgba(38, 38, 38, 0.4)',
    backgroundAlphax4: 'rgba(38, 38, 38, 0.2)',
    contrast: '#4d4d4d',
    text: '#FFFFFF',
    subText: 'rgba(255, 255, 255, 0.5)',
    androidToolbar: '#222',
    inactiveWhite: '#AAAAAA',
    loadingColors: ['#353535', '#4f4f4f'],
    darkLayer: 'rgba(0, 0, 0, 0.4)',
    popup: 'rgba(0, 0, 0, 0.9)',
    fallbackImageBackground: '#cfcfcf',
    fallbackImageIcon: '#4d4d4d',
    buttonText: '#262626',
    inputBackground: '#4d4d4d',
  },
  metrics,
};
