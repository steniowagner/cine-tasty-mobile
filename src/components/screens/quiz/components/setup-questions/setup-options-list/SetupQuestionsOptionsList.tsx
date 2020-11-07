import React from 'react';
import { FlatList } from 'react-native';

import ModalSelectButton from 'components/common/ModalSelectButton';
import { QuizFilterOption } from 'types';

import useSetupOptionsList from './useSetupQuestionsOptionsList';
import OptionListItem from './OptionListItem';

export const I18N_SELECT_BUTTON_KEY = 'translations:news:selectFilterMessage';

type Props = {
  onPressSelect: (indexOptionSelected: number) => void;
  indexLastOptionSelected: number;
  options: QuizFilterOption[];
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
            title={t(`translations:quiz:${item.id}`)}
            onPress={() => onSelectOption(index)}
          />
        )}
        keyExtractor={(item) => item.id}
        testID="options-list"
        data={options}
      />
      <ModalSelectButton
        title={t(I18N_SELECT_BUTTON_KEY)}
        onPress={() => {
          onPressSelect(indexOptionSelected);
          closeModal();
        }}
      />
    </>
  );
};

export default SetupQuestionsOptionsList;
