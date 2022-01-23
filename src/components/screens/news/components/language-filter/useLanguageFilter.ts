import {useCallback, useState, useMemo, useRef, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';

import * as SchemaTypes from '@schema-types';

import {ITEM_LIST_HEIGHT} from './list-item/LanguageListItem.styles';
import languages from './languages';

type UseLanguageFilterProps = {
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  onSelectLanguage: (language: string) => void;
  closeModal: () => void;
};

const useLanguageFilter = ({
  lastLanguageSelected,
  onSelectLanguage,
  closeModal,
}: UseLanguageFilterProps) => {
  const [languageSelected, setLanguageSelected] =
    useState<SchemaTypes.ArticleLanguage>(lastLanguageSelected);

  const scrollViewRef = useRef<ScrollView>(null);
  const {t} = useTranslation();

  const initialFlatListIndex = useMemo(
    () => languages.findIndex(language => language.id === lastLanguageSelected),
    [lastLanguageSelected],
  );

  useEffect(() => {
    if (scrollViewRef && scrollViewRef.current) {
      const y = initialFlatListIndex * ITEM_LIST_HEIGHT;
      scrollViewRef.current.scrollTo({x: 0, y, animated: true});
    }
  }, [initialFlatListIndex]);

  const onPressSelectButton = useCallback((): void => {
    if (lastLanguageSelected !== languageSelected) {
      onSelectLanguage(languageSelected);
    }

    closeModal();
  }, [lastLanguageSelected, languageSelected, closeModal, onSelectLanguage]);

  return {
    onPressSelectButton,
    setLanguageSelected,
    languageSelected,
    scrollViewRef,
    t,
  };
};

export default useLanguageFilter;
