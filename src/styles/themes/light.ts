import { DefaultTheme } from 'styled-components';

import { ThemeID } from 'types';
import metrics from '../metrics';

const light: DefaultTheme = {
  id: ThemeID.LIGHT,
  colors: {
    primary: '#FFD700',
    lightPrimary: 'rgba(70, 117, 248, 0.5)',
    secondary: '#FFFFFF',
    background: '#EBEBEB',
    contrast: '#4d4d4d',
    text: 'rgba(0, 0, 0, 0.8)',
    subText: 'rgba(0, 0, 0, 0.4)',
    androidToolbar: '#F2F2F2',
    inactiveWhite: '#bbb',
    loadingColors: ['#FFD700', '#F2F2F2'],
    darkLayer: 'rgba(0, 0, 0, 0.4)',
    popup: '#rgba(0, 0, 0, 0.9)',
  },
  metrics,
};

export default light;
