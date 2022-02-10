import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';
import * as Types from '@local-types';

import * as Styles from './DropdownOption.styles';

type DropdownOptionProps = {
  option: Types.QuizOption;
  selectedOption: string;
  onPress: () => void;
};

const DropdownOption = (props: DropdownOptionProps) => (
  <Styles.InnerContentWrapper
    onPress={props.onPress}
    testID={`dropdown-button-${props.option}`}>
    <Styles.OptionText testID={`dropdown-value-${props.option}`}>
      {props.selectedOption}
    </Styles.OptionText>
    <SVGIcon size={metrics.getWidthFromDP('7%')} id="chevron-down-box" />
  </Styles.InnerContentWrapper>
);

export default DropdownOption;
