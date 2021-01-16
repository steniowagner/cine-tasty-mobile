import { useMemo } from 'react';
import { StatusBarStyle } from 'react-native';
import { DefaultTheme } from 'styled-components';

import { ThemeId } from 'types';

type Props = {
  theme: DefaultTheme;
};

type State = {
  barStyle: StatusBarStyle;
};

export const useStatusBarStyle = ({ theme }: Props): State => {
  const barStyle = useMemo(() => {
    if (theme.id === ThemeId.LIGHT) {
      return 'dark-content';
    }

    return 'light-content';
  }, [theme]);

  return {
    barStyle,
  };
};
