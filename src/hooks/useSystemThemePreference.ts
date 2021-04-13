import { useMemo } from 'react';
import { useColorScheme } from 'react-native-appearance';

import * as Types from '@local-types';

type State = {
  systemTheme: Types.ThemeId;
};

export const useSystemThemePreference = (): State => {
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
