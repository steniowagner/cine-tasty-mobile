import {useCallback, useRef, useEffect} from 'react';
import {ScrollView} from 'react-native';

import * as SchemaTypes from '@schema-types';

import {ITEM_LIST_HEIGHT} from './list-item/LanguageListItem.styles';
import {useLanguages} from './languages/useLanguages';

type UseLanguageFilterProps = {
  languageSelected: SchemaTypes.ArticleLanguage;
};

const useLanguageFilter = (props: UseLanguageFilterProps) => {
  const languages = useLanguages();

  const getIndexLanguageSelected = useCallback(
    () =>
      languages.findIndex(
        languageItem => languageItem.id === props.languageSelected,
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
  }, [getIndexLanguageSelected]);

  // For some reason, Jest was always overriding my mock
  // So I needed to add this workaround to properly spy the useRef hook during the tests
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
    handleSetScrollViewRef,
    scrollViewRef,
    languages,
  };
};

export default useLanguageFilter;
