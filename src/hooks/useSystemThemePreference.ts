import { useMemo } from 'react';
import { useColorScheme } from 'react-native-appearance';

import * as Types from '@local-types';

export const useSystemThemePreference = () => {
  const systemColorScheme = useColorScheme();

  const systemTheme = useMemo(() => {
    if (systemColorScheme === 'light') {
      return Types.ThemeId.LIGHT;
    }

    return Types.ThemeId.DARK;
  }, [systemColorScheme]);

  return {
    systemTheme,
  };
};
