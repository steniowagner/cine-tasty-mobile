import {useCallback, useEffect, useState} from 'react';

import * as Types from '@local-types';

import {useOptionsSelected} from '../../provider/OptionsSelectedProvider';
import {useGetSelectableOptionsModalData} from '../../hooks/useGetSelectableOptionsModalData';

type UseSelectableOptionsModalProps = {
  onCloseSetupQuestionModal: () => void;
  isSetupQuestionModalOpen: boolean;
};

export const useSelectableOptionsModal = (
  props: UseSelectableOptionsModalProps,
) => {
  const selectableOptionsModalData = useGetSelectableOptionsModalData();

  const optionsSelected = useOptionsSelected();

  const [selectedOption, setSelectedOption] =
    useState<Types.QuizFilterOption>();

  const handlePressCtaButton = useCallback(() => {
    optionsSelected.onPressModalOptionsCta(selectedOption);
    props.onCloseSetupQuestionModal();
  }, [
    optionsSelected.onPressModalOptionsCta,
    props.onCloseSetupQuestionModal,
    selectedOption,
  ]);

  const handleResetSelectedOption = useCallback(() => {
    if (!props.isSetupQuestionModalOpen) {
      setSelectedOption(optionsSelected.activeOptionSection);
    }
  }, [props.isSetupQuestionModalOpen, optionsSelected.activeOptionSection]);

  useEffect(() => {
    setSelectedOption(optionsSelected.activeOptionSection);
  }, [optionsSelected.activeOptionSection]);

  useEffect(() => {
    handleResetSelectedOption();
  }, [props.isSetupQuestionModalOpen]);

  return {
    onPressOption: setSelectedOption,
    options: selectableOptionsModalData.options,
    onPressCtaButton: handlePressCtaButton,
    texts: selectableOptionsModalData.texts,
    selectedOption,
  };
};
