import { useMemo } from 'react';
import { DefaultTheme } from 'styled-components';

import * as Types from '@local-types';

import { useSystemThemePreference } from './useSystemThemePreference';

type Props = {
  theme: DefaultTheme;
};

export const useGetCurrentTheme = ({ theme }: Props) => {
  const { systemTheme } = useSystemThemePreference();

  const currentTheme = useMemo(() => {
    if (theme.id === Types.ThemeId.SYSTEM) {
      return systemTheme;
    }

    return theme.id;
  }, [systemTheme, theme]);

  return {
    currentTheme,
  };
};
