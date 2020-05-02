import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(TouchableOpacity)`
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.metrics.width}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ButtonText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Black;
  text-transform: uppercase;
  text-align: center;
`;

export type Props = {
  isDisabled?: boolean;
  onPress: () => void;
  text: string;
};

const RoundedButton = ({ isDisabled, onPress, text }: Props) => (
  <Wrapper
    disabled={isDisabled}
    onPress={onPress}
  >
    <ButtonText>{text}</ButtonText>
  </Wrapper>
);

export default RoundedButton;
