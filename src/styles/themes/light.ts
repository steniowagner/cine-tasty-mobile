import { DefaultTheme } from 'styled-components';

import { ThemeID } from 'types';
import metrics from '../metrics';

const light: DefaultTheme = {
  id: ThemeID.LIGHT,
  colors: {
    primary: 'rgba(70, 117, 248, 1)',
    lightPrimary: 'rgba(70, 117, 248, 0.5)',
    backgroundAlphax1: 'rgba(38, 38, 38, 0.8)',
    backgroundAlphax2: 'rgba(38, 38, 38, 0.6)',
    backgroundAlphax3: 'rgba(38, 38, 38, 0.4)',
    backgroundAlphax4: 'rgba(38, 38, 38, 0.2)',
    secondary: '#F5F5F5',
    background: '#F2F2F2',
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
    buttonText: 'white',
  },
  metrics,
};

export default light;
