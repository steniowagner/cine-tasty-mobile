import React from 'react';

import * as Types from '@local-types';

import {DropdownOption} from './drop-down-option/DropdownOption';
import * as Styles from '../../SetupQuestions.styles';
import {useChooseOptionSection} from './useChooseOptionSection';

type ChooseOptionSectionProps = {
  onOpenSetupQuestionsModal: () => void;
  section: Types.QuizOption;
};

export const ChooseOptionSection = (props: ChooseOptionSectionProps) => {
  const chooseOptionSection = useChooseOptionSection({
    onOpenSetupQuestionsModal: props.onOpenSetupQuestionsModal,
    section: props.section,
  });

  return (
    <>
      <Styles.SectionTitle>
        {chooseOptionSection.texts.sectionTitle}
      </Styles.SectionTitle>
      <DropdownOption
        onPress={chooseOptionSection.onPressOption}
        selectedOption={chooseOptionSection.selectedOption}
        section={props.section}
      />
    </>
  );
};
