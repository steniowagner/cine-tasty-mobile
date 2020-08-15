import { DefaultTheme } from 'styled-components';

import { ThemeID } from 'types';
import metrics from '../metrics';

const dark: DefaultTheme = {
  id: ThemeID.DARK,
  colors: {
    primary: '#4674F8',
    lightPrimary: 'rgba(70, 117, 248, 0.4)',
    secondary: '#11141a',
    background: '#262626',
    contrast: '#4d4d4d',
    text: '#FFF',
    subText: 'rgba(255, 255, 255, 0.5)',
    androidToolbar: '#222',
    inactiveWhite: '#bbb',
    loadingColors: ['#353535', '#4f4f4f'],
    darkLayer: 'rgba(0, 0, 0, 0.4)',
    popup: '#rgba(0, 0, 0, 0.9)',
  },
  metrics,
};

export default dark;
