import {useCallback, useState, useMemo, useRef, useEffect} from 'react';
import {ScrollView} from 'react-native';

import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

import {ITEM_LIST_HEIGHT} from './list-item/LanguageListItem.styles';
import {useLanguages} from './languages/useLanguages';

type UseLanguageFilterProps = {
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  onSelectLanguage: (language: string) => void;
  closeModal: () => void;
};

const useLanguageFilter = (props: UseLanguageFilterProps) => {
  const [languageSelected, setLanguageSelected] =
    useState<SchemaTypes.ArticleLanguage>(props.lastLanguageSelected);

  const scrollViewRef = useRef<ScrollView>(null);

  const translations = useTranslations();

  const languages = useLanguages();

  const initialFlatListIndex = useMemo(
    () =>
      languages.findIndex(
        languageItem => languageItem.id === props.lastLanguageSelected,
      ),
    [props.lastLanguageSelected],
  );

  useEffect(() => {
    if (scrollViewRef && scrollViewRef.current) {
      const y = initialFlatListIndex * ITEM_LIST_HEIGHT;
      scrollViewRef.current.scrollTo({x: 0, y, animated: true});
    }
  }, [initialFlatListIndex]);

  const onPressSelectButton = useCallback((): void => {
    if (props.lastLanguageSelected !== languageSelected) {
      props.onSelectLanguage(languageSelected);
    }
    props.closeModal();
  }, [
    props.lastLanguageSelected,
    props.onSelectLanguage,
    props.closeModal,
    languageSelected,
  ]);

  const handleSetScrollViewRef = useCallback(
    (ref: ScrollView) => {
      if (!scrollViewRef.current) {
        scrollViewRef.current = ref;
      }
    },
    [scrollViewRef.current],
  );

  return {
    modalSelectButtonTitle: translations.translate(Translations.Tags.SELECT),
    handleSetScrollViewRef,
    onPressSelectButton,
    scrollViewRef,
    setLanguageSelected,
    languageSelected,
    languages,
  };
};

export default useLanguageFilter;
