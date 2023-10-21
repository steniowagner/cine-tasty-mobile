import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { NewsLanguage } from '@schema-types';

import LanguageListItem from './list-item/LanguageListItem';
import { useLanguageFilter } from './use-language-filter';

type LanguageFilterListProps = {
  onSelectLanguage: (language: NewsLanguage) => void;
  languageSelected: NewsLanguage;
};

export const LanguageFilterList = (props: LanguageFilterListProps) => {
  const languageFilter = useLanguageFilter({
    languageSelected: props.languageSelected,
  });

  return (
    <ScrollView
      testID="languages-list"
      ref={languageFilter.handleSetScrollViewRef}>
      {languageFilter.filterLanguages.map(filterLanguage => (
        <LanguageListItem
          isSelected={props.languageSelected === filterLanguage.id}
          onPress={() => props.onSelectLanguage(filterLanguage.id)}
          title={filterLanguage.name}
          flag={filterLanguage.flag}
          key={filterLanguage.id}
        />
      ))}
    </ScrollView>
  );
};
