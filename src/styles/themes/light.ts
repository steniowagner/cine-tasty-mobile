import { DefaultTheme } from 'styled-components';

import { ThemeID } from '../../types';
import metrics from '../metrics';

const light: DefaultTheme = {
  id: ThemeID.LIGHT,
  colors: {
    primary: '#FFD700',
    secondary: '#FFF',
    background: '#F2F2F2',
    text: 'rgba(0, 0, 0, 0.8)',
    subText: 'rgba(0, 0, 0, 0.4)',
    androidToolbar: '#F2F2F2',
    inactiveWhite: '#bbb',
    shimmer: ['#FFD700', '#F2F2F2', '#FFD700'],
  },
  metrics,
};

export default light;
