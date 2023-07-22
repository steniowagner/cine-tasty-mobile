import React from 'react';

import {OptionSettings} from '../option-settings/OptionSetting';
import {useThemeSettings} from './useThemeSettings';

export const ThemeSettings = () => {
  const themeSettings = useThemeSettings();
  return (
    <>
      {themeSettings.options.map(theme => (
        <OptionSettings
          isSelected={theme.id === themeSettings.selectedTheme}
          onPress={theme.onPress}
          title={theme.title}
          key={theme.title}
        />
      ))}
    </>
  );
};
