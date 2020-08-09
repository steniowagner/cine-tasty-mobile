import React from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import CustomModal from 'components/common/custom-modal/CustomModal';
import { ArticleLanguage } from 'types/schema';

import LanguageListItem, { ITEM_LIST_HEIGHT } from './list-item/LanguageListItem';
import useLanguageFilter from './useLanguageFilter';
import languages from './languages';

export const ANIMATION_TIMING = 400;

const LineDivider = styled(View)`
  width: 100%;
  height: 1.8px;
  background-color: #f2f2f2;
`;

type Props = {
  onSelectLanguage: (language: ArticleLanguage) => void;
  lastLanguageSelected: ArticleLanguage;
  onCloseModal: () => void;
};

const LanguageFilter = ({
  lastLanguageSelected,
  onSelectLanguage,
  onCloseModal,
}: Props) => {
  const {
    initialFlatListIndex,
    onPressSelectButton,
    setLanguageSelected,
    languageSelected,
  } = useLanguageFilter({
    lastLanguageSelected,
    onSelectLanguage,
    onCloseModal,
  });

  const { t } = useTranslation();

  return (
    <CustomModal
      footerText={t('translations:news:selectFilterMessage')}
      headerText={t('translations:news:filterMessage')}
      onPressSelect={onPressSelectButton}
      onClose={onCloseModal}
    >
      <FlatList
        renderItem={({ item }) => (
          <LanguageListItem
            name={t(`translations:news:languages:${item.name}`)}
            isSelected={languageSelected === item.id}
            onPress={() => {
              setLanguageSelected(item.id);
            }}
            Flag={item.Flag}
          />
        )}
        ItemSeparatorComponent={() => <LineDivider />}
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
    </CustomModal>
  );
};

export default LanguageFilter;
