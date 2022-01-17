import {useMemo} from 'react';
import {StatusBarStyle} from 'react-native';
import {DefaultTheme} from 'styled-components/native';

import * as Types from '@local-types';

import {useGetCurrentTheme} from './useGetCurrentTheme';

type UseStatusBarStyleProps = {
  theme: DefaultTheme;
};

type State = {
  barStyle: StatusBarStyle;
};

export const useStatusBarStyle = ({theme}: UseStatusBarStyleProps): State => {
  const {currentTheme} = useGetCurrentTheme({theme});

  const barStyle = useMemo(() => {
    if (currentTheme === Types.ThemeId.LIGHT) {
      return 'dark-content';
    }

    return 'light-content';
  }, [currentTheme]);

  return {
    barStyle,
  };
};
