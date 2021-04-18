import React from 'react';

import * as Styles from './RoundedButton.styles';

type RoundedButtonProps = {
  isDisabled?: boolean;
  onPress: () => void;
  text: string;
};

const RoundedButton = ({ isDisabled, onPress, text }: RoundedButtonProps) => (
  <Styles.Wrapper
    testID="rounded-button"
    disabled={isDisabled}
    onPress={onPress}
  >
    <Styles.ButtonText>{text}</Styles.ButtonText>
  </Styles.Wrapper>
);

export default RoundedButton;