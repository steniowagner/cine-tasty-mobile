import React from 'react';
import {Platform} from 'react-native';

import {SVGIcon} from '@components';
import metrics from '@styles/metrics';

import * as Styles from './HeaderBackButton.styles';

type HeaderBackButtonProps = {
  onPress: () => void;
};

export const HeaderBackButton = (props: HeaderBackButtonProps) => (
  <Styles.IconWrapper onPress={props.onPress}>
    <SVGIcon
      size={Platform.select({
        android: metrics.getWidthFromDP('6.5%'),
        ios: metrics.getWidthFromDP('9%'),
      })}
      id={Platform.select({
        android: 'arrow-back',
        ios: 'chevron-left',
      })}
      colorThemeRef="white"
    />
  </Styles.IconWrapper>
);
