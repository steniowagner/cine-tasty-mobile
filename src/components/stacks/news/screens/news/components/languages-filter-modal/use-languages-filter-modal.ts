import { useCallback, useMemo, useState } from 'react';

import { NewsLanguage } from '@schema-types';
import { Translations } from '@i18n/tags';
import { useTranslation } from '@hooks';

type UseLanguagesFilterModalParams = {
  lastLanguageSelected: NewsLanguage;
  onSelectLanguage: (language: NewsLanguage) => void;
  onCloseModal: () => void;
};

export const useLanguagesFilterModal = (
  params: UseLanguagesFilterModalParams,
) => {
  const [languageSelected, setLanguageSelected] = useState<NewsLanguage>(
    params.lastLanguageSelected,
  );

  const translation = useTranslation();

  const texts = useMemo(
    () => ({
      modalCtaButton: translation.translate(
        Translations.News.FILTER_LANGUAGES_CTA_TITLE,
      ),
      modalTitle: translation.translate(
        Translations.News.FILTER_LANGUAGES_TITLE,
      ),
    }),
    [translation.translate],
  );

  const handlePressSelect = useCallback(() => {
    params.onSelectLanguage(languageSelected);
    params.onCloseModal();
  }, [params.onCloseModal, params.onSelectLanguage, languageSelected]);

  const handleCloseModal = useCallback(() => {
    setLanguageSelected(params.lastLanguageSelected);
    params.onCloseModal();
  }, [params.onCloseModal, params.lastLanguageSelected]);

  return {
    onCloseModal: handleCloseModal,
    onPressSelect: handlePressSelect,
    setLanguageSelected,
    languageSelected,
    texts,
  };
};
