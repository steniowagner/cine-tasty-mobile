import { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as SchemaTypes from '@schema-types';

import languages from './languages';

type UseLanguageFilterProps = {
  onSelectLanguage: (language: string) => void;
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  closeModal: () => void;
};

const useLanguageFilter = (props: UseLanguageFilterProps) => {
  const [languageSelected, setLanguageSelected] = useState<SchemaTypes.ArticleLanguage>(
    props.lastLanguageSelected,
  );

  const { t } = useTranslation();

  const initialFlatListIndex = useMemo(
    () => languages.findIndex((language) => language.id === props.lastLanguageSelected),
    [props.lastLanguageSelected],
  );

  const onPressSelectButton = useCallback((): void => {
    if (props.lastLanguageSelected !== languageSelected) {
      props.onSelectLanguage(languageSelected);
    }

    props.closeModal();
  }, [props.lastLanguageSelected, languageSelected]);

  return {
    initialFlatListIndex,
    onPressSelectButton,
    setLanguageSelected,
    languageSelected,
    t,
  };
};

export default useLanguageFilter;
