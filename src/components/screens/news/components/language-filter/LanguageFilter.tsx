import React from 'react';
import {ScrollView} from 'react-native';

import * as SchemaTypes from '@schema-types';

import LanguageListItem from './list-item/LanguageListItem';
import useLanguageFilter from './useLanguageFilter';

type LanguageFilterProps = {
  onSelectLanguage: (language: SchemaTypes.ArticleLanguage) => void;
  languageSelected: SchemaTypes.ArticleLanguage;
};

export const LanguageFilter = (props: LanguageFilterProps) => {
  const languageFilter = useLanguageFilter({
    languageSelected: props.languageSelected,
  });

  return (
    <ScrollView
      testID="languages-list"
      ref={languageFilter.handleSetScrollViewRef}>
      {languageFilter.languages.map(language => (
        <LanguageListItem
          isSelected={props.languageSelected === language.id}
          onPress={() => props.onSelectLanguage(language.id)}
          name={language.name}
          flag={language.flag}
          key={language.id}
        />
      ))}
    </ScrollView>
  );
};
