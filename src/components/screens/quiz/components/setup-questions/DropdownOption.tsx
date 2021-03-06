import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import SVGIcon from 'components/common/svg-icon/SVGIcon';
import metrics from 'styles/metrics';

const InnerContentWrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.inputBackground};
`;

const OptionText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.text};
`;

type Props = {
  selectedOption: string;
  onPress: () => void;
};

const DropdownOption = ({ selectedOption, onPress }: Props) => (
  <InnerContentWrapper
    onPress={onPress}
    testID="dropdown-button"
  >
    <OptionText
      testID="option-value"
    >
      {selectedOption}
    </OptionText>
    <SVGIcon
      size={metrics.getWidthFromDP('7%')}
      id="chevron-down-box"
    />
  </InnerContentWrapper>
);

export default DropdownOption;
