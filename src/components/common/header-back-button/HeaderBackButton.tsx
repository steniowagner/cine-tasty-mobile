import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {Colors} from 'styled-components/native';

import {SVGIcon} from '@components';
import metrics from '@styles/metrics';

type HeaderBackButtonProps = {
  onPress: () => void;
  color: keyof Colors;
};

export const HeaderBackButton = (props: HeaderBackButtonProps) => (
  <TouchableOpacity testID="header-back-button" onPress={props.onPress}>
    <SVGIcon
      size={Platform.select({
        android: metrics.getWidthFromDP('6.5%'),
        ios: metrics.getWidthFromDP('9%'),
      })}
      id={Platform.select({
        android: 'arrow-back',
        ios: 'chevron-left',
      })}
      colorThemeRef={props.color}
    />
  </TouchableOpacity>
);
