import React from 'react';

import useThemeSettings from './useThemeSettings';
import OptionSettings from '../OptionSetting';

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
