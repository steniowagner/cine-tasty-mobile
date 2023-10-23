import React from 'react';

import { ModalSheet } from '@common-components';

import { useSetupQuestionsModal } from './use-setup-questions-modal';
import OptionListItem from './option-list-item/OptionListItem';
import {
  SetupQuestionOption,
  OptionValue,
} from '../../use-setup-questions/types';
import * as Styles from './SetupQuestionModal.styles';

export type SetupQuestionsModalProps = {
  options: SetupQuestionOption[];
  onConfirmSelectedOption: (value: OptionValue) => void;
  optionSelected?: OptionValue;
  modalTitle: string;
  onClose: () => void;
  isOpen: boolean;
};

export const SetupQuestionsModal = (props: SetupQuestionsModalProps) => {
  const setupQuestionsModal = useSetupQuestionsModal({
    onConfirmSelectedOption: props.onConfirmSelectedOption,
    onCloseModal: props.onClose,
    isModalOpen: props.isOpen,
    options: props.options,
    optionSelected: props.optionSelected,
  });

  return (
    <ModalSheet
      title={props.modalTitle}
      isOpen={props.isOpen}
      onClose={props.onClose}
      ctaButtonTitle={setupQuestionsModal.texts.modalCTATitle}
      onPressCTAButton={setupQuestionsModal.onPressCTA}>
      <Styles.Wrapper testID="options-list">
        {setupQuestionsModal.options.map(option => (
          <OptionListItem
            isSelected={option.value === setupQuestionsModal.optionSelected}
            onPress={() => setupQuestionsModal.handleSelectOption(option.value)}
            title={option.title}
            key={option.value}
          />
        ))}
      </Styles.Wrapper>
    </ModalSheet>
  );
};
