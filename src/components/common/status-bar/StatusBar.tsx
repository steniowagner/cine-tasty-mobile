import React from 'react';
import { StatusBar } from 'react-native';

import { useStatusBar } from './use-status-bar';

export const StatusBarStyled = () => {
  const statusBar = useStatusBar();

  return (
    <StatusBar
      barStyle={statusBar.barStyle}
      backgroundColor={statusBar.backgroundColor}
      animated
    />
  );
};
