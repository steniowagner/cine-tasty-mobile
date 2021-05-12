import React from 'react';

import * as Styles from './ModalSelectButton.styles';

type ModalSelectButtonProps = {
  onPress: () => void;
  title: string;
};

const ModalSelectButton = (props: ModalSelectButtonProps) => (
  <Styles.SelectButton
    onPress={props.onPress}
    testID="select-button"
  >
    <Styles.SelectButtonText>{props.title}</Styles.SelectButtonText>
  </Styles.SelectButton>
);

export default ModalSelectButton;
