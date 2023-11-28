import { useTheme } from 'styled-components/native';
import { StatusBarStyle } from 'react-native';

import { dark } from '@styles/themes';

export const useStatusBar = () => {
  const theme = useTheme();

  return {
    barStyle: (theme.id === dark.id
      ? 'light-content'
      : 'dark-content') as StatusBarStyle,
    backgroundColor: theme.colors.secondary,
  };
};
