import React from 'react';

import OptionSettings from '../option-settings/OptionSetting';
import useThemeSettings from './useThemeSettings';

export const Theme = () => {
  const {selectedTheme, themeOptions} = useThemeSettings();

  return (
    <>
      {themeOptions.map(theme => (
        <OptionSettings
          isSelected={theme.id === selectedTheme}
          onPress={theme.onPress}
          title={theme.title}
          key={theme.title}
        />
      ))}
    </>
  );
};
