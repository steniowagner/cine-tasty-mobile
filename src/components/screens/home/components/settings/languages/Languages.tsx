import React from 'react';

import {OptionSettings} from '../option-settings/OptionSetting';
import useLanguages from './useLanguages';

export const Languages = () => {
  const {selectedLanguage, languages} = useLanguages();

  return (
    <>
      {languages.map(language => (
        <OptionSettings
          isSelected={language.id === selectedLanguage}
          onPress={language.onPress}
          title={language.title}
          key={language.title}
        />
      ))}
    </>
  );
};
