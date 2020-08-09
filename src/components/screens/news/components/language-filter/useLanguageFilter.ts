import { useState, useMemo, useCallback } from 'react';

import { ArticleLanguage } from 'types/schema';

import languages from './languages';

type Props = {
  onSelectLanguage: (language: string) => void;
  lastLanguageSelected: ArticleLanguage;
  onCloseModal: () => void;
};

type State = {
  setLanguageSelected: (language: ArticleLanguage) => void;
  onPressSelectButton: () => void;
  initialFlatListIndex: number;
  languageSelected: string;
};

const useLanguageFilter = ({
  lastLanguageSelected,
  onSelectLanguage,
  onCloseModal,
}: Props): State => {
  const [languageSelected, setLanguageSelected] = useState<ArticleLanguage>(
    lastLanguageSelected,
  );

  const initialFlatListIndex = useMemo(
    () => languages.findIndex((language) => language.id === lastLanguageSelected),
    [lastLanguageSelected],
  );

  const onPressSelectButton = useCallback((): void => {
    if (lastLanguageSelected !== languageSelected) {
      onSelectLanguage(languageSelected);
    }

    onCloseModal();
  }, [lastLanguageSelected, languageSelected]);

  return {
    initialFlatListIndex,
    onPressSelectButton,
    setLanguageSelected,
    languageSelected,
  };
};

export default useLanguageFilter;
