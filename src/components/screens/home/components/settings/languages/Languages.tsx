import React from 'react';

import {OptionSettings} from '../option-settings/OptionSetting';
import {useLanguages} from './useLanguages';

export const Languages = () => {
  const languages = useLanguages();
  console.log('languages: ', languages.languages);
  console.log('selectedLanguage: ', languages.selectedLanguage);

  return (
    <>
      {languages.languages.map(language => (
        <OptionSettings
          isSelected={
            languages.selectedLanguage.toLowerCase() ===
            language.id.toLowerCase()
          }
          onPress={language.onPress}
          title={language.title}
          key={language.title}
        />
      ))}
    </>
  );
};
