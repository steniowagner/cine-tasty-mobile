import React from 'react';

import {ModalSheet} from '@components';

import {LanguageFilter} from '../language-filter/LanguageFilter';
import {useLanguagesFilterModal} from './useLanguagesFilterModal';
import * as SchemaTypes from '@schema-types';

type LanguagesFilterModalProps = {
  onSelectLanguage: (language: SchemaTypes.ArticleLanguage) => void;
  isOpen: boolean;
  onCloseModal: () => void;
  languageSelected: SchemaTypes.ArticleLanguage;
};

export const LanguagesFilterModal = (props: LanguagesFilterModalProps) => {
  const languagesFilterModal = useLanguagesFilterModal({
    lastLanguageSelected: props.languageSelected,
    onSelectLanguage: props.onSelectLanguage,
    onCloseModal: props.onCloseModal,
  });

  return (
    <ModalSheet
      title={languagesFilterModal.texts.modalTitle}
      isOpen={props.isOpen}
      onClose={props.onCloseModal}
      ctaButtonTitle={languagesFilterModal.texts.modalCtaButton}
      ctaButtonCallback={languagesFilterModal.onPressSelect}>
      <LanguageFilter
        onSelectLanguage={languagesFilterModal.setLanguageSelected}
        languageSelected={languagesFilterModal.languageSelected}
      />
    </ModalSheet>
  );
};
