import React from 'react';
import { Linking } from 'react-native';

import { DefaultItemText } from '../OpenSrouce.styles';
import * as Styles from './LinkTextButton.styles';

type LinkButtonProps = {
  url: string;
};

const LinkButton = ({ url }: LinkButtonProps) => (
  <Styles.LinkButtonWrapper
    onPress={() => Linking.openURL(url)}
  >
    <DefaultItemText>{url}</DefaultItemText>
  </Styles.LinkButtonWrapper>
);

export default LinkButton;
