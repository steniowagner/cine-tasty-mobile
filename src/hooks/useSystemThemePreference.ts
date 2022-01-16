import {useMemo} from 'react';
import {Appearance} from 'react-native';

import * as Types from '@local-types';

export const useSystemThemePreference = () => {
  const systemTheme = useMemo(() => {
    const colorScheme = Appearance.getColorScheme();

    if (colorScheme === 'light') {
      return Types.ThemeId.LIGHT;
    }

    return Types.ThemeId.DARK;
  }, []);

  return {
    systemTheme,
  };
};
