import React from 'react';
import {View} from 'react-native';

import ModalSelectButton from '@components/common/modal-select-button/ModalSelectButton';
import * as Types from '@local-types';

import useSetupOptionsList from './useSetupQuestionsOptionsList';
import OptionListItem from './option-list-item/OptionListItem';
import * as Styles from './SetupQuestionsOptionsList.styles';

type SetupQuestionsOptionsListProps = {
  onPressSelect: (indexOptionSelected: number) => void;
  options: Types.QuizFilterOption[];
  indexLastOptionSelected: number;
  closeModal: () => void;
};

const SetupQuestionsOptionsList = (props: SetupQuestionsOptionsListProps) => {
  const setupOptionsList = useSetupOptionsList({
    indexLastOptionSelected: props.indexLastOptionSelected,
    onPressSelect: props.onPressSelect,
    closeModal: props.closeModal,
  });
  return (
    <Styles.Wrapper>
      <View testID="options-list">
        {props.options.map((item, index) => (
          <OptionListItem
            isSelected={setupOptionsList.indexOptionSelected === index}
            onPress={() => setupOptionsList.onSelectOption(index)}
            title={setupOptionsList.makeItemTitle(`${item.option}_${item.id}`)}
            key={item.id}
          />
        ))}
      </View>
      <ModalSelectButton
        onPress={setupOptionsList.handlePressSelectButton}
        title={setupOptionsList.selectText}
      />
    </Styles.Wrapper>
  );
};

export default SetupQuestionsOptionsList;
