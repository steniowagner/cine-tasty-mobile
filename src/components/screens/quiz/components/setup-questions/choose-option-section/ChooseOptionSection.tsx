import React from 'react';

import * as Types from '@local-types';

import {DropdownOption} from './drop-down-option/DropdownOption';
import * as Styles from './ChooseOptionSection.styles';

type ChooseOptionSectionProps = {
  label: string;
  selectedOption: string;
  onPress: () => void;
  section: Types.QuizOption;
};

export const ChooseOptionSection = (props: ChooseOptionSectionProps) => (
  <>
    <Styles.Label>{props.label}</Styles.Label>
    <DropdownOption
      onPress={props.onPress}
      selectedOption={props.selectedOption}
      section={props.section}
    />
  </>
);
