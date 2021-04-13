import { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as SchemaTypes from '@schema-types';

import languages from './languages';

type Props = {
  onSelectLanguage: (language: string) => void;
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  closeModal: () => void;
};

const useLanguageFilter = ({
  lastLanguageSelected,
  onSelectLanguage,
  closeModal,
}: Props) => {
  const [languageSelected, setLanguageSelected] = useState<SchemaTypes.ArticleLanguage>(
    lastLanguageSelected,
  );

  const { t } = useTranslation();

  const initialFlatListIndex = useMemo(
    () => languages.findIndex((language) => language.id === lastLanguageSelected),
    [lastLanguageSelected],
  );

  const onPressSelectButton = useCallback((): void => {
    if (lastLanguageSelected !== languageSelected) {
      onSelectLanguage(languageSelected);
    }

    closeModal();
  }, [lastLanguageSelected, languageSelected]);

  return {
    initialFlatListIndex,
    onPressSelectButton,
    setLanguageSelected,
    languageSelected,
    t,
  };
};

export default useLanguageFilter;
