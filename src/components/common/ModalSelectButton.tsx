import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from 'utils/is-equals-or-largest-than-iphonex/isEqualsOrLargestThanIphoneX';

const SelectButton = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => (isEqualsOrLargestThanIphoneX()
    ? theme.metrics.getWidthFromDP('20%')
    : theme.metrics.getWidthFromDP('16%'))}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const SelectButtonText = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: #262626;
  text-transform: uppercase;
`;

type Props = {
  onPress: () => void;
  title: string;
};

const ModalSelectButton = ({ onPress, title }: Props) => (
  <SelectButton
    onPress={onPress}
    testID="select-button"
  >
    <SelectButtonText>{title}</SelectButtonText>
  </SelectButton>
);

export default ModalSelectButton;
