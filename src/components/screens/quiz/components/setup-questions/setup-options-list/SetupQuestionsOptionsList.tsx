import React from 'react';
import { FlatList } from 'react-native';

import ModalSelectButton from '@components/common/modal-select-button/ModalSelectButton';
import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';

import useSetupOptionsList from './useSetupQuestionsOptionsList';
import OptionListItem from './option-lis-item/OptionListItem';

type Props = {
  onPressSelect: (indexOptionSelected: number) => void;
  indexLastOptionSelected: number;
  options: Types.QuizFilterOption[];
  closeModal: () => void;
};

const SetupQuestionsOptionsList = ({
  indexLastOptionSelected,
  onPressSelect,
  closeModal,
  options,
}: Props) => {
  const { indexOptionSelected, onSelectOption, t } = useSetupOptionsList({
    indexLastOptionSelected,
  });

  return (
    <>
      <FlatList
        renderItem={({ item, index }) => (
          <OptionListItem
            isSelected={indexOptionSelected === index}
            title={t(`${TRANSLATIONS.QUIZ}:${item.id}`)}
            onPress={() => onSelectOption(index)}
          />
        )}
        keyExtractor={(item) => item.id}
        testID="options-list"
        data={options}
      />
      <ModalSelectButton
        title={t(TRANSLATIONS.SELECT)}
        onPress={() => {
          onPressSelect(indexOptionSelected);
          closeModal();
        }}
      />
    </>
  );
};

export default SetupQuestionsOptionsList;
