import { useMemo } from 'react';
import { useColorScheme } from 'react-native-appearance';

import { ThemeId } from 'types';

type State = {
  systemTheme: ThemeId;
};

const useSystemThemePreference = (): State => {
  const systemColorScheme = useColorScheme();

  const systemTheme = useMemo(() => {
    if (systemColorScheme === 'light') {
      return ThemeId.LIGHT;
    }

    return ThemeId.DARK;
  }, [systemColorScheme]);

  return {
    systemTheme,
  };
};

export default useSystemThemePreference;
