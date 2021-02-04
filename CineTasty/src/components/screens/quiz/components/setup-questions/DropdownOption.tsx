import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

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

const ArrowDownIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('7%'),
  color: theme.colors.text,
  name: 'chevron-down-box',
}))``;

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
    <ArrowDownIcon />
  </InnerContentWrapper>
);

export default DropdownOption;
