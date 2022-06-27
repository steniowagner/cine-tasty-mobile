import {StatusBar} from 'react-native';
import styled from 'styled-components/native';

import {ThemeId} from '@local-types';

export const StatusBarStyled = styled(StatusBar).attrs(({theme}) => ({
  barStyle: theme.id === ThemeId.LIGHT ? 'dark-content' : 'light-content',
  backgroundColor: theme.colors.secondary,
  animated: true,
}))``;
