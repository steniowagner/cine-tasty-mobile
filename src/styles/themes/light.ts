import { DefaultTheme } from 'styled-components';

import { ThemeId } from 'types';

import metrics from '../metrics';

export const light: DefaultTheme = {
  id: ThemeId.LIGHT,
  colors: {
    primary: '#FFD700',
    lightPrimary: 'rgba(70, 117, 248, 0.4)',
    secondary: '#11141a',
    background: '#F2F2F2',
    backgroundAlphax1: 'rgba(38, 38, 38, 0.8)',
    backgroundAlphax2: 'rgba(38, 38, 38, 0.6)',
    backgroundAlphax3: 'rgba(38, 38, 38, 0.4)',
    backgroundAlphax4: 'rgba(38, 38, 38, 0.2)',
    contrast: '#4d4d4d',
    text: 'rgba(0, 0, 0, 0.8)',
    subText: 'rgba(0, 0, 0, 0.4)',
    androidToolbar: '#F2F2F2',
    inactiveWhite: '#AAA',
    loadingColors: ['#AAA', '#CCC'],
    darkLayer: 'rgba(0, 0, 0, 0.4)',
    popup: '#rgba(0, 0, 0, 0.9)',
    fallbackImageBackground: '#cfcfcf',
    fallbackImageIcon: '#4d4d4d',
    buttonText: '#262626',
  },
  metrics,
};
