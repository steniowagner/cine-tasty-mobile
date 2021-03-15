import { useMemo } from 'react';
import { DefaultTheme } from 'styled-components';

import { useSystemThemePreference } from 'hooks';
import { ThemeId } from 'types';

type Props = {
  theme: DefaultTheme;
};

type State = {
  currentTheme: ThemeId;
};

export const useGetCurrentTheme = ({ theme }: Props): State => {
  const { systemTheme } = useSystemThemePreference();

  const currentTheme = useMemo(() => {
    if (theme.id === ThemeId.SYSTEM) {
      return systemTheme;
    }

    return theme.id;
  }, [systemTheme, theme]);

  return {
    currentTheme,
  };
};
