import React from 'react';

import * as Styles from './ModalSelectButton.styles';

type ModalSelectButtonProps = {
  onPress: () => void;
  title: string;
};

const ModalSelectButton = ({ onPress, title }: ModalSelectButtonProps) => (
  <Styles.SelectButton
    onPress={onPress}
    testID="select-button"
  >
    <Styles.SelectButtonText>{title}</Styles.SelectButtonText>
  </Styles.SelectButton>
);

export default ModalSelectButton;
