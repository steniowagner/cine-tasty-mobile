import {StatusBar} from 'react-native';
import styled from 'styled-components/native';

import {dark} from '@styles/themes';

export const StatusBarStyled = styled(StatusBar).attrs(({theme}) => ({
  barStyle:
    theme.colors.background === dark.colors.background
      ? 'light-content'
      : 'dark-content',
  backgroundColor: theme.colors.secondary,
  animated: true,
}))``;
