import React from 'react';
import { ModalSheet } from '@common-components';
import { NewsLanguage } from '@schema-types';

import { LanguageFilterList } from './language-filter-list/LanguageFilterList';
import { useLanguagesFilterModal } from './use-languages-filter-modal';

type LanguagesFilterModalProps = {
  onSelectLanguage: (language: NewsLanguage) => void;
  languageSelected: NewsLanguage;
  onCloseModal: () => void;
  isOpen: boolean;
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
      onClose={languagesFilterModal.onCloseModal}
      ctaButtonTitle={languagesFilterModal.texts.modalCtaButton}
      onPressCTAButton={languagesFilterModal.onPressSelect}
      isOpen={props.isOpen}>
      <LanguageFilterList
        onSelectLanguage={languagesFilterModal.setLanguageSelected}
        languageSelected={languagesFilterModal.languageSelected}
      />
    </ModalSheet>
  );
};
