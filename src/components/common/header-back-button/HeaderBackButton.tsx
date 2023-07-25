import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Colors} from 'styled-components/native';

import {SVGIcon} from '@components';

import * as Styles from './HeaderBackButton.styles';

type HeaderBackButtonProps = {
  onPress: () => void;
  color: keyof Colors;
};

export const HeaderBackButton = (props: HeaderBackButtonProps) => (
  <TouchableOpacity testID="header-back-button" onPress={props.onPress}>
    <SVGIcon
      size={Styles.IOS_ICON_SIZE}
      id={Styles.IOS_ICON_ID}
      colorThemeRef={props.color}
    />
  </TouchableOpacity>
);
