import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
`;

const InnerContentWrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

const OptionText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.text};
`;

const Label = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
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
  label: string;
};

const DropdownOption = ({ selectedOption, onPress, label }: Props) => (
  <Wrapper>
    <Label>{label}</Label>
    <InnerContentWrapper
      onPress={onPress}
    >
      <OptionText>{selectedOption}</OptionText>
      <ArrowDownIcon />
    </InnerContentWrapper>
  </Wrapper>
);

export default DropdownOption;
