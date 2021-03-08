import { useMemo } from 'react';
import { StatusBarStyle } from 'react-native';
import { DefaultTheme } from 'styled-components';

import { useSystemThemePreference } from 'hooks';
import { ThemeId } from 'types';

type Props = {
  theme: DefaultTheme;
};

type State = {
  barStyle: StatusBarStyle;
};

export const useStatusBarStyle = ({ theme }: Props): State => {
  const { systemTheme } = useSystemThemePreference();

  const barStyleBasedSystemPreferences = useMemo(
    () => (systemTheme === ThemeId.LIGHT ? 'dark-content' : 'light-content'),
    [systemTheme],
  );

  const barStyle = useMemo(() => {
    if (theme.id === ThemeId.SYSTEM) {
      return barStyleBasedSystemPreferences;
    }

    if (theme.id === ThemeId.LIGHT) {
      return 'dark-content';
    }

    return 'light-content';
  }, [theme]);

  return {
    barStyle,
  };
};
