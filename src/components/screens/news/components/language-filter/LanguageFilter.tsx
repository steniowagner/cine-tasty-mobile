import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ModalSelectButton from '@components/common/modal-select-button/ModalSelectButton';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

import LanguageListItem, { ITEM_LIST_HEIGHT } from './list-item/LanguageListItem';
import useLanguageFilter from './useLanguageFilter';
import languages from './languages';

export const ANIMATION_TIMING = 400;

type Props = {
  onSelectLanguage: (language: SchemaTypes.ArticleLanguage) => void;
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  closeModal: () => void;
};

const LanguageFilter = ({
  lastLanguageSelected,
  onSelectLanguage,
  closeModal,
}: Props) => {
  const {
    initialFlatListIndex,
    onPressSelectButton,
    setLanguageSelected,
    languageSelected,
    t,
  } = useLanguageFilter({
    lastLanguageSelected,
    onSelectLanguage,
    closeModal,
  });

  return (
    <>
      <FlatList
        renderItem={({ item }) => (
          <LanguageListItem
            name={t(`${TRANSLATIONS.NEWS_LANGUAGES}:${item.name}`)}
            isSelected={languageSelected === item.id}
            onPress={() => {
              setLanguageSelected(item.id);
            }}
            flag={item.flag}
          />
        )}
        initialScrollIndex={initialFlatListIndex}
        getItemLayout={(_, index) => ({
          offset: ITEM_LIST_HEIGHT * index,
          length: ITEM_LIST_HEIGHT,
          index,
        })}
        keyExtractor={(item) => item.id}
        testID="languages-list"
        data={languages}
      />
      <ModalSelectButton
        title={t(TRANSLATIONS.SELECT)}
        onPress={onPressSelectButton}
      />
    </>
  );
};

export default LanguageFilter;
