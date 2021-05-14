import React from 'react';

import OptionSettings from '../option-settings/OptionSetting';
import useLanguages from './useLanguages';

const Languages = () => {
  const languages = useLanguages();

  return (
    <>
      {languages.languages.map((language) => (
        <OptionSettings
          isSelected={language.id === languages.selectedLanguage}
          onPress={language.onPress}
          title={language.title}
          key={language.title}
        />
      ))}
    </>
  );
};

export default Languages;
