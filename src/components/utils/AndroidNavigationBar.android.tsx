import React, { useEffect } from 'react';
import { View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { DefaultTheme, withTheme } from 'styled-components';

import * as Types from '@local-types';

type AndroidNavigationBarProps = {
  theme: DefaultTheme;
};

const AndroidNavigationBar = (props: AndroidNavigationBarProps) => {
  useEffect(() => {
    const isLight = Types.ThemeId.LIGHT === props.theme.id;

    changeNavigationBarColor(props.theme.colors.secondary, isLight, true);
  }, [props.theme]);

  return <View />;
};

export default withTheme(AndroidNavigationBar);
