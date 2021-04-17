import React from 'react';

import OptionSettings from '../option-settings/OptionSetting';
import useThemeSettings from './useThemeSettings';

const Languages = () => {
  const { selectedTheme, themeOptions } = useThemeSettings();

  return (
    <>
      {themeOptions.map((theme) => (
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

export default Languages;
