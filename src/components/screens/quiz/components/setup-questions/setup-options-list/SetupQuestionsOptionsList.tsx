import React from 'react';
import { FlatList } from 'react-native';

import ModalSelectButton from '@components/common/modal-select-button/ModalSelectButton';
import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';

import useSetupOptionsList from './useSetupQuestionsOptionsList';
import OptionListItem from './option-lis-item/OptionListItem';

type SetupQuestionsOptionsListProps = {
  onPressSelect: (indexOptionSelected: number) => void;
  indexLastOptionSelected: number;
  options: Types.QuizFilterOption[];
  closeModal: () => void;
};

const SetupQuestionsOptionsList = (props: SetupQuestionsOptionsListProps) => {
  const setupOptionsList = useSetupOptionsList({
    indexLastOptionSelected: props.indexLastOptionSelected,
  });

  return (
    <>
      <FlatList
        renderItem={({ item, index }) => (
          <OptionListItem
            title={setupOptionsList.t(`${TRANSLATIONS.QUIZ}:${item.id}`)}
            isSelected={setupOptionsList.indexOptionSelected === index}
            onPress={() => setupOptionsList.onSelectOption(index)}
          />
        )}
        keyExtractor={(item) => item.id}
        testID="options-list"
        data={props.options}
      />
      <ModalSelectButton
        title={setupOptionsList.t(TRANSLATIONS.SELECT)}
        onPress={() => {
          props.onPressSelect(setupOptionsList.indexOptionSelected);
          props.closeModal();
        }}
      />
    </>
  );
};

export default SetupQuestionsOptionsList;
