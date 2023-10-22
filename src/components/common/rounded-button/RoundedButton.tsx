import React from 'react';

import * as Styles from './RoundedButton.styles';

type RoundedButtonProps = {
  isDisabled?: boolean;
  onPress: () => void;
  text: string;
};

export const RoundedButton = (props: RoundedButtonProps) => (
  <Styles.Wrapper
    testID="rounded-button"
    disabled={props.isDisabled}
    onPress={props.onPress}>
    <Styles.ButtonText testID="rounded-button-text">
      {props.text}
    </Styles.ButtonText>
  </Styles.Wrapper>
);
