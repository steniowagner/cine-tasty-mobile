import React from 'react';

import * as Styles from './ModalSelectButton.styles';

export type ModalSelectButtonProps = {
  borderBottomRightRadius?: number;
  borderBottomLeftRadius?: number;
  isDisabled?: boolean;
  onPress: () => void;
  title: string;
};

export const ModalSelectButton = (props: ModalSelectButtonProps) => (
  <Styles.SelectButton
    borderBottomRightRadius={props.borderBottomRightRadius}
    borderBottomLeftRadius={props.borderBottomLeftRadius}
    disabled={props.isDisabled}
    onPress={props.onPress}
    testID="select-button">
    <Styles.SelectButtonText testID="select-button-text">
      {props.title}
    </Styles.SelectButtonText>
  </Styles.SelectButton>
);
