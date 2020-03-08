import { DefaultTheme } from 'styled-components';

import { ThemeID } from '../../types';
import metrics from '../metrics';

const dark: DefaultTheme = {
  id: ThemeID.DARK,
  colors: {
    primary: '#FFD700',
    secondary: '#111',
    background: '#222222',
    text: '#FFF',
    subText: 'rgba(255, 255, 255, 0.5)',
    androidToolbar: '#222',
    inactiveWhite: '#bbb',
  },
  metrics,
};

export default dark;
