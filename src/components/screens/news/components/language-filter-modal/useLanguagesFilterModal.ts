import {useCallback, useMemo, useState} from 'react';

import * as SchemaTypes from '@schema-types';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

type UseLanguagesFilterModalProps = {
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  onSelectLanguage: (language: string) => void;
  onCloseModal: () => void;
};

export const useLanguagesFilterModal = (
  props: UseLanguagesFilterModalProps,
) => {
  const [languageSelected, setLanguageSelected] =
    useState<SchemaTypes.ArticleLanguage>(props.lastLanguageSelected);

  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      modalCtaButton: translations.translate(Translations.Tags.SELECT),
      modalTitle: translations.translate(Translations.Tags.NEWS_FILTER_MESSAGE),
    }),
    [translations.translate],
  );

  const handlePressSelect = useCallback(() => {
    props.onSelectLanguage(languageSelected);
    props.onCloseModal();
  }, [props.onCloseModal, props.onSelectLanguage, languageSelected]);

  const handleCloseModal = useCallback(() => {
    setLanguageSelected(props.lastLanguageSelected);
    props.onCloseModal();
  }, [props.onCloseModal, props.lastLanguageSelected]);

  return {
    languageSelected,
    onCloseModal: handleCloseModal,
    onPressSelect: handlePressSelect,
    setLanguageSelected,
    texts,
  };
};
