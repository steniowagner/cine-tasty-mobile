import {useCallback, useState, useRef, useEffect} from 'react';
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

  const translations = useTranslations();

  const languages = useLanguages();

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

  const getIndexLanguageSelected = useCallback(
    () =>
      languages.findIndex(
        languageItem => languageItem.id === props.lastLanguageSelected,
      ),
    [languages],
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const handleMoveListToSelectedLanguage = useCallback(() => {
    const indexLanguageSelected = getIndexLanguageSelected();
    scrollViewRef.current?.scrollTo({
      x: 0,
      y: indexLanguageSelected * ITEM_LIST_HEIGHT,
      animated: true,
    });
  }, [getIndexLanguageSelected, languages]);

  // For some reason, Jest was always overriding my mock
  // So I needed to add this workaround to properly spy the useRef hook
  const handleSetScrollViewRef = (ref: ScrollView) => {
    if (scrollViewRef.current) {
      return;
    }
    scrollViewRef.current = ref;
  };

  useEffect(() => {
    setTimeout(() => {
      handleMoveListToSelectedLanguage();
    }, 0);
  }, []);

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
