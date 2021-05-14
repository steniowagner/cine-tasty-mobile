import React from 'react';
import { Linking } from 'react-native';

import { DefaultItemText } from '../OpenSrouce.styles';
import * as Styles from './LinkTextButton.styles';

type LinkButtonProps = {
  url: string;
};

const LinkButton = (props: LinkButtonProps) => (
  <Styles.LinkButtonWrapper
    onPress={() => Linking.openURL(props.url)}
  >
    <DefaultItemText>{props.url}</DefaultItemText>
  </Styles.LinkButtonWrapper>
);

export default LinkButton;
