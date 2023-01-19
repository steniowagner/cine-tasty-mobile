import React from 'react';

import {SVGIcon} from '@components';
import * as Types from '@local-types';

import * as Styles from './DropdownOption.styles';

type DropdownOptionProps = {
  option: Types.QuizOption;
  selectedOption: string;
  onPress: () => void;
};

export const DropdownOption = (props: DropdownOptionProps) => (
  <Styles.InnerContentWrapper
    onPress={props.onPress}
    testID={`dropdown-button-${props.option}`}>
    <Styles.OptionText testID={`dropdown-value-${props.option}`}>
      {props.selectedOption}
    </Styles.OptionText>
    <SVGIcon size={Styles.ICON_SIZE} id="chevron-down-box" />
  </Styles.InnerContentWrapper>
);
