import React from 'react';

import * as Types from '@local-types';

import {useSetupQuestionsOptionsList} from './useSetupQuestionsOptionsList';
import OptionListItem from './option-list-item/OptionListItem';
import * as Styles from './SetupQuestionsOptionsList.styles';

type SetupQuestionsOptionsListProps = {
  onSelectOption: (indexOptionSelected: number) => void;
  options: Types.QuizFilterOption[];
  indexOptionSelected: number;
};

export const SetupQuestionsOptionsList = (
  props: SetupQuestionsOptionsListProps,
) => {
  const setupOptionsList = useSetupQuestionsOptionsList({
    options: props.options,
  });

  return (
    <Styles.Wrapper testID="options-list">
      {setupOptionsList.options.map((option, index) => (
        <OptionListItem
          isSelected={props.indexOptionSelected === index}
          onPress={() => props.onSelectOption(index)}
          title={option.title}
          key={option.id}
        />
      ))}
    </Styles.Wrapper>
  );
};
