import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './DropdownOption.styles';

type Props = {
  selectedOption: string;
  onPress: () => void;
};

const DropdownOption = ({ selectedOption, onPress }: Props) => (
  <Styles.InnerContentWrapper
    onPress={onPress}
    testID="dropdown-button"
  >
    <Styles.OptionText
      testID="option-value"
    >
      {selectedOption}
    </Styles.OptionText>
    <SVGIcon
      size={metrics.getWidthFromDP('7%')}
      id="chevron-down-box"
    />
  </Styles.InnerContentWrapper>
);

export default DropdownOption;
