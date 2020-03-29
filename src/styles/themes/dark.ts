import { DefaultTheme } from 'styled-components';

import { ThemeID } from '../../types';
import metrics from '../metrics';

const dark: DefaultTheme = {
  id: ThemeID.DARK,
  colors: {
    primary: '#4674F8',
    lightPrimary: 'rgba(70, 117, 248, 0.4)',
    secondary: '#111',
    background: '#222222',
    text: '#FFF',
    subText: 'rgba(255, 255, 255, 0.5)',
    androidToolbar: '#222',
    inactiveWhite: '#bbb',
    shimmer: ['#353535', '#4f4f4f', '#353535'],
    darkLayer: 'rgba(0, 0, 0, 0.4)',
  },
  metrics,
};

export default dark;
