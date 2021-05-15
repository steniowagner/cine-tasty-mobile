import { useMemo } from 'react';
import { DefaultTheme } from 'styled-components';

import * as Types from '@local-types';

import { useSystemThemePreference } from './useSystemThemePreference';

type UseGetCurrentThemeProps = {
  theme: DefaultTheme;
};

export const useGetCurrentTheme = (props: UseGetCurrentThemeProps) => {
  const { systemTheme } = useSystemThemePreference();

  const currentTheme = useMemo(() => {
    if (props.theme.id === Types.ThemeId.SYSTEM) {
      return systemTheme;
    }

    return props.theme.id;
  }, [systemTheme, props.theme]);

  return {
    currentTheme,
  };
};
