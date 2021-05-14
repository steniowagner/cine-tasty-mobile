import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './DropdownOption.styles';

type DropdownOptionProps = {
  selectedOption: string;
  onPress: () => void;
};

const DropdownOption = (props: DropdownOptionProps) => (
  <Styles.InnerContentWrapper
    onPress={props.onPress}
    testID="dropdown-button"
  >
    <Styles.OptionText
      testID="option-value"
    >
      {props.selectedOption}
    </Styles.OptionText>
    <SVGIcon
      size={metrics.getWidthFromDP('7%')}
      id="chevron-down-box"
    />
  </Styles.InnerContentWrapper>
);

export default DropdownOption;
