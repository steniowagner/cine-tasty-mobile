import React from 'react';
import {ScrollView} from 'react-native';

import * as SchemaTypes from '@schema-types';

import LanguageListItem from './list-item/LanguageListItem';
import useLanguageFilter from './useLanguageFilter';

type LanguageFilterProps = {
  onSelectLanguage: (language: SchemaTypes.ArticleLanguage) => void;
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  closeModal: () => void;
};

export const LanguageFilter = (props: LanguageFilterProps) => {
  const languageFilter = useLanguageFilter({
    lastLanguageSelected: props.lastLanguageSelected,
    onSelectLanguage: props.onSelectLanguage,
    closeModal: props.closeModal,
  });

  return (
    <ScrollView
      testID="languages-list"
      ref={languageFilter.handleSetScrollViewRef}>
      {languageFilter.languages.map(language => (
        <LanguageListItem
          isSelected={languageFilter.languageSelected === language.id}
          onPress={() => languageFilter.setLanguageSelected(language.id)}
          name={language.name}
          flag={language.flag}
          key={language.id}
        />
      ))}
    </ScrollView>
  );
};
