import { DefaultTheme } from 'styled-components';

import { ThemeId } from '@app-types';

import { borderRadius } from '../border-radius';
import metrics from '../metrics';

export const light: DefaultTheme = {
  id: ThemeId.LIGHT,
  colors: {
    primary: '#FFD700',
    secondary: '#FFFFFF',
    background: '#F0F0F0',
    backgroundAlphax1: 'rgba(242,242,242, 0.8)',
    backgroundAlphax2: 'rgba(242,242,242, 0.6)',
    backgroundAlphax3: 'rgba(242,242,242, 0.4)',
    backgroundAlphax4: 'rgba(242,242,242, 0.2)',
    backgroundAlphax5: 'rgba(242,242,242, 0.1)',
    contrast: '#4d4d4d',
    text: '#111111',
    subText: '#4d4d4d',
    androidToolbar: '#F2F2F2',
    inactiveWhite: '#AAAAAA',
    loadingColor: '#AAAAAA',
    darkLayer: 'rgba(0, 0, 0, 0.4)',
    popup: 'rgba(0, 0, 0, 0.9)',
    fallbackImageBackground: '#cfcfcf',
    fallbackImageIcon: '#4d4d4d',
    buttonText: '#262626',
    inputBackground: '#CCCCCC',
    red: '#D5233B',
    green: '#32BE70',
    white: '#FFFFFF',
  },
  metrics,
  borderRadius,
};
