import React from 'react';
import {ModalSheet} from '@components';

import OptionListItem from './option-list-item/OptionListItem';
import {useSelectableOptionsModal} from './useSelectableOptionsModal';
import * as Styles from './SelectableOptionsModal.styles';

type SelectableOptionsModalProps = {
  onCloseSetupQuestionModal: () => void;
  isSetupQuestionModalOpen: boolean;
};

export const SelectableOptionsModal = (props: SelectableOptionsModalProps) => {
  const setupOptionsList = useSelectableOptionsModal({
    onCloseSetupQuestionModal: props.onCloseSetupQuestionModal,
    isSetupQuestionModalOpen: props.isSetupQuestionModalOpen,
  });

  return (
    <ModalSheet
      title={setupOptionsList.texts.modalTitle}
      isOpen={props.isSetupQuestionModalOpen}
      onClose={props.onCloseSetupQuestionModal}
      ctaButtonTitle={setupOptionsList.texts.modalCtaTitle}
      ctaButtonCallback={setupOptionsList.onPressCtaButton}>
      <Styles.Wrapper testID="options-list">
        {setupOptionsList.options.map(option => (
          <OptionListItem
            isSelected={option.isEquals(setupOptionsList.selectedOption)}
            onPress={() => setupOptionsList.onPressOption(option)}
            title={option.label}
            key={option.id}
          />
        ))}
      </Styles.Wrapper>
    </ModalSheet>
  );
};
