import { useCallback, useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { NewsLanguage } from '@schema-types';

import { useNewsFilterLanguages } from './filter-languages/use-news-filter-languages';
import { ITEM_LIST_HEIGHT } from './list-item/LanguageListItem.styles';

type UseLanguageFilterProps = {
  languageSelected: NewsLanguage;
};

export const useLanguageFilter = (props: UseLanguageFilterProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const filterLanguages = useNewsFilterLanguages();

  // For some reason, Jest was always overriding my mock
  // So I needed to add this workaround to properly spy the useRef hook during the tests
  const handleSetScrollViewRef = (ref: ScrollView) => {
    if (scrollViewRef.current) {
      return;
    }
    scrollViewRef.current = ref;
  };

  const getIndexLanguageSelected = useCallback(
    () =>
      filterLanguages.findIndex(
        filterLanguage => filterLanguage.id === props.languageSelected,
      ),
    [filterLanguages],
  );

  const handleMoveListToSelectedLanguage = useCallback(() => {
    const indexLanguageSelected = getIndexLanguageSelected();
    scrollViewRef.current?.scrollTo({
      x: 0,
      y: indexLanguageSelected * ITEM_LIST_HEIGHT,
      animated: true,
    });
  }, [getIndexLanguageSelected]);

  useEffect(() => {
    setTimeout(() => {
      handleMoveListToSelectedLanguage();
    }, 0);
  }, []);

  return {
    handleSetScrollViewRef,
    scrollViewRef,
    filterLanguages,
  };
};
