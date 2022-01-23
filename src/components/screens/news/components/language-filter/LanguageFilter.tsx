import React from 'react';
import {ScrollView} from 'react-native';

import ModalSelectButton from '@components/common/modal-select-button/ModalSelectButton';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

import LanguageListItem from './list-item/LanguageListItem';
import useLanguageFilter from './useLanguageFilter';
import languages from './languages';

export const ANIMATION_TIMING = 400;

type LanguageFilterProps = {
  onSelectLanguage: (language: SchemaTypes.ArticleLanguage) => void;
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  closeModal: () => void;
};

const LanguageFilter = ({
  lastLanguageSelected,
  onSelectLanguage,
  closeModal,
}: LanguageFilterProps) => {
  const {
    onPressSelectButton,
    setLanguageSelected,
    languageSelected,
    scrollViewRef,
    t,
  } = useLanguageFilter({
    lastLanguageSelected,
    onSelectLanguage,
    closeModal,
  });

  return (
    <>
      <ScrollView testID="languages-list" ref={scrollViewRef}>
        {languages.map(language => (
          <LanguageListItem
            name={t(`${TRANSLATIONS.NEWS_LANGUAGES}:${language.name}`)}
            isSelected={languageSelected === language.id}
            onPress={() => {
              setLanguageSelected(language.id);
            }}
            flag={language.flag}
            key={language.id}
          />
        ))}
      </ScrollView>
      <ModalSelectButton
        title={t(TRANSLATIONS.SELECT)}
        onPress={onPressSelectButton}
      />
    </>
  );
};

export default LanguageFilter;
