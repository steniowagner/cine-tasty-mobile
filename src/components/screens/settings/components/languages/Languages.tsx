import React from 'react';

import OptionSettings from '../OptionSetting';
import useLanguages from './useLanguages';

const Languages = () => {
  const { selectedLanguage, languages } = useLanguages();

  return (
    <>
      {languages.map((language) => (
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

export default Languages;
