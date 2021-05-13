import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import ModalSelectButton from '@components/common/modal-select-button/ModalSelectButton';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

import { ITEM_LIST_HEIGHT } from './list-item/LanguageListItem.styles';
import LanguageListItem from './list-item/LanguageListItem';
import useLanguageFilter from './useLanguageFilter';
import languages from './languages';

export const ANIMATION_TIMING = 400;

type LanguageFilterProps = {
  onSelectLanguage: (language: SchemaTypes.ArticleLanguage) => void;
  lastLanguageSelected: SchemaTypes.ArticleLanguage;
  closeModal: () => void;
};

const LanguageFilter = (props: LanguageFilterProps) => {
  const languageFilter = useLanguageFilter({
    lastLanguageSelected: props.lastLanguageSelected,
    onSelectLanguage: props.onSelectLanguage,
    closeModal: props.closeModal,
  });

  return (
    <>
      <FlatList
        renderItem={({ item }) => (
          <LanguageListItem
            name={languageFilter.t(`${TRANSLATIONS.NEWS_LANGUAGES}:${item.name}`)}
            onPress={() => languageFilter.setLanguageSelected(item.id)}
            isSelected={languageFilter.languageSelected === item.id}
            flag={item.flag}
          />
        )}
        initialScrollIndex={languageFilter.initialFlatListIndex}
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
        title={languageFilter.t(TRANSLATIONS.SELECT)}
        onPress={languageFilter.onPressSelectButton}
      />
    </>
  );
};

export default LanguageFilter;
