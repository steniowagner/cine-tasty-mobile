import React from 'react';

import * as Styles from './NavigationButton.styles';

type NavigationButtonProps = {
  onPress: () => void;
  buttonTitle: string;
};

const NavigationButton = ({ buttonTitle, onPress }: NavigationButtonProps) => (
  <Styles.Wrapper
    onPress={onPress}
  >
    <Styles.ButtonText>{buttonTitle}</Styles.ButtonText>
  </Styles.Wrapper>
);

export default NavigationButton;
