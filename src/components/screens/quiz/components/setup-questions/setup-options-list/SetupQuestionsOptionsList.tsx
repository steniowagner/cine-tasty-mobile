import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import ModalSelectButton from 'components/common/ModalSelectButton';
import { QuizFilterOption } from 'types';

import useSetupOptionsList from './useSetupQuestionsOptionsList';
import OptionListItem from '../OptionListItem';

export const I18N_SELECT_BUTTON_KEY = 'translations:news:selectFilterMessage';

const LineDivider = styled(View)`
  width: 100%;
  height: 1.8px;
  background-color: #f2f2f2;
`;

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
        ItemSeparatorComponent={() => <LineDivider />}
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
