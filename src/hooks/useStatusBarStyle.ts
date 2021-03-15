import { useMemo } from 'react';
import { StatusBarStyle } from 'react-native';
import { DefaultTheme } from 'styled-components';

import { ThemeId } from 'types';

import { useGetCurrentTheme } from './useGetCurrentTheme';

type Props = {
  theme: DefaultTheme;
};

type State = {
  barStyle: StatusBarStyle;
};

export const useStatusBarStyle = ({ theme }: Props): State => {
  const { currentTheme } = useGetCurrentTheme({ theme });

  const barStyle = useMemo(() => {
    if (currentTheme === ThemeId.LIGHT) {
      return 'dark-content';
    }

    return 'light-content';
  }, [currentTheme]);

  return {
    barStyle,
  };
};
