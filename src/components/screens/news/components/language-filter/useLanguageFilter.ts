import {useCallback, useState, useMemo, useRef, useEffect} from 'react';
import {ScrollView} from 'react-native';

import * as SchemaTypes from '@schema-types';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import * as Types from '@local-types';

import {ITEM_LIST_HEIGHT} from './list-item/LanguageListItem.styles';
import languages from './languages';

type UseLanguageFilterProps = {
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  onSelectLanguage: (language: string) => void;
  closeModal: () => void;
};

const useLanguageFilter = (props: UseLanguageFilterProps) => {
  const [language, setLanguage] = useState<SchemaTypes.ArticleLanguage>(
    props.lastLanguageSelected,
  );
  const scrollViewRef = useRef<ScrollView>(null);

  const translations = useTranslations();

  const modalSelectButtonTitle = useMemo(
    () => translations.translate(Translations.Tags.SELECT),
    [translations.translate],
  );

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
    if (props.lastLanguageSelected !== language) {
      props.onSelectLanguage(language);
    }
    props.closeModal();
  }, [
    props.lastLanguageSelected,
    props.onSelectLanguage,
    props.closeModal,
    language,
  ]);

  const handleSetScrollViewRef = useCallback(
    (ref: ScrollView) => {
      if (scrollViewRef.current) {
        return;
      }
      scrollViewRef.current = ref;
    },
    [scrollViewRef.current],
  );

  const languageName = useCallback(
    (name: Types.NewsFilterLanguage) =>
      translations.translate(
        `${Translations.Tags.NEWS_LANGUAGES}:${name}` as Translations.Tags,
      ),
    [translations.translate],
  );

  return {
    modalSelectButtonTitle,
    handleSetScrollViewRef,
    onPressSelectButton,
    scrollViewRef,
    languageName,
    setLanguage,
    language,
  };
};

export default useLanguageFilter;
