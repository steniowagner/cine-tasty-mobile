import React from 'react';
import {ScrollView} from 'react-native';

import {ModalSelectButton} from '@components/common';
import * as SchemaTypes from '@schema-types';

import LanguageListItem from './list-item/LanguageListItem';
import useLanguageFilter from './useLanguageFilter';
import languages from './languages';

export const ANIMATION_TIMING = 400;

type LanguageFilterProps = {
  onSelectLanguage: (language: SchemaTypes.ArticleLanguage) => void;
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  closeModal: () => void;
};

const LanguageFilter = (props: LanguageFilterProps) => {
  const languageFilter = useLanguageFilter({
    lastLanguageSelected: props.lastLanguageSelected,
    onSelectLanguage: props.onSelectLanguage,
    closeModal: props.closeModal,
  });
  return (
    <>
      <ScrollView
        testID="languages-list"
        ref={languageFilter.handleSetScrollViewRef}>
        {languages.map(language => (
          <LanguageListItem
            isSelected={languageFilter.language === language.id}
            onPress={() => languageFilter.setLanguage(language.id)}
            name={languageFilter.languageName(language.name)}
            flag={language.flag}
            key={language.id}
          />
        ))}
      </ScrollView>
      <ModalSelectButton
        title={languageFilter.modalSelectButtonTitle}
        onPress={languageFilter.onPressSelectButton}
      />
    </>
  );
};

export default LanguageFilter;
